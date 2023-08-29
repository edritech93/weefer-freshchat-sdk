import {ProfileType} from '../types/ProfileType';
import {PROFILE_SELECT} from '../actions/types';
import {DUMMY_PROFILE} from '../constants';
import {Record} from 'immutable';

const objectRecord = Record({
  profile: DUMMY_PROFILE[0] as ProfileType | null,
});

const initialState = new objectRecord();

export default function auth(state: any = initialState, action: any = {}) {
  switch (action.type) {
    case PROFILE_SELECT.CHANGE:
      return state.set('profile', action.args);

    default:
      return state;
  }
}
