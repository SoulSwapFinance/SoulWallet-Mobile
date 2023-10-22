import {
  ResponseParseTransactionSubstrate,
  ResponseQrParseRLP,
  SignerDataType,
} from '@soul-wallet/extension-base/src/background/KoniTypes';
import { createTransactionFromRLP, Transaction } from '@soul-wallet/extension-base/src/utils/eth';
import { SCANNER_QR_STEP } from 'constants/qr';
import { parseEVMTransaction, parseSubstrateTransaction, qrSignEvm, qrSignSubstrate } from 'messaging/index';
import { RootState } from 'stores/index';
import {
  CompletedParsedData,
  EthereumParsedData,
  MessageQRInfo,
  MultiFramesInfo,
  QrInfo,
  SubstrateCompletedParsedData,
  SubstrateMessageParsedData,
  SubstrateTransactionParsedData,
  TxQRInfo,
} from 'types/qr/scanner';
import { findAccountByAddress } from 'utils/account';
import { getNetworkJsonByInfo } from 'utils/network';
import { constructDataFromBytes, encodeNumber } from 'utils/scanner/decoders';
import { isEthereumCompletedParsedData, isSubstrateMessageParsedData } from 'utils/scanner/sign';
import BigN from 'bignumber.js';
import React, { useCallback, useReducer } from 'react';
import { useSelector } from 'react-redux';

import { GenericExtrinsicPayload } from '@polkadot/types';
import { compactFromU8a, hexStripPrefix, isAscii, isHex, isString, isU8a, u8aConcat, u8aToHex } from '@polkadot/util';
import { isEthereumAddress, keccakAsHex } from '@polkadot/util-crypto';

type ScannerStoreState = {
  busy: boolean;
  completedFramesCount: number;
  dataToSign: string | Uint8Array;
  evmChainId?: number;
  genesisHash?: string;
  isEthereumStructure: boolean;
  isHash: boolean;
  isOversized: boolean;
  latestFrame: number | null;
  message: string | null;
  missedFrames: Array<number>;
  multipartComplete: boolean;
  multipartData: null | Array<Uint8Array | null>;
  parsedTx: ResponseParseTransactionSubstrate | ResponseQrParseRLP | null;
  rawPayload: Uint8Array | string | null;
  recipientAddress: string | null;
  senderAddress: string | null;
  signedData: string;
  step: SCANNER_QR_STEP;
  totalFrameCount: number;
  tx: Transaction | GenericExtrinsicPayload | string | Uint8Array | null;
  type: SignerDataType | null;
};

export type ScannerContextType = {
  cleanup: () => void;
  clearMultipartProgress: () => void;
  setBusy: () => void;
  setReady: () => void;
  state: ScannerStoreState;
  setPartData: (
    currentFrame: number,
    frameCount: number,
    partData: string,
  ) => MultiFramesInfo | SubstrateCompletedParsedData;
  setData: (unsignedData: CompletedParsedData) => QrInfo;
  setStep: (step: SCANNER_QR_STEP) => void;
  signDataLegacy: (savePass: boolean, password: string) => Promise<void>;
};

const DEFAULT_STATE: ScannerStoreState = {
  busy: false,
  completedFramesCount: 0,
  dataToSign: '',
  isEthereumStructure: false,
  isHash: false,
  isOversized: false,
  latestFrame: null,
  message: null,
  missedFrames: [],
  multipartComplete: false,
  multipartData: null,
  parsedTx: null,
  rawPayload: null,
  recipientAddress: null,
  senderAddress: null,
  signedData: '',
  step: SCANNER_QR_STEP.SCAN_STEP,
  totalFrameCount: 0,
  tx: null,
  type: null,
};

export const ScannerContext = React.createContext({} as ScannerContextType);

const MULTIPART = new Uint8Array([0]); // always mark as multipart for simplicity's sake. Consistent with @polkadot/react-qr

interface ScannerContextProviderProps {
  children?: React.ReactElement;
}

export function ScannerContextProvider({ children }: ScannerContextProviderProps): React.ReactElement {
  const accounts = useSelector((state: RootState) => state.accountState.accounts);
  const networkMap = useSelector((state: RootState) => state.chainStore.chainInfoMap);

  const initialState = DEFAULT_STATE;

  const reducer = (state: ScannerStoreState, delta: Partial<ScannerStoreState>): ScannerStoreState => ({
    ...state,
    ...delta,
  });
  const [state, setState] = useReducer(reducer, initialState);

  const setStep = useCallback((value: SCANNER_QR_STEP) => {
    setState({ step: value });
  }, []);

  const setBusy = useCallback((): void => {
    setState({ busy: true });
  }, []);

  const _integrateMultiPartData = useCallback(
    (multipartData: Array<Uint8Array | null>, totalFrameCount: number): SubstrateCompletedParsedData => {
      // concatenate all the parts into one binary blob
      let concatMultipartData = multipartData.reduce((acc: Uint8Array, part: Uint8Array | null): Uint8Array => {
        if (part === null) {
          throw new Error('part data is not completed');
        }

        const c = new Uint8Array(acc.length + part.length);

        c.set(acc);
        c.set(part, acc.length);

        return c;
      }, new Uint8Array(0));

      // unshift the frame info
      const frameInfo = u8aConcat(MULTIPART, encodeNumber(totalFrameCount), encodeNumber(0));

      concatMultipartData = u8aConcat(frameInfo, concatMultipartData);

      return constructDataFromBytes(concatMultipartData, true, networkMap, accounts) as SubstrateCompletedParsedData;
    },
    [networkMap, accounts],
  );

  const setPartData = useCallback(
    (currentFrame: number, frameCount: number, partData: string): MultiFramesInfo | SubstrateCompletedParsedData => {
      const newArray = Array.from({ length: frameCount }, () => null);
      const totalFrameCount = frameCount;

      // set it once only
      const multipartData = !state.totalFrameCount ? newArray : state.multipartData ? state.multipartData : newArray;
      const { completedFramesCount, multipartComplete } = state;
      const partDataAsBytes = new Uint8Array(partData.length / 2);

      for (let i = 0; i < partDataAsBytes.length; i++) {
        partDataAsBytes[i] = parseInt(partData.substr(i * 2, 2), 16);
      }

      if (
        currentFrame === 0 &&
        (partDataAsBytes[0] === new Uint8Array([0x00])[0] || partDataAsBytes[0] === new Uint8Array([0x7b])[0])
      ) {
        // part_data for frame 0 MUST NOT begin with byte 00 or byte 7B.
        throw new Error('Error decoding invalid part data.');
      }

      if (completedFramesCount < totalFrameCount) {
        // we haven't filled all the frames yet
        const nextDataState = multipartData;

        nextDataState[currentFrame] = partDataAsBytes;

        const nextMissedFrames: number[] = [];

        nextDataState.forEach((current: Uint8Array | null, index: number) => {
          if (current === null) {
            nextMissedFrames.push(index + 1);
          }
        });
        const nextCompletedFramesCount = totalFrameCount - nextMissedFrames.length;

        setState({
          completedFramesCount: nextCompletedFramesCount,
          latestFrame: currentFrame,
          missedFrames: nextMissedFrames,
          multipartData: nextDataState,
          totalFrameCount,
        });

        if (totalFrameCount > 0 && nextCompletedFramesCount === totalFrameCount && !multipartComplete) {
          // all the frames are filled
          return _integrateMultiPartData(nextDataState, totalFrameCount);
        }

        return {
          completedFramesCount: nextCompletedFramesCount,
          missedFrames: nextMissedFrames,
          totalFrameCount,
        };
      } else {
        return _integrateMultiPartData(multipartData, totalFrameCount);
      }
    },
    [_integrateMultiPartData, state],
  );

  const setReady = useCallback((): void => {
    setState({ busy: false });
  }, []);

  const _setTXRequest = useCallback(
    (txRequest: EthereumParsedData | SubstrateTransactionParsedData): TxQRInfo => {
      setBusy();

      const isOversized = (txRequest as SubstrateCompletedParsedData)?.oversized || false;
      const isEthereum = isEthereumCompletedParsedData(txRequest);
      let genesisHash: string | undefined;

      if (isEthereum && !(txRequest.data && txRequest.data.rlp && txRequest.data.account)) {
        throw new Error('Scanned QR contains no valid extrinsic');
      }

      let tx, recipientAddress, dataToSign, evmChainId;

      if (isEthereum) {
        if (txRequest.data.rlp) {
          tx = createTransactionFromRLP(txRequest.data.rlp);

          if (!tx) {
            throw new Error('Cannot parse rlp transaction');
          }

          evmChainId = new BigN(tx.ethereumChainId).toNumber();
          recipientAddress = tx.action;
          dataToSign = txRequest.data.rlp;
        } else {
          tx = '';
          recipientAddress = '';
          dataToSign = keccakAsHex(txRequest.data.rlp);
        }
      } else {
        if (txRequest.oversized) {
          dataToSign = txRequest.data.data;
        } else {
          const payloadU8a = txRequest.data.data;
          const [offset] = compactFromU8a(payloadU8a);

          dataToSign = payloadU8a.subarray(offset);
        }

        // those 2 only make sense for ETH
        recipientAddress = '';
        tx = '';
        genesisHash = txRequest.data.genesisHash;
      }

      const sender = findAccountByAddress(accounts, txRequest.data.account);

      if (!sender) {
        throw new Error(`No private key found for account ${txRequest.data.account}.`);
      }

      const qrInfo: TxQRInfo = {
        dataToSign,
        isHash: (txRequest as SubstrateTransactionParsedData)?.isHash || false,
        isOversized,
        recipientAddress,
        senderAddress: txRequest.data.account,
        tx,
        type: 'transaction',
      };

      setState({
        ...qrInfo,
        rawPayload: (txRequest as SubstrateTransactionParsedData)?.data.rawPayload,
        genesisHash: genesisHash,
        isEthereumStructure: isEthereum,
        evmChainId,
      });

      return qrInfo;
    },
    [accounts, setBusy],
  );

  const _setDataToSign = useCallback(
    (signRequest: SubstrateMessageParsedData | EthereumParsedData): MessageQRInfo => {
      setBusy();

      const address = signRequest.data.account;
      const genesisHash = (signRequest as SubstrateMessageParsedData).data.genesisHash;
      let message = '';
      let isHash = false;
      let isOversized = false;
      let dataToSign = '';
      let isEthereumStructure = false;

      if (isSubstrateMessageParsedData(signRequest)) {
        if (signRequest.data.crypto !== 'sr25519') {
          throw new Error('Stylo only supports accounts using sr25519 crypto');
        }

        isHash = signRequest.isHash;
        isOversized = signRequest.oversized;
        dataToSign = signRequest.data.data;
        message = dataToSign;
      } else {
        dataToSign = signRequest.data.data;
        message = signRequest.data.data;
        isEthereumStructure = true;
      }

      const sender = findAccountByAddress(accounts, address);

      if (!sender) {
        throw new Error(`No account found in Stylo for: ${address}.`);
      }

      const qrInfo: MessageQRInfo = {
        dataToSign,
        isHash,
        isOversized,
        message: message.toString(),
        senderAddress: sender.address,
        type: 'message',
      };

      setState({
        ...qrInfo,
        genesisHash: genesisHash,
        isEthereumStructure: isEthereumStructure,
      });

      return qrInfo;
    },
    [accounts, setBusy],
  );

  const setData = useCallback(
    (unsignedData: CompletedParsedData): QrInfo => {
      if (unsignedData !== null) {
        switch (unsignedData.action) {
          case 'signTransaction':
            return _setTXRequest(unsignedData);
          case 'signData':
            return _setDataToSign(unsignedData);
          default:
            throw new Error('Scanned QR should contain either extrinsic or a message to sign');
        }
      } else {
        throw new Error('Scanned QR should contain either extrinsic or a message to sign');
      }
    },
    [_setDataToSign, _setTXRequest],
  );

  // signing data with legacy account.
  const signDataLegacy = useCallback(
    async (savePass: boolean, password = ''): Promise<void> => {
      const { dataToSign, evmChainId, genesisHash, isEthereumStructure, isHash, rawPayload, senderAddress, type } =
        state;
      const sender = !!senderAddress && findAccountByAddress(accounts, senderAddress);
      const info: undefined | number | string = isEthereumStructure ? evmChainId : genesisHash;
      const senderNetwork = getNetworkJsonByInfo(
        networkMap,
        isEthereumAddress(senderAddress || ''),
        isEthereumStructure,
        info,
      );

      if (!senderNetwork) {
        throw new Error('Signing Error: network could not be found.');
      }

      if (!senderNetwork.active) {
        throw new Error(`Signing Error: Network ${senderNetwork.chain?.replace(' Relay Chain', '')} is not active.`);
      }

      if (!sender) {
        throw new Error('Signing Error: sender could not be found.');
      }

      if (!type) {
        throw new Error('Signing Error: type could not be found.');
      }

      const signData = async (): Promise<string> => {
        if (isEthereumStructure) {
          let signable;

          if (isU8a(dataToSign)) {
            signable = u8aToHex(dataToSign);
          } else if (isHex(dataToSign)) {
            signable = dataToSign;
          } else if (isAscii(dataToSign)) {
            signable = dataToSign;
          } else if (isHash) {
            signable = dataToSign;
          } else {
            throw new Error('Signing Error: cannot signing message');
          }

          const { signature } = await qrSignEvm({
            address: senderAddress,
            password: password,
            message: signable,
            type: type,
            chainId: evmChainId,
          });

          return signature;
        } else {
          let signable;

          if (dataToSign instanceof GenericExtrinsicPayload) {
            signable = u8aToHex(dataToSign.toU8a(true));
          } else if (isU8a(dataToSign)) {
            signable = u8aToHex(dataToSign);
          } else if (isAscii(dataToSign) || isHash) {
            signable = dataToSign;
          } else {
            throw new Error('Signing Error: cannot signing message');
          }

          try {
            const { signature } = await qrSignSubstrate({
              address: senderAddress,
              data: signable,
              savePass: savePass,
              password: password,
              networkKey: senderNetwork.key,
            });

            if (type === 'message') {
              return hexStripPrefix(signature).substring(2);
            }

            return hexStripPrefix(signature);
          } catch (e) {
            // console.error(e);
            throw new Error((e as Error).message);
          }
        }
      };

      const parseTransaction = async (): Promise<ResponseQrParseRLP | ResponseParseTransactionSubstrate | null> => {
        if (type === 'message') {
          return null;
        } else {
          if (!isEthereumStructure) {
            if (genesisHash && rawPayload) {
              const _rawPayload = isString(rawPayload) ? rawPayload : u8aToHex(rawPayload);

              return await parseSubstrateTransaction({ data: _rawPayload, networkKey: senderNetwork.key });
            } else {
              return null;
            }
          } else {
            if (dataToSign) {
              const _raw = isString(dataToSign) ? dataToSign : u8aToHex(dataToSign);

              return await parseEVMTransaction(_raw);
            } else {
              return null;
            }
          }
        }
      };

      const [signedData, parsedTx] = await Promise.all([signData(), parseTransaction()]);

      setState({ signedData, parsedTx, step: SCANNER_QR_STEP.FINAL_STEP });
    },
    [accounts, networkMap, state],
  );

  const clearMultipartProgress = useCallback((): void => {
    setState({
      completedFramesCount: DEFAULT_STATE.completedFramesCount,
      latestFrame: DEFAULT_STATE.latestFrame,
      missedFrames: DEFAULT_STATE.missedFrames,
      multipartComplete: DEFAULT_STATE.multipartComplete,
      multipartData: null,
      totalFrameCount: DEFAULT_STATE.totalFrameCount,
    });
  }, []);

  const cleanup = useCallback((): void => {
    setState({ ...DEFAULT_STATE });
  }, []);

  return (
    <ScannerContext.Provider
      value={{
        cleanup,
        clearMultipartProgress,
        setBusy,
        setData,
        setPartData,
        setReady,
        setStep,
        signDataLegacy,
        state,
      }}>
      {children}
    </ScannerContext.Provider>
  );
}
