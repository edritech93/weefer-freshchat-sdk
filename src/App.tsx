import React from 'react';
import {SafeAreaView, StyleSheet, ActivityIndicator} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import configureStore from './libs/configureStore';
import Home from './screens/Home';

const {store, persistor} = configureStore();

export default function App() {
  return (
    <SafeAreaView style={styles.flex1}>
      <Provider store={store}>
        <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
          <Home />
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
});
