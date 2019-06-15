import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {FilterCheckbox} from './FilterCheckbox';

class FilterForm extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired
  };

  render() {
    return <div>
      {
        this.props.items.map((it, i) => {
          return <Field key={i} label={it.displayName} name={it.id}
                        available={it.available} component={FilterCheckbox}/>;
        })
      }
    </div>;
  }
}

export const createFilterForm = name => reduxForm({
  // a unique name for the form
  form: name,
})(FilterForm);