import React, {useState} from 'react';
import {StyleProp, View, ViewStyle, ImageRequireSource} from 'react-native';
import {TextInput, useTheme, TextInputProps} from 'react-native-paper';
import TextError from './TextError';

interface IInputs extends TextInputProps {
  title?: string;
  value: string;
  message?: string;
  error?: any;
  isPassword?: boolean;
  editable?: boolean;
  multiline?: boolean;
  leftIcon?: ImageRequireSource;
  rightIcon?: ImageRequireSource;
  onChangeText: (args: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function Inputs(props: IInputs) {
  const {
    title = '',
    value = '',
    message = `${title} is required`,
    error = false,
    isPassword = false,
    editable = true,
    multiline = editable ? false : true,
    leftIcon,
    rightIcon,
    onChangeText,
    containerStyle,
    ...restProps
  } = props;

  const {colors} = useTheme();

  const [hidePassword, setHidePassword] = useState(isPassword);

  function _getRightIcon() {
    if (isPassword) {
      return (
        <TextInput.Icon
          onPress={() => setHidePassword(!hidePassword)}
          icon={hidePassword ? 'eye' : 'eye-off'}
        />
      );
    } else if (rightIcon) {
      return <TextInput.Icon icon={rightIcon} />;
    } else {
      return null;
    }
  }

  return (
    <View style={containerStyle}>
      <TextInput
        testID={'inputId'}
        mode={'outlined'}
        value={value}
        placeholder={`Type ${title}`}
        placeholderTextColor={colors.onSurfaceDisabled}
        editable={editable}
        autoCorrect={false}
        multiline={multiline}
        secureTextEntry={hidePassword}
        left={leftIcon && <TextInput.Icon icon={leftIcon} />}
        right={_getRightIcon()}
        onChangeText={(e: string) => onChangeText(e)}
        {...restProps}
      />
      <TextError isError={error} message={message} />
    </View>
  );
}
