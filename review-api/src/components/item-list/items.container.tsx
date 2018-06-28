import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { ItemListComponent } from './items.component';
import { updateTitle } from '../../actions/item/item.actions';
import { updateCategory } from '../../actions/category/category.actions';

const mapStateToProps = (state: IState) => (state);

export const mapDispatchToProps = {
  updateCategory,
  updateTitle,
};

export const ItemListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemListComponent);