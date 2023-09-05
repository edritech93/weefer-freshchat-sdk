import React, {Fragment, useState, useEffect} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import {PrimaryButton, ScrollView, Inputs} from '../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FcEnvConfigType} from '../types/FcEnvConfigType';
import {ShowAlertType} from '../types/ShowAlertType';
import {RootStackType} from '../types/RootStackType';
import {ProfileType} from '../types/ProfileType';
import {Title} from 'react-native-paper';
import {FC_ENV} from '../actions/types';
import {Formik} from 'formik';
import ObjStorage from '../libs/ObjStorage';
import * as Yup from 'yup';

interface ILogin extends NativeStackScreenProps<RootStackType, 'Login'> {
  dataProfile: ProfileType[];
  showAlert: (args: ShowAlertType) => void;
  profileChange: (args: ProfileType) => void;
}

type BodyLoginType = {
  email: string;
  password: string;
};

export default function Login(props: ILogin) {
  const {navigation, dataProfile} = props;

  const [initialConfig, setInitialConfig] = useState<FcEnvConfigType>({
    fcAppId: '',
    fcApiKey: '',
    fcDomain: '',
  });

  const initialLogin: BodyLoginType = {
    email: '',
    password: '',
  };

  const validateConfig = Yup.object().shape({
    fcAppId: Yup.string().required('FreshChat APP ID is required'),
    fcApiKey: Yup.string().required('FreshChat API Key is required'),
    fcDomain: Yup.string().required('FreshChat Domain is required'),
  });

  const validateLogin = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  useEffect(() => {
    async function _loadConfig() {
      const objFcEnv: FcEnvConfigType | null = await ObjStorage.get(
        FC_ENV.CONFIG,
      ).catch(() => null);
      if (objFcEnv) {
        setInitialConfig({
          fcAppId: objFcEnv.fcAppId || '',
          fcApiKey: objFcEnv.fcApiKey || '',
          fcDomain: objFcEnv.fcDomain || '',
        });
      }
    }
    _loadConfig();
  }, []);

  const _onSubmitConfig = (values: FcEnvConfigType) => {
    ObjStorage.set(FC_ENV.CONFIG, values);
    props.showAlert({message: 'Set Config Successfully'});
  };

  const _onSubmitLogin = (values: BodyLoginType) => {
    const findUser = dataProfile.find(
      e => e.Email === values.email && e.Password === values.password,
    );
    if (findUser) {
      props.profileChange(findUser);
      navigation.replace('Home');
    } else {
      props.showAlert({message: 'Wrong Email/Password'});
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex1}
        behavior={'padding'}
        enabled={Platform.OS === 'ios' ? true : false}>
        <ScrollView>
          <Title>{'Configuration'}</Title>
          <Formik
            initialValues={initialConfig}
            enableReinitialize={true}
            validateOnMount={true}
            onSubmit={_onSubmitConfig}
            validationSchema={validateConfig}>
            {({
              values,
              handleChange,
              errors,
              setFieldTouched,
              touched,
              isValid,
              handleSubmit,
            }) => (
              <Fragment>
                <Inputs
                  title={'FreshChat APP ID'}
                  value={values.fcAppId}
                  error={touched.fcAppId && errors.fcAppId}
                  message={errors.fcAppId}
                  onBlur={() => setFieldTouched('fcAppId')}
                  onChangeText={handleChange('fcAppId')}
                  containerStyle={styles.wrapInput}
                />
                <Inputs
                  title={'FreshChat API Key'}
                  value={values.fcApiKey}
                  error={touched.fcApiKey && errors.fcApiKey}
                  message={errors.fcApiKey}
                  onBlur={() => setFieldTouched('fcApiKey')}
                  onChangeText={handleChange('fcApiKey')}
                  containerStyle={styles.wrapInput}
                />
                <Inputs
                  title={'FreshChat Domain'}
                  value={values.fcDomain}
                  error={touched.fcDomain && errors.fcDomain}
                  message={errors.fcDomain}
                  onBlur={() => setFieldTouched('fcDomain')}
                  onChangeText={handleChange('fcDomain')}
                  containerStyle={styles.wrapInput}
                />
                <PrimaryButton
                  title={'Set Config'}
                  disabled={!isValid}
                  onPress={handleSubmit as () => void}
                  style={styles.btnStyle}
                />
              </Fragment>
            )}
          </Formik>

          <Title>{'Login'}</Title>
          <Formik
            initialValues={initialLogin}
            enableReinitialize={true}
            validateOnMount={true}
            onSubmit={_onSubmitLogin}
            validationSchema={validateLogin}>
            {({
              values,
              handleChange,
              errors,
              setFieldTouched,
              touched,
              isValid,
              handleSubmit,
            }) => (
              <Fragment>
                <Inputs
                  title={'Email'}
                  value={values.email}
                  error={touched.email && errors.email}
                  message={errors.email}
                  onBlur={() => setFieldTouched('email')}
                  onChangeText={handleChange('email')}
                  containerStyle={styles.wrapInput}
                />
                <Inputs
                  title={'Password'}
                  value={values.password}
                  isPassword={true}
                  error={touched.password && errors.password}
                  message={errors.password}
                  onBlur={() => setFieldTouched('password')}
                  onChangeText={handleChange('password')}
                  containerStyle={styles.wrapInput}
                />
                <PrimaryButton
                  title={'Login'}
                  disabled={!isValid}
                  onPress={handleSubmit as () => void}
                  style={styles.btnStyle}
                />
              </Fragment>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  flex1: {
    flex: 1,
  },
  wrapInput: {
    marginBottom: 16,
  },
  wrapTitle: {
    marginBottom: 24,
  },
  btnStyle: {
    marginBottom: 24,
  },
});
