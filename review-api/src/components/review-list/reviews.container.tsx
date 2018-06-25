import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { ReviewListComponent } from './reviews.component';
import { updateReviewID } from '../../actions/review/review.actions';
import { updateTitle } from '../../actions/item/item.actions';
import { updateCategory } from '../../actions/category/category.actions';

const mapStateToProps = (state: IState) => (state);

export const mapDispatchToProps = {
  updateCategory,
  updateReviewID,
  updateTitle,
};

export const ReviewListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReviewListComponent);