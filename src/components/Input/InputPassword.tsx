import React, { ForwardedRef, forwardRef, useMemo, useState } from 'react';
import { TextInput } from 'react-native';
import { InputProps } from 'components/Design/Input';
import { Button, Icon, Input } from 'components/Design';
import { useSoulWalletTheme } from 'hooks/useSoulWalletTheme';
import { Eye, EyeSlash } from 'phosphor-react-native';
import createStylesheet from 'components/Input/style/InputPassword';

interface Props extends InputProps {
  showEyeButton?: boolean;
}

const Component = ({ showEyeButton = true, ...inputProps }: Props, ref: ForwardedRef<TextInput>) => {
  const theme = useSoulWalletTheme().swThemes;
  const [isShowPassword, setShowPassword] = useState<boolean>(false);
  const stylesheet = createStylesheet(theme, showEyeButton);

  const RightPart = useMemo(() => {
    if (!showEyeButton) {
      return null;
    }

    return (
      <Button
        disabled={inputProps.disabled}
        onPress={() => setShowPassword(!isShowPassword)}
        size={'xs'}
        type={'ghost'}
        style={stylesheet.eyeButton}
        icon={
          <Icon
            phosphorIcon={isShowPassword ? EyeSlash : Eye}
            size={'sm'}
            iconColor={inputProps.readonly ? theme.colorTextLight5 : theme.colorTextLight3}
          />
        }
      />
    );
  }, [
    inputProps.disabled,
    inputProps.readonly,
    isShowPassword,
    showEyeButton,
    stylesheet.eyeButton,
    theme.colorTextLight3,
    theme.colorTextLight5,
  ]);

  return (
    <>
      <Input
        ref={ref}
        {...inputProps}
        textContentType="oneTimeCode"
        secureTextEntry={!isShowPassword}
        rightPart={RightPart}
        inputStyle={stylesheet.inputStyle}
      />
    </>
  );
};

export const InputPassword = forwardRef(Component);
