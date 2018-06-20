import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { ItemListComponent } from './items.component';
import { updateTitle } from '../../actions/item/item.actions';

const mapStateToProps = (state: IState) => (state.item);

export const mapDispatchToProps = {
  updateTitle
};

export const SignInContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemListComponent);