// @flow

import {connect} from 'react-redux';
import {toggleAll, toggleItem} from '../../../store/actions/filters';
import {
  ChosenFilterItemsSelectors,
  FilterStateSelectors
} from '../selectors/selection';
import {DataIdSelectors, DataSelectors} from '../../../store/selectors/data';
import {FilterAvailabilitySelectors} from '../selectors/availability';

export const connectFilter = (dataKey: string) => (Component) => {

  const mapStateToProps = (state) => ({
    allItems: DataSelectors[dataKey](state),
    itemsIdMap: DataIdSelectors[dataKey](state),
    selectedItems: ChosenFilterItemsSelectors[dataKey](state),
    availableItems: FilterAvailabilitySelectors[dataKey](state),
    filterState: FilterStateSelectors[dataKey](state)
  });

  const mapDispatchToProps = {
    toggleItem, toggleAll
  };

  return connect(mapStateToProps, mapDispatchToProps)(Component);
};