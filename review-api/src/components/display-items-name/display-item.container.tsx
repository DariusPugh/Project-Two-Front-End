import { connect } from 'react-redux';
import { IState } from '../../reducers';
import {updateInput, updateSelectedItem} from '../../actions/sidebar/sidebar.actions'
import {updateTitle} from '../../actions/item/item.actions'
import {updateCategory} from '../../actions/category/category.actions'
import {DisplayItemComponent} from './display-item.component'

const mapStateToProps = (state: IState) => (state);

export const mapDispatchToProps = {
  updateCategory,
  updateInput,
  updateSelectedItem,
  updateTitle,
};

export const DisplayItemsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DisplayItemComponent);