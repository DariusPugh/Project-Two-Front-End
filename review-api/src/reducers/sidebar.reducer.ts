import { ISidebar } from '.';
import { sidebarTypes } from '../actions/sidebar/sidebar.types';

const initialState: ISidebar = {
  input: ''
}

export const sidebarReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case sidebarTypes.UPDATE_INPUT:
      return {
        ...state,
        input: action.payload.input
      }
  }

  return state;
};