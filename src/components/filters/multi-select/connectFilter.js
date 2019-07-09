// @flow

import {connect} from 'react-redux';
import {toggleItem} from '../../../store/actions/filters';
import {DataIdSelectors} from '../../../store/selectors/data';
import {TagListSelectors} from '../selectors/specific/tagList';
import {FilterOptionSelectors} from '../selectors/specific/filterOptions';

export const connectFilter = (dataKey: string) => (Component) => {

  const mapStateToProps = (state) => ({
    allItems:  FilterOptionSelectors[dataKey](state),
    itemsIdMap: DataIdSelectors[dataKey](state),
    selectedItems: TagListSelectors[dataKey](state)
  });

  const mapDispatchToProps = {toggleItem};

  return connect(mapStateToProps, mapDispatchToProps)(Component);
};