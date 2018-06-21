import { ISidebar } from '.';
import { sidebarTypes } from '../actions/sidebar/sidebar.types';

const initialState: ISidebar = {
  input: '',
  items: [],
}

export const sidebarReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case sidebarTypes.UPDATE_INPUT:
      return {
        ...state,
        input: action.payload.input
      }
    case sidebarTypes.UPDATE_ITEMS:
      return{
        ...state,
        input: action.payload.items
      }
  }

  return state;
};