import {defineAction} from 'redux-define';
import {REQUEST, SUCCESS, FAILURE, CHANGE} from '../constants/state';

const appNamespace = defineAction('WEEFER_FRESHCHAT_SDK');

export const FC_CONFIG = defineAction(
  'FC_CONFIG',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);
export const FC_COUNT = defineAction('FC_COUNT', [CHANGE], appNamespace);
export const FC_SET_IDENTITY = defineAction(
  'FC_SET_IDENTITY',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);
export const DATA_RESTORE_ID = defineAction(
  'DATA_RESTORE_ID',
  [CHANGE],
  appNamespace,
);
export const DATA_PROFILE = defineAction(
  'DATA_PROFILE',
  [CHANGE],
  appNamespace,
);
export const PROFILE_SELECT = defineAction(
  'PROFILE_SELECT',
  [CHANGE],
  appNamespace,
);
