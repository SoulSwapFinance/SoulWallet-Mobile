import { StyleSheet } from 'react-native';
import { useSoulWalletTheme } from 'hooks/useSoulWalletTheme';

const Styles = () => {
  const theme = useSoulWalletTheme().swThemes;

  return StyleSheet.create({
    scrollViewContainer: { flex: 1, position: 'relative', marginBottom: theme.margin, marginTop: theme.marginXS },
    backdropImgStyle: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      height: 70,
      borderRadius: theme.borderRadiusLG,
    },
    backdropImgBlurView: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    linerGradientStyle: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, flex: 1 },
    contentContainer: { flex: 1, paddingTop: theme.paddingXXL, paddingHorizontal: theme.padding },
    logoWrapper: { flex: 1, alignItems: 'center', paddingBottom: theme.paddingXXL },
  });
};

export default Styles;
