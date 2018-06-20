import { itemTypes } from "./item.types";

export const updateTitle = (title: string) => {
  return {
    payload: {
      title
    },
    type: itemTypes.UPDATE_TITLE,
  }
}