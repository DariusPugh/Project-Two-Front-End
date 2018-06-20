import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { CategoryListComponent } from './categories.component';
import { updateCategory } from '../../actions/category/category.actions';

const mapStateToProps = (state: IState) => (state.category);

export const mapDispatchToProps = {
  updateCategory
};

export const SignInContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryListComponent);
