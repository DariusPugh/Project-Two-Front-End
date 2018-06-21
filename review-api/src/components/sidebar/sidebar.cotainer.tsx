import { connect } from 'react-redux';
import { IState } from '../../reducers';
import {updateInput, updateItems} from '../../actions/sidebar/sidebar.actions'
import {SidebarComponent} from './sidebar.component'

const mapStateToProps = (state: IState) => (state.sidebar);

export const mapDispatchToProps = {
  updateInput,
  updateItems
};

export const SidebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SidebarComponent);
