import { IItemState } from '.';
import { itemTypes } from '../actions/item/item.types';

const initialState: IItemState = {
  title: '',
}

export const itemReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case itemTypes.UPDATE_TITLE:
      return {
        ...state,
        title: action.payload.title,
      };
  }

  return state;
};