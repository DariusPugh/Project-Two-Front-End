import { ISidebar } from '.';
import { sidebarTypes } from '../actions/sidebar/sidebar.types';

const initialState: ISidebar = {
  input: '',
  items: [],
  selectedItem:{}
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
        items: action.payload.items
      }
    case sidebarTypes.UPDATE_SELECTED_ITEM:
      return{
        ...state,
        selectedItem: action.payload.selectedItem
      }
  }

  return state;
};