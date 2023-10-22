// Copyright 2023 @soul-wallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ImageLogosMap } from 'assets/logo';
import React from 'react';
import ConnectQrSigner from './index';
import i18n from 'utils/i18n/i18n';

type Props = {};

const ConnectKeystone: React.FC<Props> = () => {
  return (
    <ConnectQrSigner
      description={i18n.attachAccount.connectKeystoneMessage2}
      instructionUrl={'Connect QR Wallet'}
      logoUrl={ImageLogosMap.keystone}
      subTitle={i18n.attachAccount.connectKeystoneMessage1}
      title={i18n.header.connectKeystoneDevice}
    />
  );
};

export default ConnectKeystone;
