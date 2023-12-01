import { ConfirmationRequestBase } from '@subwallet/extension-base/background/types';
import { getDomainFromUrl } from '@subwallet/extension-base/utils';
import { Image } from 'components/Design';
import DualLogo from 'components/Logo/DualLogo';
import { useSoulWalletTheme } from 'hooks/useSoulWalletTheme';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import createStyle from './styles';
// import { ImageLogosMap } from 'assets/logo';
import { isWalletConnectRequest } from '@subwallet/extension-base/services/wallet-connect-service/helpers';
import { SVGImages } from 'assets/index';
import { getHostName } from 'utils/browser';
import { useGetDAppList } from 'hooks/static-content/useGetDAppList';

interface Props {
  request: ConfirmationRequestBase;
  gap?: number;
}

const ConfirmationGeneralInfo: React.FC<Props> = (props: Props) => {
  const { request, gap = 0 } = props;
  const domain = getDomainFromUrl(request.url);
  const [rightLogo, setRightLogo] = useState(`https://icons.duckduckgo.com/ip2/${domain || 'soulswap.finance'}.ico`);
  const isWCRequest = useMemo(() => isWalletConnectRequest(request.id), [request.id]);
  const theme = useSoulWalletTheme().swThemes;
  const styles = useMemo(() => createStyle(theme, gap), [theme, gap]);
  const {
    browserDApps: { dApps },
  } = useGetDAppList();
  const onLoadImageError = useCallback(() => {
    if (rightLogo.includes('.ico')) {
      setRightLogo(`https://icons.duckduckgo.com/ip2/${domain}.png`);
      return;
    }
  }, [domain, rightLogo]);

  useEffect(() => {
    const dApp = dApps?.find(app => request.url.includes(getHostName(app.url)));

    if (dApp && dApp.icon) {
      setRightLogo(dApp.icon);
    }
  }, [dApps, request.url]);

  return (
    <View style={styles.container}>
      <DualLogo
        leftLogo={<Image shape={'squircle'} src={"https://soulswap.finance/favicon.png"} squircleSize={56} />}
        linkIcon={isWCRequest ? <SVGImages.WalletConnect width={24} height={24} color={theme.colorWhite} /> : undefined}
        rightLogo={<Image shape="squircle" src={{ uri: rightLogo || 'https://soulswap.finance/favicon.png' }} squircleSize={56} onError={onLoadImageError} />}
      />
      <Text style={styles.text}>{domain}</Text>
    </View>
  );
};

export default ConfirmationGeneralInfo;