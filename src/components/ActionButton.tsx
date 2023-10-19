import React from 'react';
import { StyleProp, TouchableOpacityProps, View, ViewStyle } from 'react-native';
import Text from '../components/Text';
import { FontMedium } from 'styles/sharedStyles';
import { Button, Image } from 'components/Design';
import { ThemeTypes } from 'styles/themes';
import { useSoulWalletTheme } from 'hooks/useSoulWalletTheme';
import { ButtonPropsType } from 'components/Design/Button/PropsType';

interface Props extends TouchableOpacityProps {
  label?: string;
  image?: string;
  icon?: ButtonPropsType['icon'];
  buttonWrapperStyle?: StyleProp<ViewStyle>;
}

function getButtonTextStyle(disabled: boolean, theme: ThemeTypes) {
  return {
    color: disabled ? theme.colorTextLight4 : theme.colorTextLightPurple,
    fontSize: 15,
    lineHeight: 26,
    ...FontMedium,
    paddingTop: 8,
  };
}

const ActionButton = (actionButtonProps: Props) => {
  const theme = useSoulWalletTheme().swThemes;
  const { label, image, icon, disabled, onPress, buttonWrapperStyle } = actionButtonProps;
  return (
    <View style={{ alignItems: 'center' }}>
      <View style={buttonWrapperStyle}>
      {image ? 
        <Image
          shape={'circle'}
          src={image}
          style={{height: 48, width: 48}}
          // @ts-ignore
          onPress={() => onPress && onPress()}
        /> :
        <Button
          shape={'circle'}
          size={'sm'}
          disabled={!!disabled}
          icon={icon}
          type={'secondary'} // black background
          // @ts-ignore
          onPress={() => onPress && onPress()}
        />
      }
      </View>

      {!!label && <Text style={getButtonTextStyle(!!disabled, theme)}>{label}</Text>}
    </View>
  );
};

export default ActionButton;
