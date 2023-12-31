// Copyright 2023 @soul-wallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { u8aWrapBytes } from '@polkadot/util';
import DisplayPayload from 'components/Payload/DisplayPayload';
import React, { useMemo } from 'react';

export declare const wrapBytes: typeof u8aWrapBytes;
import { ExtrinsicPayload } from '@polkadot/types/interfaces';

interface Props {
  address: string;
  genesisHash: string;
  payload: ExtrinsicPayload | string;
}

const SubstrateQr: React.FC<Props> = (props: Props) => {
  const { address, genesisHash, payload } = props;

  const payloadU8a = useMemo(() => (typeof payload === 'string' ? wrapBytes(payload) : payload.toU8a()), [payload]);
  const isMessage = useMemo(() => typeof payload === 'string', [payload]);

  return (
    <DisplayPayload
      address={address}
      genesisHash={genesisHash}
      isEthereum={false}
      isHash={false}
      isMessage={isMessage}
      hashPayload={payloadU8a}
    />
  );
};

export default SubstrateQr;
