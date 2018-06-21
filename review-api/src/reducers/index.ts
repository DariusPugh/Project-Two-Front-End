import { combineReducers } from "redux";
import { sidebarReducer } from "../reducers/sidebar.reducer"
import { signInReducer } from "./sign-in.reducer";
import { CognitoUser } from "amazon-cognito-identity-js";
import { cognitoUserReducer } from "./cognito-user.reducer";


export interface ICognitoUser { 
  user: CognitoUser | null
}

export interface ISignIn {
  firstSignIn: {
    code: string,
    isFirstSignIn: boolean,
    password: string,
    passwordConfirmation: string
  },
  username: string,
  password: string,
  errorMessage: string
}

export interface ISidebar{
    input: string,
    items: any[],
}


export interface IState {
  cognitoUser: ICognitoUser,
  signIn: ISignIn,
  sidebar: ISidebar
};
export const state = combineReducers<IState>({
  cognitoUser: cognitoUserReducer,
  sidebar: sidebarReducer,
  signIn: signInReducer
});