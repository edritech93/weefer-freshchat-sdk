import {fork} from 'redux-saga/effects';
import {watchFreshchatConfigRequest, watchFreshchatIdentityRequest} from './fc';
import {watchAlertShow} from './app';

export default function* root(): any {
  yield [
    yield fork(watchFreshchatConfigRequest),
    yield fork(watchFreshchatIdentityRequest),
    yield fork(watchAlertShow),
  ];
}
