import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { EditItemComponent } from './edit-item.component';
import { updateReviewID } from '../../actions/review/review.actions';

const mapStateToProps = (state: IState) => (state);

export const mapDispatchToProps = {
  updateReviewID
};

export const EditItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditItemComponent);