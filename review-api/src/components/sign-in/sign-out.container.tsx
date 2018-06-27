import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { SignOutComponent } from './sign-out.component';


const mapStateToProps = (state: IState) => (state);

export const mapDispatchToProps = {

};

export const SignOutContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignOutComponent);
