import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { CreateCategoryComponent } from './category.component';
import { updateReviewID } from '../../actions/review/review.actions';

const mapStateToProps = (state: IState) => (state);

export const mapDispatchToProps = {
  updateReviewID
};

export const CreateCategoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateCategoryComponent);