import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ThemeTypes } from 'styles/themes';
import { ContainerHorizontalPadding, FontMedium, FontSemiBold, MarginBottomForSubmitButton } from 'styles/sharedStyles';

export interface ModalStyle {
  container: ViewStyle;
  footerModalStyle: ViewStyle;
  deleteModalConfirmationStyle: TextStyle;
  deleteModalMessageTextStyle: TextStyle;
  actionWrapper: ViewStyle;
  actionContainer: ViewStyle;
  headerTitle: TextStyle;
}

export default (theme: ThemeTypes) =>
  StyleSheet.create<ModalStyle>({
    container: {},
    footerModalStyle: { width: '100%', ...ContainerHorizontalPadding, ...MarginBottomForSubmitButton },
    deleteModalConfirmationStyle: {
      fontSize: theme.fontSizeLG,
      lineHeight: theme.fontSizeLG * theme.lineHeightLG,
      color: theme.colorError,
      ...FontSemiBold,
      textAlign: 'center',
      paddingBottom: theme.paddingMD,
    },
    deleteModalMessageTextStyle: {
      fontSize: theme.fontSize,
      lineHeight: theme.fontSize * theme.lineHeight,
      color: theme.colorTextTertiary,
      ...FontMedium,
      textAlign: 'center',
    },
    // Action Header
    actionContainer: {
      width: '100%',
      marginBottom: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    actionWrapper: { width: 30 },
    headerTitle: { color: theme.colorTextLight1 },
  });
