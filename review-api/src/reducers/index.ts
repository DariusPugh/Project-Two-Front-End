import { combineReducers } from "redux";
import { categoryReducer } from "./category.reducer";
import {sidebarReducer} from "../reducers/sidebar.reducer";
import { itemReducer } from "./item.reducer";
import { reviewReducer } from "./review.reducer";

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
    item: itemReducer,
    review: reviewReducer,
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

