import * as React from 'react';
import { Container, Row, Col} from 'reactstrap';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'
import * as netService from '../../net-service/netService'
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

/******************************************************************************
 * Submit to cognito
 ******************************************************************************/
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
            this.props.history.push('/sign-in');
        });
    }   
    
    
    /***************************************************************
     * Submit to DynamoDB
     ***************************************************************/
    public submit2 = (e: any) => {

        const user = {
            banTimeout: 0,
            banned: 0,
            email: this.props.email, 
            role: 'user',
            username: this.props.regusername
          };
        console.log(user)
        netService.postData('/user',  user)
        .then((resp) => {
            console.log(resp);
        })
        .catch((err) => {
            console.log(err)
        })
    }

    public render() {
        return (
        <Container>
            <Row className="justify-content-center">
                <Col md={{ size: 8, offset: 2 }}>
                    <form onSubmit={this.submit2}>
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
                                type="password" 
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
                </Col>
            </Row>
        </Container>
        );
    }
}
