import * as React from 'react';
import * as awsCognito from 'amazon-cognito-identity-js';
import  { Link } from 'react-router-dom'
import { AlertComponent } from './sign-out-alert.component';

export class SignOutComponent extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      show: false
    };
  }

  public componentDidMount() {
    this.state = {
      show: false
    };
  }

  public hideAlert = () => {
    this.setState({
      show: false
    })
  }

  public showAlert() {
    this.setState({
      show: true
    });
    setTimeout(this.hideAlert, 3000)
  }

  public onFailure = (err: any) => {
    console.log(err);
  }

  public onSuccess = (result: awsCognito.CognitoUserSession) => {
    console.log('Logout ' + result);
  }

  public updateCognitoUser = () => {
    const user = null;
    this.props.updateCognitoUser(user);
  }

  public signout = () => {
    // console.log(this.props.cognitoUser.user.globalSignOut);
    // console.log(this.props.cognitoUser.user.pool.getCurrentUser());
    // const cognitoUser = this.props.cognitoUser.user.pool.getCurrentUser();
    // console.log(cognitoUser)
    // this.props.session.user = null;
    if (this.props.cognitoUser.user != null) {
      // console.log(this.props.cognitoUser.user)
      // cognitoUser.signOut();
      // console.log(this.props.cognitoUser.user)
      this.props.cognitoUser.user.globalSignOut({
        onFailure: this.onFailure,
        onSuccess: this.onSuccess,
      });
    }
    this.updateCognitoUser();
  }

  public functions() {
    this.showAlert(),
    this.signout()
  }

  public render() {
    return (
      <div>
        <Link to='/home' >
        <button className="btn btn-danger" onClick={this.functions.bind(this)}>Sign Out</button> 
        </Link>
        {
          this.state.show &&
          <AlertComponent/>
        }
      </div>
    );
  }
}