import React from 'react';
import { BaseInput } from '../base-input/BaseInput';
import { random } from 'lodash';

import './Radio.scss';
import classNames from 'classnames';

export default class Radio extends BaseInput {

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
      name: props.id ?? 'rfl-radio-' + random(99, 9999999),
      errors: []
    };
  }

  handleChange = (btn) => {
    this.setState({value: btn.id});

    this.props.onChange && this.props.onChange();
  };

  validateErrors = (forceCheck = false, value = this.state.value) => {
    let errors = [];

    if (this.props.required && !value) {
      errors.push(this.fieldName + " is required");
    }

    this.setState({errors});

    return errors;
  };

  getValue = () => {
    return [this.props.field, this.props.id ?? this.state.value];
  }

  render() {
    return (
      <>
        {this.props.buttons.map(btn => <div key={btn.id} className={classNames("form__radio-group", this.props.className)}>
          <input 
            type="radio" 
            className="form__radio-input" 
            id={btn.id}
            name={this.state.name} 
            checked={this.state.value === btn.id}
            onChange={e => this.handleChange(btn)}
          />
          <label htmlFor={btn.id} className="form__radio-label">
            <span className={classNames("form__radio-btn", {
              'nfl-error': this.state.errors.length && !this.state.value
            })}></span>
            <span>{btn.label ?? this.props.name}</span>
          </label>
        </div>)}
      </>
    )
  };
}

