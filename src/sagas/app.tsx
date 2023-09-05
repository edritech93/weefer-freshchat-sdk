import {Alert} from 'react-native';
import {ShowAlertType} from '../types/ShowAlertType';
import {takeEvery} from 'redux-saga/effects';
import {ALERT} from '../actions/types';

function* handleShowAlert(action: any) {
  const {args} = action;
  if (args) {
    const {title = 'Info', message, status}: ShowAlertType = args;
    if (message && status !== 401) {
      const dataMessage =
        typeof message === 'object' ? JSON.stringify(message) : message;
      setTimeout(() => {
        Alert.alert(title, dataMessage, [
          {
            text: 'Ok',
            onPress: () => {},
          },
        ]);
      }, 500);
    }
  }
}

export function* watchAlertShow() {
  yield takeEvery(ALERT.SHOW, handleShowAlert);
}
