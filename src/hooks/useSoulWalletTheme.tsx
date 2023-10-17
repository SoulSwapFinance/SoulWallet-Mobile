import { useContext } from 'react';
import { ThemeContext } from 'providers/contexts';

export const useSoulWalletTheme = () => {
  return useContext(ThemeContext);
};
