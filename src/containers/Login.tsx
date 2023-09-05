import {ShowAlertType} from '../types/ShowAlertType';
import {ProfileType} from '../types/ProfileType';
import {profileChange} from '../actions/auth';
import {showAlert} from '../actions/app';
import {connect} from 'react-redux';
import Screen from '../screens/Login';

const mapStateToProps = (state: any) => {
  const {dataProfile} = Object.fromEntries(state.database.entries());
  return {dataProfile};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    showAlert: (args: ShowAlertType) => dispatch(showAlert(args)),
    profileChange: (args: ProfileType) => dispatch(profileChange(args)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Screen);
