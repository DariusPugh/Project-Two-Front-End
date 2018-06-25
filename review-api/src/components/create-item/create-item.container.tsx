import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { CreateItemComponent } from './create-item.component';
import { updateReviewID } from '../../actions/review/review.actions';

const mapStateToProps = (state: IState) => (state);

export const mapDispatchToProps = {
  updateReviewID
};

export const CreateItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateItemComponent);