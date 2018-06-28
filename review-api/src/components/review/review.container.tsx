import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { ReviewComponent } from './review.component';
import { updateReviewID } from '../../actions/review/review.actions';
import { updateCategory } from '../../actions/category/category.actions';
import { updateTitle } from '../../actions/item/item.actions';

const mapStateToProps = (state: IState) => (state);

export const mapDispatchToProps = {
  updateCategory,
  updateReviewID,
  updateTitle
};

export const ReviewContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReviewComponent);