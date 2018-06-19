import { connect } from 'react-redux';
import { IState } from '../../reducers';
import {updateInput} from '../../actions/sidebar/sidebar.actions'
import {SidebarComponent} from './sidebar.component'

const mapStateToProps = (state: IState) => (state.sidebar);

export const mapDispatchToProps = {
  updateInput
};

export const SidebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SidebarComponent);
