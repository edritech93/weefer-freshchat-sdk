import React from 'react';
import {TextStyle, TextProps} from 'react-native';
import {HelperText} from 'react-native-paper';

interface ITextError extends TextProps {
  isError: boolean;
  message: string;
  style?: TextStyle;
}

export default function TextError(props: ITextError) {
  const {isError = false, message, style, ...restProps} = props;
  if (isError) {
    return (
      <HelperText
        testID={'textErrorId'}
        type={'error'}
        visible={true}
        style={style}
        {...restProps}>
        {message}
      </HelperText>
    );
  } else {
    return null;
  }
}
