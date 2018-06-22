import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { ReviewListComponent } from './reviews.component';
import { updateReviewID } from '../../actions/review/review.actions';

const mapStateToProps = (state: IState) => (state);

export const mapDispatchToProps = {
  updateReviewID
};

export const ReviewListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReviewListComponent);