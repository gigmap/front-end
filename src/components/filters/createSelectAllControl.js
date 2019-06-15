import React from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {Checkbox} from 'antd';
import {change} from 'redux-form';

export const createSelectAllControl = (
  filterName, itemsSelector, qtySelector, selectedItemsSelector
) => {

  function SelectAllSwitch({items, totalQty, selectedQty, change}) {
    const allSelected = totalQty === selectedQty;

    function handleClick() {
      const value = !allSelected;
      items.forEach(it => change(filterName, it.id, value));
    }

    return <div>
      <Checkbox checked={allSelected} onClick={handleClick}
                indeterminate={!allSelected && selectedQty > 0}>
        <b>All artists</b>
      </Checkbox>
    </div>;
  }

  SelectAllSwitch.propTypes = {
    items: PropTypes.array.isRequired,
    totalQty: PropTypes.number.isRequired,
    selectedQty: PropTypes.number.isRequired,
    change: PropTypes.func.isRequired
  };

  const mapStateToProps = (state) => ({
    items: itemsSelector(state),
    totalQty: qtySelector(state),
    selectedQty: selectedItemsSelector(state).size
  });

  const mapDispatchToProps = {change};

  return connect(mapStateToProps, mapDispatchToProps)(SelectAllSwitch);
};