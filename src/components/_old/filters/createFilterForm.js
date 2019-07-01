import React from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {createSelectAllControl} from './createSelectAllControl';
import {Field, reduxForm} from 'redux-form';
import {FilterCheckbox} from './FilterCheckbox';
import {createFilterSearch} from './createFilterSearch';

function renderField(it, i) {
  return <Field key={i} label={it.displayName} name={it.id}
                available={it.available} component={FilterCheckbox}/>;
}

export const createFilterForm = (
  filterName,
  getItems,
  countItems,
  getAvailableItems,
  countSelectedItems,
  getInitialValues,
  getSearchedItems
) => {

  const SelectAllElement = createSelectAllControl(
    filterName, getItems, countItems, countSelectedItems);

  const FilterSearch = createFilterSearch(filterName);

  function FilterElement({allItems, availableItems, searchedItems}) {
    const items = [];

    for (const it of searchedItems) {
      items.push({...it, available: Boolean(availableItems[it.id])});
    }

    return <>
      <SelectAllElement/> <FilterSearch />

      <div>
        {items.map(renderField)}
      </div>
    </>;
  }

  FilterElement.propTypes = {
    allItems: PropTypes.array.isRequired,
    searchedItems: PropTypes.array.isRequired,
    availableItems: PropTypes.object.isRequired
  };

  const mapStateToProps = (state) => ({
    allItems: getItems(state),
    searchedItems: getSearchedItems(state),
    availableItems: getAvailableItems(state),
    initialValues: getInitialValues(state)
  });

  const ReduxFormFilterElement = reduxForm({
    form: filterName,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
  })(FilterElement);

  return connect(mapStateToProps)(ReduxFormFilterElement);
};