import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {PrimaryButton, SecondaryButton} from '../components/Buttons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackType} from '../types/RootStackType';
import {Freshchat} from 'react-native-freshchat-sdk';
import {FcCountType} from '../types/FcCountType';
import {ProfileType} from '../types/ProfileType';
import {FcUserType} from '../types/FcUserType';
import {Text, Title} from 'react-native-paper';

interface IHome extends NativeStackScreenProps<RootStackType, 'Home'> {
  fcEnabled: boolean;
  profile: ProfileType;
  fcConfigRequest: () => void;
  fcCountChange: (args: FcCountType) => void;
  fcSetIdentity: (args: FcUserType) => void;
}

export default function Home(props: IHome) {
  const {navigation, fcEnabled, profile} = props;

  useEffect(() => {
    if (profile) {
      props.fcConfigRequest();
    }
  }, [profile]);

  useEffect(() => {
    if (fcEnabled) {
      Freshchat.getUnreadCountAsync((data: FcCountType) =>
        props.fcCountChange(data),
      );
      Freshchat.addEventListener(
        Freshchat.EVENT_UNREAD_MESSAGE_COUNT_CHANGED,
        () => {
          Freshchat.getUnreadCountAsync((data: FcCountType) =>
            props.fcCountChange(data),
          );
        },
      );
      Freshchat.addEventListener(
        Freshchat.EVENT_USER_RESTORE_ID_GENERATED,
        () =>
          Freshchat.getUser((data: FcUserType) => {
            props.fcSetIdentity(data);
          }),
      );
      return () => {
        Freshchat.removeEventListeners(
          Freshchat.EVENT_UNREAD_MESSAGE_COUNT_CHANGED,
        );
        Freshchat.removeEventListeners(
          Freshchat.EVENT_USER_RESTORE_ID_GENERATED,
        );
      };
    }
  }, [fcEnabled]);

  const _onLogout = () => {
    Freshchat.resetUser();
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Title style={styles.textStyle}>{'Profile'}</Title>
      <Text style={styles.textStyle}>{`First Name: ${
        profile?.FirstName ?? '-'
      }`}</Text>
      <Text style={styles.textStyle}>{`Last Name: ${
        profile?.LastName ?? '-'
      }`}</Text>
      <Text style={styles.textStyle}>{`Email: ${profile?.Email ?? '-'}`}</Text>
      <Text style={styles.textStyle}>{`Mobile Phone: +${
        profile?.PhoneCode ?? ''
      }${profile?.Phone ?? '-'}`}</Text>
      <PrimaryButton
        title={'Open FreshChat'}
        onPress={() => Freshchat.showConversations()}
        style={styles.btnStyle}
      />
      <SecondaryButton title={'Logout'} onPress={_onLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    marginBottom: 16,
  },
  btnStyle: {
    marginBottom: 24,
  },
});
