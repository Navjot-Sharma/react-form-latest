import React from 'react';
import { BaseInput } from '../base-input/BaseInput';
import { random } from 'lodash';

import './Radio.scss';

export default class Radio extends BaseInput {

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
      id: props.id ?? 'rfl-radio-' + random(99, 9999999),
    };
  }

  handleChange = () => {
    this.setState({value: !this.state.value});

    this.props.onChange && this.props.onChange();
  };

  validateErrors = (forceCheck = false, touched = false) => {
    let errors = [];

    return errors;
  };

  getValue = () => {
    return [this.props.field, this.state.value];
  }

  render() {
    return (
      <div className="form__radio-group">
        <input 
          type="radio" 
          className="form__radio-input" 
          id={this.state.id}
          name={this.props.name} 
          checked={this.state.value}
          onChange={e => this.handleChange()}
        />
        <label htmlFor={this.state.id} className="form__radio-label">
          <span className="form__radio-btn"></span>
          <span>{this.props.label ?? this.props.name}</span>
        </label>
      </div>
    )
  };
}

