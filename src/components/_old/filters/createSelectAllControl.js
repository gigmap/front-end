import React from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {Checkbox} from 'antd';
import {change} from 'redux-form';

export const createSelectAllControl = (
  filterName, getAllItems, countAllItems, countSelectedItems
) => {

  function SelectAllSwitch({items, totalQty, selectedQty, change}) {
    const allSelected = totalQty === selectedQty;

    function handleClick() {
      const value = !allSelected;
      items.forEach(it => change(filterName, it.id, value));
    }

    return <Checkbox checked={allSelected} onClick={handleClick}
                     indeterminate={!allSelected && selectedQty > 0}>
      <b>Select all</b>
    </Checkbox>;
  }

  SelectAllSwitch.propTypes = {
    items: PropTypes.array.isRequired,
    totalQty: PropTypes.number.isRequired,
    selectedQty: PropTypes.number.isRequired,
    change: PropTypes.func.isRequired
  };

  const mapStateToProps = (state) => ({
    items: getAllItems(state),
    totalQty: countAllItems(state),
    selectedQty: countSelectedItems(state)
  });

  const mapDispatchToProps = {change};

  return connect(mapStateToProps, mapDispatchToProps)(SelectAllSwitch);
};