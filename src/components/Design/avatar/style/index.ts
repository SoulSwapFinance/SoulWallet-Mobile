import { StyleSheet, ViewStyle } from 'react-native';
import { ThemeTypes } from 'styles/themes';

export interface AvatarStyles {
  container: ViewStyle;
}

export default (theme: ThemeTypes) =>
  StyleSheet.create<AvatarStyles>({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colorPrimary,
      backgroundColor: theme.colorBgSecondary,
      padding: 2,
      borderRadius: 999,
    },
  });
