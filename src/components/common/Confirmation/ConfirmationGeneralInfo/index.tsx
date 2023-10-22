import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { ConfirmationRequestBase } from '@soul-wallet/extension-base/src/background/types';
import { getDomainFromUrl } from '@soul-wallet/extension-base/src/utils';
import { Image } from 'components/Design';
import DualLogo from 'components/Logo/DualLogo';
import { useSoulWalletTheme } from 'hooks/useSoulWalletTheme';
import createStyle from './styles';
// import { ImageLogosMap } from 'assets/logo';
import { isWalletConnectRequest } from '@soul-wallet/extension-base/src/services/wallet-connect-service/helpers';
import { SVGImages } from 'assets/index';

interface Props {
  request: ConfirmationRequestBase;
  gap?: number;
}

const ConfirmationGeneralInfo: React.FC<Props> = (props: Props) => {
  const { request, gap = 0 } = props;
  const domain = getDomainFromUrl(request.url);
  const leftLogoUrl = `https://icons.duckduckgo.com/ip2/${domain || 'https://soulswap.finance'}.ico`;
  const isWCRequest = useMemo(() => isWalletConnectRequest(request.id), [request.id]);
  const theme = useSoulWalletTheme().swThemes;

  const styles = useMemo(() => createStyle(theme, gap), [theme, gap]);

  return (
    <View style={styles.container}>
      <DualLogo
        leftLogo={<Image shape={'squircle'} src={"https://soulswap.finance/favicon.png"} squircleSize={56} />}
        linkIcon={isWCRequest ? <SVGImages.WalletConnect width={24} height={24} color={theme.colorWhite} /> : undefined}
        rightLogo={<Image shape="squircle" src={{ uri: leftLogoUrl }} squircleSize={56} />}
      />
      <Text style={styles.text}>{domain}</Text>
    </View>
  );
};

export default ConfirmationGeneralInfo;
