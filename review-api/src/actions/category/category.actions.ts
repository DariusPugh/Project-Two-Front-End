import { categoryTypes } from "./category.types";

export const updateCategory = (category: string) => (dispatch:any) => {
  dispatch({
    payload: {
      category
    },
    type: categoryTypes.UPDATE_CATEGORY,
  });
}
