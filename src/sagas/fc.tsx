import {Alert} from 'react-native';
import {
  Freshchat,
  FreshchatConfig,
  FreshchatUser,
  FreshchatNotificationConfig,
} from 'react-native-freshchat-sdk';
import {DATA_RESTORE_ID, FC_CONFIG, FC_SET_IDENTITY} from '../actions/types';
import {put, call, takeEvery, select} from 'redux-saga/effects';
import {FcConfigType} from '../types/FcConfigType';
import {ProfileType} from '../types/ProfileType';
import {FcUserType} from '../types/FcUserType';
import {fcSetIdentity} from '../actions/fc';
import ENV from 'react-native-config';

// NOTE: Freshchat config - Get Freshchat config
const getFreshchatConfig = async () => {
  // NOTE: response should from API
  const response: FcConfigType = {
    FreshChatAPIKey: ENV.FRESHCHAT_API_KEY || '',
    FreshChatAppId: ENV.FRESHCHAT_APP_ID || '',
    HelpdeskWebViewURL: ENV.DOMAIN || '',
  };
  return response;
};

const initFreshchat = async (body: any) => {
  const {FreshChatAppId, FreshChatAPIKey, HelpdeskWebViewURL} = body;
  if (FreshChatAppId && FreshChatAPIKey) {
    const objConfig = new FreshchatConfig(FreshChatAppId, FreshChatAPIKey);
    objConfig.domain = HelpdeskWebViewURL;
    objConfig.teamMemberInfoVisible = true;
    objConfig.cameraCaptureEnabled = true;
    objConfig.gallerySelectionEnabled = true;
    objConfig.responseExpectationEnabled = true;
    objConfig.showNotificationBanner = true; //iOS only
    objConfig.notificationSoundEnabled = true; //iOS only
    Freshchat.init(objConfig);
    return true;
  } else {
    return false;
  }
};

const setUserFreshChat = async (body: ProfileType) => {
  const {FirstName, LastName, Email, PhoneCode, Phone} = body;
  try {
    const user = new FreshchatUser();
    user.firstName = FirstName ?? '';
    user.lastName = LastName ?? '';
    user.email = Email;
    user.phoneCountryCode = PhoneCode;
    user.phone = Phone;
    Freshchat.setUser(user, (error: any) =>
      _showFcError(JSON.stringify(error)),
    );
    return true;
  } catch (error) {
    _showFcError(JSON.stringify(error));
    return false;
  }
};

const initFcNotification = async () => {
  const objConfig = new FreshchatNotificationConfig();
  objConfig.priority =
    FreshchatNotificationConfig.NotificationPriority.PRIORITY_HIGH;
  objConfig.notificationSoundEnabled = true;
  Freshchat.setNotificationConfig(objConfig);
  const token = 'FCM token here...';
  Freshchat.setPushRegistrationToken(token);
};

function* handleFreshchatConfig(_: any): any {
  try {
    const {profile} = yield select(getStateAuth);
    const payload = yield call(getFreshchatConfig);
    const isActive = yield call(initFreshchat, payload);
    if (isActive) {
      console.log('FreshChat is isActive...');
      yield call(setUserFreshChat, profile);
      yield call(initFcNotification);

      // NOTE: dataRestoreId should from API
      const {dataRestoreId} = yield select(getStateDatabase);
      const resRestoreId: FcUserType = dataRestoreId.find(
        (e: FcUserType) => e.externalId === profile.Id,
      );
      const bodyIdentity: FcUserType = {
        externalId: profile.Id,
        restoreId: resRestoreId?.restoreId ?? null,
      };
      yield put(fcSetIdentity(bodyIdentity));
    }
    yield put({type: FC_CONFIG.SUCCESS, payload, isActive});
  } catch (error) {
    yield put({type: FC_CONFIG.FAILURE, error});
    console.log(error);
  }
}

export function* watchFreshchatConfigRequest() {
  yield takeEvery(FC_CONFIG.REQUEST, handleFreshchatConfig);
}

function* handleFreshchatIdentity(action: any): any {
  try {
    const {args} = action;
    const {profile} = yield select(getStateAuth);
    Freshchat.identifyUser(args.externalId, args.restoreId, (error: any) =>
      _showFcError(JSON.stringify(error)),
    );
    if (args.restoreId) {
      // NOTE: upload restoreId is should to API
      const dataUpload: FcUserType = {
        externalId: profile.Id,
        restoreId: args.restoreId,
      };
      console.log('Upload restoreId to API: ', dataUpload);
      yield put({type: DATA_RESTORE_ID.CHANGE, payload: dataUpload});
    }
    yield put({type: FC_SET_IDENTITY.SUCCESS});
  } catch (error) {
    yield put({type: FC_SET_IDENTITY.FAILURE, error});
    console.log(error);
  }
}

export function* watchFreshchatIdentityRequest() {
  yield takeEvery(FC_SET_IDENTITY.REQUEST, handleFreshchatIdentity);
}

// NOTE: Helper Saga
const getStateAuth = (state: any) => Object.fromEntries(state.auth.entries());
const getStateDatabase = (state: any) =>
  Object.fromEntries(state.database.entries());

function _showFcError(message: string = '') {
  Alert.alert(
    'Error FreshChat',
    message,
    [
      {
        text: 'Ok',
        onPress: () => {},
      },
    ],
    {cancelable: true},
  );
}
