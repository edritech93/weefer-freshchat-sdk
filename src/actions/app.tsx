import {ShowAlertType} from '../types/ShowAlertType';
import {ALERT} from './types';

export const showAlert = (args: ShowAlertType) => {
  return {type: ALERT.SHOW, args};
};
