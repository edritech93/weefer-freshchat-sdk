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
      const arrayUpdate: FcUserType[] = state.get('dataRestoreId');
      const indexUpdate = arrayUpdate.findIndex(
        e => e.externalId === action.payload?.externalId,
      );
      if (indexUpdate >= 0) {
        arrayUpdate[indexUpdate].restoreId = action.payload.restoreId;
      } else {
        arrayUpdate.push(action.payload);
      }
      console.log('dataRestoreId: ', arrayUpdate);
      return state.set('dataRestoreId', arrayUpdate);

    case DATA_PROFILE.CHANGE:
      return state.set('dataProfile', action.args);

    default:
      return state;
  }
}
