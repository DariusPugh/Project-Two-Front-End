import { IReviewState } from '.';
import { reviewTypes } from '../actions/review/review.types';

const initialState: IReviewState = {
  rID: 0,
}

export const reviewReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case reviewTypes.UPDATE_REVIEW_ID:
      return {
        ...state,
        category: action.payload.category,
      };
  }

  return state;
};