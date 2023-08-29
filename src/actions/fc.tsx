import {FC_CONFIG, FC_COUNT, FC_SET_IDENTITY} from './types';
import {FcCountType} from '../types/FcCountType';
import {FcUserType} from '../types/FcUserType';

export const fcConfigRequest = () => {
  return {type: FC_CONFIG.REQUEST};
};

export const fcCountChange = (args: FcCountType) => {
  return {type: FC_COUNT.CHANGE, args};
};

export const fcSetIdentity = (args: FcUserType) => {
  return {type: FC_SET_IDENTITY.REQUEST, args};
};
