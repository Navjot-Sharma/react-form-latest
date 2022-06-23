import React, { Component } from 'react';


/**
 * Must override two functions 
 * validateErrors & getValue
 */
export class BaseInput extends Component {
  static ReactFormLatestInput = 'ReactFormLatestInput';

  validateErrors = (forceCheck = false, touched = false) => {
    let errors = [];

    return errors;
  };

  getValue = () => {
    return [this.props.field, this.state.value];
  }

}


