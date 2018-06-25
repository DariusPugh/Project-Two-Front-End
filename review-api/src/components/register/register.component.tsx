import * as React from 'react';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'
// import { reviewApiAxios } from "../../interceptors/review-interceptor";

export class RegisterComponent extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        console.log(props);
      }
    
    public registerUsername = (e: any) => {
        const username = e.target.value;
        this.props.registerUsername(username);
      }
    
    public registerPassword = (e: any) => {
        const password = e.target.value
        this.props.registerPassword(password);
      }
    
    public registerEmail = (e: any) => {
        const email = e.target.value
        this.props.registerEmail(email);
      }

    public submit = (e: any, username: string, password:string) => {
        e.preventDefault();
        const poolData = { 
            ClientId : '7nfuc6t315038970o2664ltn0d',
            UserPoolId : 'us-east-2_uIEwE9Qxu'           
        };

        const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        const attributeList = [];
        const dataEmail = {
            Name : 'email',
            Value : this.props.email
        };

        // const dataPhoneNumber = {
        //     Name : 'phone_number',
        //     Value : '+15555555555'
        // };

        const attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
        // const attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(dataPhoneNumber);

        attributeList.push(attributeEmail);
        // attributeList.push(attributePhoneNumber);

        userPool.signUp(username, password, attributeList, [], 
            (err: any, result: any) => {
            if (err) {
                console.log(err);
                return;
            }
            const cognitoUser = result.user;
            console.log('user name is ' + cognitoUser.getUsername());
        });
    }   
    //     const {regusername, regpassword, email } = this.props; // destructuring
    //     // const dynamoUpdate = (username, password, role) => {
    //         reviewApiAxios.post('/user/' )
    //         body: JSON.stringify({ regusername, regpassword, email }),
    //         .then( resp => {
                
    //             console.log(resp.data);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    //     //   }
    // }     
    
    // reviewApiAxios.post('/user/username', {
    //     username: this.props.regUsername,
    //     email: this.props.email,
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    
    
    public render() {
        return (
            <form>
                <form onSubmit={(e:any)=>{this.submit(e, this.props.regusername, this.props.regpassword)}}>
                <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="input-title">Username</label>
                    <input 
                        value = {this.props.username}
                        onChange = {this.registerUsername}
                        type="text" 
                        className="form-control" 
                        id="input-username" 
                        placeholder="Username"/>
                </div>
                </div>
                <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="input-amount">Password</label>
                    <input 
                        value = {this.props.password}
                        onChange = {this.registerPassword}
                        type="text" 
                        className="form-control" 
                        id="input-password" 
                        placeholder="Password"/>
                </div>
                </div>
                <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="input-description">Email</label>
                    <input 
                        value = {this.props.email}
                        onChange = {this.registerEmail}
                        type="text" 
                        className="form-control" 
                        id="input-email" 
                        placeholder="email"/>
                </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </form>
        );
    }
}
