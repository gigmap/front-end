import React from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {createSelectAllControl} from './createSelectAllControl';
import {Field, reduxForm} from 'redux-form';
import {FilterCheckbox} from './FilterCheckbox';

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
  getInitialValues
) => {

  const SelectAllElement = createSelectAllControl(
    filterName, getItems, countItems, countSelectedItems);

  function FilterElement({allItems, availableItems}) {
    const items = [];

    for (const it of allItems) {
      items.push({...it, available: Boolean(availableItems[it.id])});
    }

    return <>
      <SelectAllElement/>
      <div>
        {items.map(renderField)}
      </div>
    </>;
  }

  FilterElement.propTypes = {
    allItems: PropTypes.array.isRequired,
    availableItems: PropTypes.object.isRequired
  };

  const mapStateToProps = (state) => ({
    allItems: getItems(state),
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