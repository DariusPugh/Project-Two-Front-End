import { combineReducers } from "redux";
import { categoryReducer } from "./category.reducer";

export interface IState{
    category: ICategoryState,
    item: IItemState,
    review: IReviewState,
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
});
