import * as React from 'react';
import * as awsCognito from 'amazon-cognito-identity-js';


export class SignOutComponent extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
  }

  public onFailure = (err: any) => {
    console.log(err);
  }

  public onSuccess = (result: awsCognito.CognitoUserSession) => {
    console.log('Logout success' + result)
  }

 
  public signout = () => {
    // console.log(this.props.cognitoUser.user.globalSignOut);
    this.props.cognitoUser.user.globalSignOut({
      onFailure: this.onFailure,
      onSuccess: this.onSuccess,
    });
    // this.props.history.push('/sign-in');
  }

  public render() {
    return (
      <div>
        <button className="btn btn-danger" onClick={this.signout}>Sign Out</button>
      </div>
    );
  }
}