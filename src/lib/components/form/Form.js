import React, { Component } from 'react';
import { mapKeysToObject } from '../../services/Helper';


// pass onValue prop to get value by clicking on appsubmitbutton
export default class Form extends Component {

  inputRefs = {};
  currentRefCount = 0;
  inputs = [];
 
  constructor(props) {
    super(props);

    this.state = {};
  }

  reInit() {
    this.currentRefCount = 0;
    this.inputs = [];
    this.inputRefs = {};
  }

  recursiveCloneChildren(children, isFirst) {
    if (isFirst) {
      // recursiveCloneChildren runs twice in development due to strict mode enabled
      this.reInit();
    }

    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child) ) return child;

      let newChild = child;

      // handles functional components
      if (typeof child.type === "function" && !child?.type?.ReactFormLatestInput && child?.type?.renderDefault) {
        newChild = new child.type(child.props);
        newChild = newChild.render();
      }
  
      if (!React.isValidElement(newChild)) return child;

      child = newChild;

      let childProps = {};

      if (
        React.isValidElement(child) && child.type 
        && child.type.ReactFormLatestInput === 'ReactFormLatestInput'
        && !child.props.noForm && (!child.props.formId || child.props.formId === this.props.formId)
      ) {
          childProps = this.setRefOnCustomInputs(child);
      }

      if (child.type.ReactFormLatestInput === 'SubmitButton') {
        childProps.formClicked = () => this.onFormSubmit();
      }
      
      childProps.children = this.recursiveCloneChildren(child.props.children);

      let el;
      if (childProps.children) {
        el = React.cloneElement(child, childProps, childProps.children);
      } else {
        el = React.cloneElement(child, childProps);
      }
     
      return el;
    });
  }

  setRefOnCustomInputs(child) {
    this.currentRefCount++;
    let currentRefCount = this.currentRefCount;

    let childProps = {
      ref: r =>  {
        this.inputRefs[`child${currentRefCount}`] = r;
      },
      disabled: this.props.disabled || child.props.disabled
    };

    this.inputs.push({
      ref: `child${currentRefCount}`,
    });

    return childProps;
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
    return <>
      {!this.props.className && this.recursiveCloneChildren(this.props.children, true)}
      {!!this.props.className && 
        <div className={this.props.className}>
         {this.recursiveCloneChildren(this.props.children, true)}
        </div>
      }
    </>;
  }
}
