import {FcConfigType} from '../types/FcConfigType';
import {FcCountType} from '../types/FcCountType';
import {FC_CONFIG, FC_COUNT} from '../actions/types';
import {Record} from 'immutable';

const objectRecord = Record({
  fcConfig: null as FcConfigType | null,
  fcEnabled: false as boolean,
  fcCount: null as FcCountType | null,
});

const initialState = new objectRecord();

export default function fc(state: any = initialState, action: any = {}) {
  switch (action.type) {
    case FC_CONFIG.REQUEST:
    case FC_CONFIG.FAILURE:
      return state.set('fcConfig', null);

    case FC_CONFIG.SUCCESS:
      return state
        .set('fcConfig', action.payload)
        .set('fcEnabled', action.isActive);

    case FC_COUNT.CHANGE:
      return state.set('fcCount', action.args);

    default:
      return state;
  }
}
