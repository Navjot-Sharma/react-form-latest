import React, { Component } from 'react';
import { mapKeysToObject } from '../../services/Helper';
import { random } from 'lodash';


export const FormContext = React.createContext({});

// pass onValue prop to get value by clicking on appsubmitbutton
export default class Form extends Component {
  // static contextType = FormContext;

  inputRefs = {};
  currentRefCount = 0;
  inputs = [];
 
  constructor(props) {
    super(props);

    this.state = {
      formId: props.formId ?? 'rfl-form-' + random(99, 9999999),
    };
  }

  reInit() {
    this.currentRefCount = 0;
    this.inputs = [];
    this.inputRefs = {};
  }

  removeRefFromCustomInputs(child) {
    const idx = this.inputs.findIndex(input => input.ref === child.reactFormCounter && child.reactFormId === this.state.formId);
    if (idx > -1) {
      this.inputs.splice(idx, 1);
      delete this.inputRefs[child.reactFormCounter];
      this.currentRefCount--;
    }
  }

  setRefOnCustomInputs(child) {
    if (child.props.noForm || (child.props.formId && child.props.formId !== this.state.formId)) {
      return;
    }

    if (this.props.formId && !child.props.formId) {
      return;
    }

    this.currentRefCount++;
    let currentRefCount = this.currentRefCount;

    this.inputRefs[`child${currentRefCount}`] = child;
    child.reactFormCounter = `child${currentRefCount}`;
    child.reactFormId = this.state.formId;

    this.inputs.push({
      ref: `child${currentRefCount}`,
    });
  }

  onFormSubmit = () => {
    if (this.validateForm()) {
      this.getValue();
    }
  };

  validateForm = () => {
    let errors = [];
    this.inputs.forEach(input => {
      errors = this.validateInput(input, errors);
    });

    this.props.onValidate && this.props.onValidate(errors.length <= 0);
    return errors.length <= 0;
  }

  validateInput = (input, errors) => {
    return [...errors, ...this.inputRefs[input.ref].validateErrors(true)];
  }

  getValue = () => {
    let values = {};
    this.inputs.forEach(input => {
      let value = this.getValueInput(input);
      values[value[0]] = value[1];
    });
    this.props.onValue && this.props.onValue(mapKeysToObject(values));

    return values;
  }

  getValueInput = (input) => {
    return this.inputRefs[input.ref].getValue();
  }

  render() {
    return <FormContext.Provider value={this}>
      {!this.props.className && this.props.children}
      {!!this.props.className && 
        <div className={this.props.className}>
         {this.props.children}
        </div>
      }
    </FormContext.Provider>;
  }
}
