import React, { useEffect, useMemo, useState } from 'react';
import { StyleProp, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import Icon from '../Icon';
import { TagPropsType } from './PropsType';
import { X } from 'phosphor-react-native';
import { useSoulWalletTheme } from 'hooks/useSoulWalletTheme';
import TagStyles from './style';

export const PresetBrandColorTypes = ["primary", "secondary"];
export const PresetStatusColorTypes = ["success", "processing", "error", "default", "warning", "danger"];
export const PresetPositionColorTypes = ["header"];
export const PresetColorTypes = ["pink", "red", "yellow", "orange", "cyan", "green", "blue", "purple", "geekblue", "magenta", "volcano", "gold", "lime"];
export type PresetBrandColorType = typeof PresetBrandColorTypes[number];
export type PresetColorType = typeof PresetColorTypes[number];
export type PresetStatusColorType = typeof PresetStatusColorTypes[number];
export type PresetPositionColorType = typeof PresetPositionColorTypes[number];

const PresetColorRegex = new RegExp(`^(${PresetColorTypes.join('|')})(-inverse)?$`);
const PresetStatusColorRegex = new RegExp(`^(${PresetStatusColorTypes.join('|')})$`);
const PresetBrandColorRegex = new RegExp(`^(${PresetBrandColorTypes.join('|')})$`);

export interface TagNativeProps extends TagPropsType {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

function capitalize(term: any): string {
  let termString = term.toString();
  return termString.charAt(0).toUpperCase() + termString.slice(1).toLowerCase();
}

const Tag: React.FC<TagNativeProps> = props => {
  const {
    closable,
    onClose,
    afterClose,
    style,
    children,
    color = 'secondary',
    bgType = 'filled',
    shape = 'default',
    icon,
  } = props;
  const theme = useSoulWalletTheme().swThemes;
  const _styles = TagStyles(theme);
  const [closed, setClosed] = useState<boolean>(false);
  const isPresetColor = (): boolean => {
    if (!color) {
      return false;
    }
    return PresetColorRegex.test(color) || PresetStatusColorRegex.test(color) || PresetBrandColorRegex.test(color);
  };

  const getTagColorBgc: ViewStyle = useMemo(() => {
    const tagBgc =
      // @ts-ignore

      bgType === 'default' ? theme[`${color}-1`] : bgType === 'filled' ? theme[`${color}-6`] : theme['gray-1'];
    // @ts-ignore

    const tagText = bgType === 'default' || bgType === 'gray' ? theme[`${color}-7`] : theme.colorText;

    return {
      backgroundColor: tagBgc,
      color: tagText,
    };
  }, [bgType, color, theme]);

  const getTagColorText: TextStyle = useMemo(() => {
    const tagText =
      // @ts-ignore

      bgType === 'default' || bgType === 'gray' ? theme[`${color}-7`] : theme.colorText;

    return {
      color: tagText,
    };
  }, [bgType, color, theme]);

  useEffect(() => {
    afterClose && afterClose();
  }, [afterClose, closed]);

  const onTagClose = () => {
    onClose && onClose();
    setClosed(true);
  };
  const presetColor = isPresetColor();
  // @ts-ignore
  const wrapStyle = (_styles as {[key: string]: any})[`${color}${capitalize(bgType)}Wrap`] || getTagColorBgc;
  // @ts-ignore
  const textStyle = (_styles as {[key: string]: any})[`${color}${capitalize(bgType)}Text`] || getTagColorText;

  const closableDom = closable ? (
    <TouchableOpacity style={_styles.close} onPress={onTagClose}>
      <Icon type="phosphor" phosphorIcon={X} customSize={12} iconColor={theme.colorTextDescription} />
    </TouchableOpacity>
  ) : null;

  return !closed ? (
    <View style={[_styles.tag, style]}>
      <View style={[_styles.wrap, presetColor && wrapStyle, shape && (_styles as {[key: string]: any})[`shape${capitalize(shape)}Style` as keyof typeof _styles]]}>
        {icon}
        {React.isValidElement(children) ? (
          children
        ) : (
          <Text style={[_styles.text, presetColor && textStyle, !!icon && { paddingLeft: 4 }]}>{children}</Text>
        )}
        {closableDom}
      </View>
    </View>
  ) : null;
};

export default Tag;
