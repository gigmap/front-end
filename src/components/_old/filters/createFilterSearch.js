import React from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {Input} from 'antd';
import {searchFilters} from '../../../store/actions/filters';

// TODO: add throttling

const {Search} = Input;

export const createFilterSearch = (filterName) => {

  function FilterSearch({searchFilters}) {
    const search = (event) => searchFilters(filterName, event.target.value);

    return (
      <Search
        allowClear
        placeholder="search"
        onChange={search}
        style={{width: 200}}
      />
    );
  }

  FilterSearch.propTypes = {
    searchFilters: PropTypes.func.isRequired
  };

  const mapDispatchToProps = {searchFilters};

  return connect(null, mapDispatchToProps)(FilterSearch);
};