import { CognitoUser } from "amazon-cognito-identity-js";
import { combineReducers } from "redux";
import { sidebarReducer } from "../reducers/sidebar.reducer";
import { categoryReducer } from "./category.reducer";
import { cognitoUserReducer } from "./cognito-user.reducer";
import { itemReducer } from "./item.reducer";
import { reviewReducer } from "./review.reducer";
import { signInReducer } from "./sign-in.reducer";
import { registerReducer } from "./register.reducer";


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

export interface ISidebar {
    input: string,
    items: any[],
    selectedItem: {}
}

export interface IState {

    category: ICategoryState,
    item: IItemState,
    review: IReviewState,
    sidebar: ISidebar,
    signIn: ISignIn,
    cognitoUser: ICognitoUser
}


export interface ICategoryState {
    category: string,
}

export interface IItemState {
    title: string,
}

export interface IReviewState {
    rID: number,
}

export interface IRegister {
    error: string,
    email: string,
    regpassword: string,
    regusername: string
}

export interface IState{
    category: ICategoryState,
    item: IItemState,
    register: IRegister,
    review: IReviewState,
    sidebar: ISidebar,
}

export const state = combineReducers<IState>({
    category: categoryReducer,
    cognitoUser: cognitoUserReducer,
    item: itemReducer,
    register: registerReducer,
    review: reviewReducer,
    sidebar: sidebarReducer,
    signIn: signInReducer,
});


