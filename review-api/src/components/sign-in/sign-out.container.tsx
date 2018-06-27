import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { SignOutComponent } from './sign-out.component';
import { updateCognitoUser} from '../../actions/cognito-user/cognito-user.actions'

const mapStateToProps = (state: IState) => (state);

export const mapDispatchToProps = {
  updateCognitoUser
};

export const SignOutContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignOutComponent);
