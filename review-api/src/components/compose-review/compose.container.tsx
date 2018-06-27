import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { ComposeComponent } from './compose.component';
import { updateCategory } from '../../actions/category/category.actions';
import { updateTitle } from '../../actions/item/item.actions';

const mapStateToProps = (state: IState) => (state);

export const mapDispatchToProps = {
  updateCategory,
  updateTitle
};

export const ComposeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ComposeComponent);