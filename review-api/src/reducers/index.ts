import { CognitoUser } from "amazon-cognito-identity-js";
import { combineReducers } from "redux";
import { sidebarReducer } from "../reducers/sidebar.reducer";
import { categoryReducer } from "./category.reducer";
import { cognitoUserReducer } from "./cognito-user.reducer";
import { itemReducer } from "./item.reducer";
import { reviewReducer } from "./review.reducer";
import { signInReducer } from "./sign-in.reducer";


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
    selectedItem: {}
}


export interface IState {
  signIn: ISignIn,
  sidebar: ISidebar,
  cognitoUser: ICognitoUser
};

export interface IState{
    category: ICategoryState,
    item: IItemState,
    review: IReviewState,
    sidebar: ISidebar,
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

export const state = combineReducers<IState>({
    category: categoryReducer,
    cognitoUser: cognitoUserReducer,
    item: itemReducer,
    review: reviewReducer,
    sidebar: sidebarReducer,
    signIn: signInReducer,
});


