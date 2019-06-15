import React from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {createFilterForm} from './FilterForm';
import {createSelectAllControl} from './createSelectAllControl';

export const createFilter = (
  filterName,
  itemsSelector,
  qtySelector,
  availableItemsSelector,
  selectedItemsSelector
) => {

  const FormElement = createFilterForm(filterName);
  const SelectAllElement = createSelectAllControl(
    filterName, itemsSelector, qtySelector, selectedItemsSelector);

  function FilterElement({allItems, availableItems}) {
    const initialValues = {};
    const items = [];

    for (const it of allItems) {
      initialValues[it.id] = true;
      items.push({...it, available: Boolean(availableItems[it.id])});
    }

    return <div>
      <SelectAllElement/>
      <FormElement items={items} initialValues={initialValues}/>
    </div>;
  }

  FilterElement.propTypes = {
    allItems: PropTypes.array.isRequired,
    availableItems: PropTypes.object.isRequired
  };

  const mapStateToProps = (state) => ({
    allItems: itemsSelector(state),
    availableItems: availableItemsSelector(state)
  });

  return connect(mapStateToProps)(FilterElement);
};