import { StyleSheet, ViewStyle } from 'react-native';

export interface BrowserStyle {
  listItem: ViewStyle;
  container: ViewStyle;
}

export default () => {
  // const theme = useSoulWalletTheme().swThemes;
  return StyleSheet.create<BrowserStyle>({
    container: { flex: 1 },
    listItem: { marginBottom: 16 },
  });
};
