import React from 'react';
import { Typography } from 'components/Design';
import { FontMedium, FontSemiBold } from 'styles/sharedStyles';
import { useSoulWalletTheme } from 'hooks/useSoulWalletTheme';

export const HideBalanceItem = () => {
  const theme = useSoulWalletTheme().swThemes;
  return (
    <>
      <Typography.Text
        style={{
          fontSize: theme.fontSizeLG,
          ...FontSemiBold,
          lineHeight: theme.lineHeightLG * theme.fontSizeLG,
          color: theme.colorTextLight1,
        }}>
        ******
      </Typography.Text>
      <Typography.Text
        style={{
          ...FontMedium,
          fontSize: theme.fontSizeSM,
          lineHeight: theme.lineHeightSM * theme.fontSizeSM,
          color: theme.colorTextLight4,
        }}>
        ******
      </Typography.Text>
    </>
  );
};
