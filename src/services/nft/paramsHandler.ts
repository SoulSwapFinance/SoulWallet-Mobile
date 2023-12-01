// Copyright 2019-2022 @subwallet/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { NftItem } from '@subwallet/extension-base/background/KoniTypes';
import { SUPPORTED_TRANSFER_CHAIN_NAME } from 'types/nft';

const RMRK_PREFIX = 'RMRK';
const RMRK_OP_TYPE = 'SEND';

function acalaParser(nftItem: NftItem) {
  const collectionId = parseInt(nftItem.collectionId as string);
  const itemId = parseInt(nftItem.id as string);

  return {
    collectionId,
    itemId,
    networkKey: nftItem.chain,
  };
}

function rmrkParser(nftItem: NftItem) {
  if (!nftItem.rmrk_ver) {
    return {};
  }

  const remark = `${RMRK_PREFIX}::${RMRK_OP_TYPE}::${nftItem.rmrk_ver}::${nftItem.id}::`;

  return {
    remark,
    networkKey: nftItem.chain,
  };
}

function uniqueParser(nftItem: NftItem) {
  const collectionId = parseInt(nftItem.collectionId as string);
  const itemId = parseInt(nftItem.id as string);

  return {
    collectionId,
    itemId,
    networkKey: nftItem.chain,
  };
}

function statemineParser(nftItem: NftItem) {
  const collectionId = parseInt(nftItem.collectionId as string);
  const itemId = parseInt(nftItem.id as string);

  return {
    collectionId,
    itemId,
    networkKey: nftItem.chain,
  };
}

function web3Parser(nftItem: NftItem) {
  const contractAddress = nftItem.collectionId as string;
  const tokenId = parseInt(nftItem.id as string);

  return {
    contractAddress,
    tokenId,
  };
}

function psp34Parser(nftItem: NftItem) {
  const contractAddress = nftItem.collectionId as string;
  const onChainOption = nftItem.onChainOption as Record<string, string>;

  return {
    contractAddress,
    onChainOption,
    isPsp34: true,
    networkKey: nftItem.chain,
  };
}

export default function paramsHandler(nftItem: NftItem, networkKey: string) {
  if (nftItem.type === "ERC721") {
    return web3Parser(nftItem);
  } else if (nftItem.type === "PSP34") {
    return psp34Parser(nftItem);
  } else {
    switch (networkKey) {
      case SUPPORTED_TRANSFER_CHAIN_NAME.acala:
        return acalaParser(nftItem);
      case SUPPORTED_TRANSFER_CHAIN_NAME.karura:
        return acalaParser(nftItem);
      case SUPPORTED_TRANSFER_CHAIN_NAME.kusama:
        return rmrkParser(nftItem);
      case SUPPORTED_TRANSFER_CHAIN_NAME.unique_network:
        return uniqueParser(nftItem);
      case SUPPORTED_TRANSFER_CHAIN_NAME.quartz:
        return uniqueParser(nftItem);
      case SUPPORTED_TRANSFER_CHAIN_NAME.opal:
        return uniqueParser(nftItem);
      case SUPPORTED_TRANSFER_CHAIN_NAME.statemine:
        return statemineParser(nftItem);
      case SUPPORTED_TRANSFER_CHAIN_NAME.statemint:
        return statemineParser(nftItem);
      case SUPPORTED_TRANSFER_CHAIN_NAME.bitcountry:
        return acalaParser(nftItem);
      case SUPPORTED_TRANSFER_CHAIN_NAME.pioneer:
        return acalaParser(nftItem);
    }
  }

  return {};
}
