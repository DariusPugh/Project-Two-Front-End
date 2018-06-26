import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { RegisterComponent } from './register.component';
import { updateCognitoUser } from '../../actions/cognito-user/cognito-user.actions'
import { registerEmail, registerError, registerUsername, registerPassword } from '../../actions/register/register.actions';

const mapStateToProps = (state: IState) => ({...state.register, cognito: {...state.cognitoUser}});

export const mapDispatchToProps = {
  registerEmail,
  registerError,
  registerPassword,
  registerUsername,
  updateCognitoUser,
};

export const RegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterComponent);
