import { IItemState } from '.';
import { itemTypes } from '../actions/item/item.types';

const initialState: IItemState = {
  title: '',
}

export const categoryReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case itemTypes.UPDATE_TITLE:
      return {
        ...state,
        category: action.payload.title,
      };
  }

  return state;
};