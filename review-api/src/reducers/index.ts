import { combineReducers } from "redux";
import { categoryReducer } from "./category.reducer";
import {sidebarReducer} from "../reducers/sidebar.reducer"

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
    sidebar: sidebarReducer
});


// export interface ISignIn {
//   username: string,
//   password: string,
//   errorMessage: string
// }

export interface ISidebar{
    input: string,

}

