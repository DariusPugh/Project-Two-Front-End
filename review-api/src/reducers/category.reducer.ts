import { ICategoryState } from '.';
import { categoryTypes } from '../actions/category/category.types';

const initialState: ICategoryState = {
  category: '',
}

export const categoryReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case categoryTypes.UPDATE_CATEGORY:
      return {
        ...state,
        category: action.payload.category,
      };
  }

  return state;
};
