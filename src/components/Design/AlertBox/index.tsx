import { Typography } from 'components/Design';
import { useSoulWalletTheme } from 'hooks/useSoulWalletTheme';
import { Info } from 'phosphor-react-native';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { convertHexColorToRGBA } from 'utils/color';
import BackgroundIcon from '../BackgroundIcon';
import createStyles from './styles';

interface Props {
  type?: 'info' | 'warning' | 'error';
  title?: string;
  description: string;
}

interface ColorText {
  bgIconColor: string;
  iconColor: string;
  titleColor: string;
}

const AlertBox: React.FC<Props> = (props: Props) => {
  const { description, type = 'info', title } = props;

  const theme = useSoulWalletTheme().swThemes;

  const styles = useMemo(() => createStyles(theme), [theme]);

  const colors = useMemo((): ColorText => {
    switch (type) {
      case 'error':
        return {
          bgIconColor: convertHexColorToRGBA(theme.colorError, 0.1),
          iconColor: theme.colorError,
          titleColor: theme.colorError,
        };
      case 'warning':
        return {
          bgIconColor: convertHexColorToRGBA(theme.colorWarning, 0.1),
          iconColor: theme.colorWarning,
          titleColor: theme.colorWarning,
        };
      case 'info':
      default:
        return {
          bgIconColor: convertHexColorToRGBA(theme.colorPrimary, 0.1),
          iconColor: theme.colorPrimary,
          titleColor: theme.colorTextBase,
        };
    }
  }, [theme, type]);

  return (
    <View style={styles.wrapper}>
      <View>
        <BackgroundIcon
          backgroundColor={colors.bgIconColor}
          iconColor={colors.iconColor}
          phosphorIcon={Info}
          size="lg"
          weight="fill"
          shape="circle"
        />
      </View>
      <View style={styles.content}>
        { title && <Typography.Text style={[styles.title, { color: colors.titleColor }]}>{title}</Typography.Text> }
        <Typography.Text style={styles.description}>{description}</Typography.Text>
      </View>
    </View>
  );
};

export default AlertBox;
