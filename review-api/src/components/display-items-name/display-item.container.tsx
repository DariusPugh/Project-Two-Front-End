import { connect } from 'react-redux';
import { IState } from '../../reducers';
import {updateInput, updateSelectedItem} from '../../actions/sidebar/sidebar.actions'
import {DisplayItemComponent} from './display-item.component'

const mapStateToProps = (state: IState) => (state);

export const mapDispatchToProps = {
  updateInput,
  updateSelectedItem
};

export const DisplayItemsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DisplayItemComponent);