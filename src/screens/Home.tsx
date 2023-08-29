import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {fcConfigRequest, fcCountChange, fcSetIdentity} from '../actions/fc';
import {Freshchat} from 'react-native-freshchat-sdk';
import {FcCountType} from '../types/FcCountType';
import {FcUserType} from '../types/FcUserType';
import {Button, Text, Title} from 'react-native-paper';
import {connect} from 'react-redux';
import {ProfileType} from '../types/ProfileType';
import {profileChange} from '../actions/auth';

interface IHome {
  fcEnabled: boolean;
  profile: ProfileType;
  dataProfile: ProfileType[];
  fcConfigRequest: () => void;
  fcCountChange: (args: FcCountType) => void;
  fcSetIdentity: (args: FcUserType) => void;
  profileChange: (args: ProfileType) => void;
}

function Home(props: IHome) {
  const {fcEnabled, profile, dataProfile} = props;

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

  const _onSwitchProfile = () => {
    const user = dataProfile.find(e => e.Id !== profile.Id);
    if (user) {
      Freshchat.resetUser();
      props.profileChange(user);
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.textStyle}>{'Weefer Freshchat SDK'}</Title>
      <Text style={styles.textStyle}>{`First Name: ${profile.FirstName}`}</Text>
      <Text style={styles.textStyle}>{`Last Name: ${profile.LastName}`}</Text>
      <Text style={styles.textStyle}>{`Email: ${profile.Email}`}</Text>
      <Text
        style={
          styles.textStyle
        }>{`Mobile Phone: +${profile.PhoneCode}${profile.Phone}`}</Text>
      <Button
        mode={'elevated'}
        onPress={() => Freshchat.showConversations()}
        style={styles.btnStyle}>
        {'Open FreshChat'}
      </Button>
      <Button
        mode={'elevated'}
        onPress={_onSwitchProfile}
        style={styles.btnStyle}>
        {'Switch Profile'}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'cyan',
  },
  textStyle: {
    color: 'red',
    marginBottom: 16,
  },
  btnStyle: {
    marginBottom: 24,
  },
});

const mapStateToProps = (state: any) => {
  const {fcEnabled} = Object.fromEntries(state.fc.entries());
  const {profile} = Object.fromEntries(state.auth.entries());
  const {dataProfile} = Object.fromEntries(state.database.entries());
  return {fcEnabled, profile, dataProfile};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fcCountChange: (args: FcCountType) => dispatch(fcCountChange(args)),
    fcSetIdentity: (args: FcUserType) => dispatch(fcSetIdentity(args)),
    fcConfigRequest: () => dispatch(fcConfigRequest()),
    profileChange: (args: ProfileType) => dispatch(profileChange(args)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
