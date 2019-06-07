import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {ReduxAntCheckbox} from './ReduxAntCheckbox';

import './Filter.scss';

class FilterForm extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired
  };

  render() {
    return <div>
      {
        this.props.items.map((it, i) => {
          return <Field key={i} label={it.displayName} name={it.id}
                        component={ReduxAntCheckbox}/>;
        })
      }
    </div>;
  }
}

export const createFilterForm = name => reduxForm({
  // a unique name for the form
  form: name
})(FilterForm);