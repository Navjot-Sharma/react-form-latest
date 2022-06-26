import React, { Component } from 'react';


/**
 * Must override two functions 
 * validateErrors & getValue
 */
export class BaseInput extends Component {
  static ReactFormLatestInput = 'ReactFormLatestInput';

  fieldName = '';

  constructor(props) {
    super(props);

    this.fieldName = (this.props.name ?? this.props.label?? "Field");
  }

  validateErrors = (forceCheck = false, touched = false) => {
    let errors = [];

    return errors;
  };

  getValue = () => {
    return [this.props.field, this.state.value];
  }

}


