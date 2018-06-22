import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { ComposeComponent } from './compose.component';
import { updateReviewID } from '../../actions/review/review.actions';

const mapStateToProps = (state: IState) => (state);

export const mapDispatchToProps = {
  updateReviewID
};

export const ComposeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ComposeComponent);