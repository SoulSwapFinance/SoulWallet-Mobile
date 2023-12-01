import React from 'react';
import { ImageLogosMap } from 'assets/logo';

const CheckBoxIcon = React.lazy(() => import('./checkbox.svg'));
const SignalIcon = React.lazy(() => import('./signal.svg'));
const SignalSplashIcon = React.lazy(() => import('./signal-splash.svg'));
const CheckBoxFilledIcon = React.lazy(() => import('./checkbox-filled.svg'));
const NftIcon = React.lazy(() => import('./logo-nft.svg'));
const Logo = React.lazy(() => import('./soulwallet-logo.svg'));
const LogoGradient = React.lazy(() => import('./soulwallet-logo-gradient.svg'));
const MenuBarLogo = React.lazy(() => import('./menu-bar.svg'));
const IcHalfSquare = React.lazy(() => import('./ic-half-square.svg'));
const WalletConnect = React.lazy(() => import('./wallet-connect.svg'));
const Fingerprint = React.lazy(() => import('./fingerprint-simple.svg'));

export const SVGImages = {
  Logo,
  LogoGradient,
  CheckBoxIcon,
  CheckBoxFilledIcon,
  NftIcon,
  SignalIcon,
  SignalSplashIcon,
  MenuBarLogo,
  IcHalfSquare,
  WalletConnect,
  Fingerprint,
};

export const Images = {
  ...ImageLogosMap,
  loading: require('./loading.gif'),
  stackingEmptyList: require('./stacking-empty-list.png'),
  successStatusImg: require('./success-status.png'),
  failStatusImg: require('./fail-status.png'),
  backgroundImg: require('./bg-image.png'),
  historyEmpty: require('./transaction-history-coming-soon.png'),
  squircleBorder: require('./squircleBorder.png'),
  avatarPlaceholder: require('./avatar-placeholder.png'),
  circleRobot: require('./circle-robot.png'),
  crowdloanBanner: require('./crowdloan-banner.png'),
  crowdloanAdvertisingBanner: require('./crowdloan-advertising-banner.png'),
};
