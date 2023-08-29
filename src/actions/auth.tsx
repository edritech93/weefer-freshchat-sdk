import {PROFILE_SELECT} from './types';
import {ProfileType} from '../types/ProfileType';

export const profileChange = (args: ProfileType) => {
  return {type: PROFILE_SELECT.CHANGE, args};
};
