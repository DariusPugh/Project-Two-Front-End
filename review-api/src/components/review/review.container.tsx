import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { ReviewComponent } from './review.component';
import { updateReviewID } from '../../actions/review/review.actions';

const mapStateToProps = (state: IState) => (state);

export const mapDispatchToProps = {
  updateReviewID
};

export const ReviewContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReviewComponent);