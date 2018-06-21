import { itemTypes } from "./item.types";

export const updateTitle = (title: string) => (dispatch:any) => {
  dispatch({
    payload: {
      title
    },
    type: itemTypes.UPDATE_TITLE,
  });
}