import {fork} from 'redux-saga/effects';
import {watchFreshchatConfigRequest, watchFreshchatIdentityRequest} from './fc';

export default function* root(): any {
  yield [
    yield fork(watchFreshchatConfigRequest),
    yield fork(watchFreshchatIdentityRequest),
  ];
}
