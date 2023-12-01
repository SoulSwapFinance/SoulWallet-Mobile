import React, { forwardRef, useMemo, useState } from 'react';
import { TextInput, View, ViewStyle } from 'react-native';
import { DisabledStyle } from 'styles/sharedStyles';
import { FieldBaseProps } from 'components/Field/Base';
import { Warning } from 'components/Warning';
import { useSoulWalletTheme } from 'hooks/useSoulWalletTheme';
import { Button, Icon, Input } from 'components/Design';
import { Eye, EyeSlash, Key } from 'phosphor-react-native';
import createStyles from './styles';

interface Props extends FieldBaseProps {
  onChangeText?: (text: string) => void;
  onEndEditing?: () => void;
  onBlur?: () => void;
  errorMessages?: string[];
  isBusy?: boolean;
  autoFocus?: boolean;
  onSubmitField?: () => void;
  defaultValue?: string;
  showEyeButton?: boolean;
  placeholder?: string;
  containerStyle?: ViewStyle;
  disabled?: boolean;
}

const InlinePassword = forwardRef((passwordFieldProps: Props, ref: React.Ref<TextInput>) => {
  const {
    defaultValue,
    onChangeText,
    onEndEditing,
    onBlur,
    errorMessages,
    isBusy,
    autoFocus,
    onSubmitField,
    showEyeButton = true,
    placeholder,
    containerStyle,
    disabled,
  } = passwordFieldProps;
  const [isShowPassword, setShowPassword] = useState<boolean>(false);
  const [isFocus, setFocus] = useState<boolean>(false);
  const theme = useSoulWalletTheme().swThemes;
  const styles = useMemo(
    () => createStyles(theme, !(errorMessages && errorMessages.length), undefined, isFocus),
    [theme, errorMessages, isFocus],
  );

  const onInputFocus = () => {
    setFocus(true);
  };
  const onInputBlur = () => {
    onBlur && onBlur();
    setFocus(false);
  };

  return (
    <>
      <View style={[styles.inputContainer, containerStyle, disabled && DisabledStyle]}>
        <Input
          ref={ref}
          leftPart={<Icon phosphorIcon={Key} weight={'regular'} size={'sm'} iconColor={theme['gray-5']} />}
          leftPartStyle={styles.leftInputStyle}
          inputStyle={styles.textInput}
          rightPart={
            showEyeButton &&
            (isShowPassword ? (
              <Button
                disabled={isBusy}
                onPress={() => setShowPassword(false)}
                size={'xs'}
                type={'ghost'}
                icon={<Icon phosphorIcon={Eye} weight={'regular'} size={'sm'} iconColor={theme['gray-5']} />}
              />
            ) : (
              <Button
                disabled={isBusy}
                onPress={() => setShowPassword(true)}
                size={'xs'}
                type={'ghost'}
                icon={<Icon phosphorIcon={EyeSlash} weight={'regular'} size={'sm'} iconColor={theme['gray-5']} />}
              />
            ))
          }
          rightPartStyle={styles.rightInputStyle}
          isError={!!(errorMessages && errorMessages.length)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          autoCorrect={false}
          placeholderTextColor={theme.colorTextTertiary}
          selectionColor={theme.colorTextDisabled}
          secureTextEntry={!isShowPassword}
          blurOnSubmit={false}
          textContentType="oneTimeCode"
          selectTextOnFocus={!isBusy}
          onSubmitEditing={onSubmitField}
          onChangeText={onChangeText}
          onEndEditing={onEndEditing}
          onBlur={onInputBlur}
          onFocus={onInputFocus}
          defaultValue={defaultValue || ''}
        />
      </View>

      {!!(errorMessages && errorMessages.length) &&
        errorMessages.map((message, index) => (
          <Warning key={index} isDanger message={message} style={styles.warningStyle} />
        ))}
    </>
  );
});

export default InlinePassword;
