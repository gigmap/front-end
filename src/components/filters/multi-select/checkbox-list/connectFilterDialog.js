// @flow

import {connect} from 'react-redux';
import {DataSelectors} from '../../../../store/selectors/data';
import {FilterStateSelectors} from '../../selectors/selection';
import {FilterAvailabilitySelectors} from '../../selectors/availability';
import {
  toggleFilterDialog,
  toggleItem
} from '../../../../store/actions/filters';

export const connectFilterDialog = (dataKey: string) => (Component) => {

  const mapStateToProps = (state) => ({
    allItems: DataSelectors[dataKey](state),
    filterState: FilterStateSelectors[dataKey](state),
    availableItems: FilterAvailabilitySelectors[dataKey](state),
    isOpen: state.filters.ui.dialogShown[dataKey] // TODO: selector ?
  });

  const mapDispatchToProps = {toggleFilterDialog, toggleItem};

  return connect(mapStateToProps, mapDispatchToProps)(Component);
};