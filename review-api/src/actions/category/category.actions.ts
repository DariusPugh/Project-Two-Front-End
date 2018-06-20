import { categoryTypes } from "./category.types";

export const updateCategory = (category: string) => {
  return {
    payload: {
      category
    },
    type: categoryTypes.UPDATE_CATEGORY,
  }
}