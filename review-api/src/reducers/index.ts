import { combineReducers } from "redux";
import {sidebarReducer} from "../reducers/sidebar.reducer"


// export interface ISignIn {
//   username: string,
//   password: string,
//   errorMessage: string
// }

export interface ISidebar{
    input: string,

}


export interface IState {
//   signIn: ISignIn,
  sidebar: ISidebar,
};

export const state = combineReducers<IState>({
  sidebar: sidebarReducer,
});