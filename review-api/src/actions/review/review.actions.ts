import { reviewTypes } from "./review.types";

export const updateReviewID = (rID: number) => {
  return {
    payload: {
      rID
    },
    type: reviewTypes.UPDATE_REVIEW_ID,
  }
}