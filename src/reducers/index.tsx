import {persistReducer} from 'redux-persist';
import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import immutableTransform from 'redux-persist-transform-immutable';
import fc from './fc';
import auth from './auth';
import database from './database';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [immutableTransform()],
};

const appReducer = combineReducers({
  fc,
  auth,
  database,
});

export default persistReducer(rootPersistConfig, appReducer);
