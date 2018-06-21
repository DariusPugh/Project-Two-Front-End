import { connect } from 'react-redux';
import { IState } from '../../reducers';
import {updateInput} from '../../actions/sidebar/sidebar.actions'
import {DisplayItemComponent} from './display-item.component'

const mapStateToProps = (state: IState) => (state);

export const mapDispatchToProps = {
  updateInput
};

export const DisplayItemsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DisplayItemComponent);