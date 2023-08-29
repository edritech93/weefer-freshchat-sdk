import {DATA_PROFILE, DATA_RESTORE_ID} from '../actions/types';
import {ProfileType} from '../types/ProfileType';
import {FcUserType} from '../types/FcUserType';
import {DUMMY_PROFILE} from '../constants';
import {Record} from 'immutable';

const objectRecord = Record({
  dataRestoreId: [] as FcUserType[],
  dataProfile: DUMMY_PROFILE as ProfileType[],
});

const initialState = new objectRecord();

export default function database(state: any = initialState, action: any = {}) {
  switch (action.type) {
    case DATA_RESTORE_ID.CHANGE:
      return state.set('dataRestoreId', action.args);

    case DATA_PROFILE.CHANGE:
      return state.set('dataProfile', action.args);

    default:
      return state;
  }
}
