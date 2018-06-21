import { combineReducers } from "redux";
import { sidebarReducer } from "../reducers/sidebar.reducer"
import { signInReducer } from "./sign-in.reducer";
import { CognitoUser } from "amazon-cognito-identity-js";
import { cognitoUserReducer } from "./cognito-user.reducer";


export interface ICognitoUser { 
  user: CognitoUser | null
}

export interface ISignIn {
  errorMessage: string,
  firstSignIn: {
    code: string,
    isFirstSignIn: boolean,
    password: string,
    passwordConfirmation: string
  },
  password: string,
  username: string
}

export interface ISidebar{
    input: string,
    items: any[],
}


export interface IState {
  signIn: ISignIn,
  sidebar: ISidebar,
  cognitoUser: ICognitoUser
};

export const state = combineReducers<IState>({
  cognitoUser: cognitoUserReducer,
  sidebar: sidebarReducer,
  signIn: signInReducer,
});