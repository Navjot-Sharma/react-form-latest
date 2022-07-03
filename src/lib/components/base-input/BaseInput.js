import React, { Component } from 'react';
import { FormContext } from '../form/Form';


/**
 * Must override two functions 
 * validateErrors & getValue
 */
export class BaseInput extends Component {
  static contextType = FormContext;

  fieldName = '';

  constructor(props) {
    super(props);
    this.fieldName = (this.props.name ?? this.props.label?? "Field");

    this.inputComponentDidMount = this.componentDidMount;
    this.inputComponentWillUnmount = this.componentWillUnmount;

    this.componentDidMount = () => {
      this.context.setRefOnCustomInputs && this.context.setRefOnCustomInputs(this);
      this.inputComponentDidMount && this.inputComponentDidMount();
    };
    this.componentWillUnmount = () => {
      this.context.removeRefFromCustomInputs && this.context.removeRefFromCustomInputs(this);
      this.inputComponentWillUnmount && this.inputComponentWillUnmount();
    };
  }

  validateErrors(forceCheck = false, touched = false) {
    let errors = [];

    return errors;
  };

  getValue() {
    return [this.props.field, this.state.value];
  }

}


