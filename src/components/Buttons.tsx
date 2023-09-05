import React from 'react';
import {Button} from 'react-native-paper';

type ButtonType = {
  title: string;
  onPress: () => void;
} & Omit<React.ComponentProps<typeof Button>, 'children'>;

export function PrimaryButton(props: ButtonType) {
  const {title, onPress, ...restProps} = props;
  return (
    <Button
      testID={'btnPrimaryId'}
      mode={'contained'}
      uppercase={false}
      onPress={() => onPress()}
      {...restProps}>
      {title}
    </Button>
  );
}

export function SecondaryButton(props: ButtonType) {
  const {title, onPress, ...restProps} = props;
  return (
    <Button
      testID={'btnSecondaryId'}
      mode={'outlined'}
      uppercase={false}
      onPress={() => onPress()}
      {...restProps}>
      {title}
    </Button>
  );
}
