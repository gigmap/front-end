// @flow

import {connect} from 'react-redux';
import {
  toggleFilterDialog,
  toggleItem,
  toggleAll
} from '../../../../store/actions/filters';
import {FilterOptionSelectors} from '../../selectors/specific/filterOptions';

export const connectFilterDialog = (dataKey: string) => (Component) => {

  const mapStateToProps = (state) => ({
    allItems: FilterOptionSelectors[dataKey](state),
    isOpen: state.filters.ui.dialogShown[dataKey]
  });

  const mapDispatchToProps = {toggleFilterDialog, toggleItem, toggleAll};

  return connect(mapStateToProps, mapDispatchToProps)(Component);
};