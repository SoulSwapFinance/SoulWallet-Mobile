import { ArrowFatLinesDown, PaperPlaneTilt, ShoppingCartSimple } from 'phosphor-react-native';
import MagicBall from 'assets/svg/MagicBall';
import { getButtonIcon } from 'utils/button';
import React from 'react';

const ReceiveIcon = React.lazy(() => import('assets/icons/receive.svg'));
const BuyIcon = React.lazy(() => import('assets/icons/buy.svg'));
const SendIcon = React.lazy(() => import('assets/icons/send.svg'));
const CopyIcon = React.lazy(() => import('assets/icons/copy.svg'));
const SwapIcon = React.lazy(() => import('assets/icons/swap.svg'));

// UI NOTE: BUTTON ICONS
export const ButtonIcon = {
  Receive: getButtonIcon(ReceiveIcon, 'duotone', 'md'),
  SendFund: getButtonIcon(SendIcon, 'duotone', 'md'),
  Buy: getButtonIcon(BuyIcon, 'duotone', 'md'),
  Copy: getButtonIcon(CopyIcon, 'duotone', 'md'),
  Swap: getButtonIcon(SwapIcon, 'duotone', 'md'),
};
