import {fcCountChange, fcSetIdentity, fcConfigRequest} from '../actions/fc';
import {ShowAlertType} from '../types/ShowAlertType';
import {FcCountType} from '../types/FcCountType';
import {FcUserType} from '../types/FcUserType';
import {showAlert} from '../actions/app';
import {connect} from 'react-redux';
import Screen from '../screens/Home';

const mapStateToProps = (state: any) => {
  const {fcEnabled} = Object.fromEntries(state.fc.entries());
  const {profile} = Object.fromEntries(state.auth.entries());
  return {fcEnabled, profile};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fcCountChange: (args: FcCountType) => dispatch(fcCountChange(args)),
    fcSetIdentity: (args: FcUserType) => dispatch(fcSetIdentity(args)),
    fcConfigRequest: () => dispatch(fcConfigRequest()),
    showAlert: (args: ShowAlertType) => dispatch(showAlert(args)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Screen);
