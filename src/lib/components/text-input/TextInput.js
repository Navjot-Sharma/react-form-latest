import classNames from "classnames";
import { debounce } from 'lodash';
import React from "react";
import { VscChevronRight, VscClose, VscEye, VscEyeClosed, VscLoading } from "react-icons/vsc";
import { copy, empty } from "../../services/Helper";
import "./TextInput.scss";
import { BaseInput } from "../base-input/BaseInput";


/**
 * listen to onInputChange 
**/
class TextInput extends BaseInput {

  constructor(props) {
    super(props);

    this.state = {
      input: React.createRef(),
      value: props.value,
      touched: false,
      dirty: false,
      errors: [],
      valid: false,
      label: props.label,
      fetching: false,
      type: props.type || "text",
      errorRef: React.createRef(),
      reInitCount: this.props.reInitCount ?? 0,
      uniqueError: false
    };

    this.onInputChange = debounce(this.onInputChange, this.props.debounce || 1000);
  }

  componentDidUpdate(props) {
    if (this.props.reInitCount && (this.props.reInitCount !== props.reInitCount)) {
      this.onGetValue();
    }
    

    if (this.props.value !== props.value || (this.props.initCount && (this.props.initCount !== props.initCount))) {
      this.setState({
        value: this.props.value,
        touched: false,
        dirty: false,
        errors: [],
        valid: false,
        type: this.props.type || "text",
        reInitCount: this.props.reInitCount
      });
      this.state.input.value = this.props.value;
    }

    if (this.props.errors && JSON.stringify(this.state.errors) !== JSON.stringify(this.props.errors)) {
      this.setState({errors: this.props.errors});
    }
  }

  onGetValue = () => {
    const errors = this.validateErrors(true);
    if (this.props.onGetValue && !errors.length) {
      this.props.onGetValue(this.state.input.value);
    }
  };

  setInputRef = (ref) => {
    this.setState({ input: ref });
    if (ref && this.props.focus && !this.state.touched) {
      ref.focus();
    }
    if (ref && (this.state.value != undefined && this.state.value != null)) {
      ref.value = this.state.value;
    }
  };

  validateErrors = (forceCheck = false) => {
    let errors = [];
    const fieldName = (this.props.name ?? this.props.label?? "Field");

    const value = this.state.input?.value ?? this.state.editor?.value;

    if (this.state.touched || forceCheck) {
      if (this.props.required && !value) {
        errors.push(fieldName + " is required");
      } else if (
        this.props.type == "password" &&
        value?.length < 8
      ) {
        errors.push(
          fieldName + ` must have at least 8 characters`
        );
      } else if (
        this.props.minLength && !empty(value) &&
        value?.length < this.props.minLength
      ) {
        errors.push(
          fieldName +
            ` must have at least ${this.props.minLength} characters`
        );
      } else if (
        this.props.maxLength &&
        value?.length > this.props.maxLength
      ) {
        errors.push(
          fieldName +
            ` must not exceed ${this.props.maxLength} characters`
        );
      } else if (this.props.min != null && !empty(value) && (+value < this.props.min)) {
        errors.push(
          fieldName +
            ` must not be less than ${this.props.min}`
        );
      } else if (this.props.max && !empty(value) && (+value > this.props.max)) {
        errors.push(
          fieldName + ` must be less than ${this.props.max}`
        );
      } else if (this.props.number && isNaN(value)) {
        errors.push(
          fieldName + ` must be a numeric`
        );
      } else if (this.props.integer && (isNaN(value) || (value + '').includes('.'))) {
        if (isNaN(value)) {
          errors.push(
            fieldName + ` must be numeric`
          );
        } else {
          errors.push(
            fieldName + ` must not contains fractional values`
          );
        }
      } else if (this.props.noSpace && value.split(' ').length > 1) {
        errors.push(fieldName + ` must not contain spaces.`);
      } else if (this.state.uniqueError) {
        errors.push(fieldName + " is already taken");
      }
      this.setState({ errors });
    }
    return errors;
  };

  onFocusInput = () => {
    this.setState({ touched: true });
    if (this.props.onFocusInput) {
      this.props.onFocusInput(this.state.input?.value);
    }
  };

  onBlurInput = async () => {
    let errors = this.validateErrors(true);
    if (this.props.onBlurInput) {
      this.props.onBlurInput();
    }

    return errors;

  };

  onPressEnter = (e) => {
    if (this.props.enableEnter && e.key === 'Enter') {
      this.onBlurInput();

      this.props.onEnter && !this.state.errors?.length && this.props.onEnter(this.state.input.value);
    }
  }

  getValue = () => {
    return [this.props.field, this.state.input.value];
  };
  
  clearValue = () => {
    this.state.input.value = '';
  };

  onTogglePassword = (hide = false) => {
    if (hide) {
      this.setState({ type: "password" });
    } else {
      this.setState({ type: "text" });
    }
    // this.state.input.focus();
  };

  onInputChange = () => {
    this.setState({value: this.state.input.value});
    if(this.props.onInputChange) {
      let errors = this.validateErrors();
      if (!errors || !errors.length) {
        this.props.onInputChange(this.state.input.value);
      }
    }
  }

  getElement = () => {
    if (this.state.type == "textarea") {
      return (
        <div className='text-container'>
          <label htmlFor={this.props.id} className="input-label">
          {this.props.required && <sup className="app-primary">*</sup>}
          {this.props.label}
        </label>
        <textarea
          className={classNames(this.props.inputClass, {
            "error-border": this.state.errors.length > 0,
          })}
          placeholder={this.props.placeholder}
          ref={this.setInputRef}
          onFocus={() => this.onFocusInput()}
          onBlur={() => this.onBlurInput()}
          name={this.props.name}
          id={this.props.id}
          style={this.props.style}
        ></textarea>
        </div>
      );
    }

    return (
      <div className={classNames("input-container", {
        "disabled": this.props.disabled
      })}>
        {this.props.label && <label htmlFor={this.props.id} className={classNames({
          'required-label': this.props.required
        })}>
          {this.props.required && <sup className="app-primary">*</sup>}
          {this.props.label}
        </label>}
        <input
          className={classNames(this.props.inputClass, {
            "error-border": this.state.errors.length > 0,
            "disabled": this.props.disabled,
            'fixed-height': !this.props.autoHeight
          })}
          placeholder={this.props.placeholder}
          ref={this.setInputRef}
          type={this.state.type}
          onFocus={() => this.onFocusInput()}
          onBlur={() => this.onBlurInput()}
          onChange={() => this.onInputChange()}
          onKeyDown={(e) => this.onPressEnter(e)}
          name={this.props.name}
          id={this.props.id}
          disabled={this.props.disabled}
          style={{paddingLeft: this.props.chips ? Math.min(3, this.props.chips) * 145 : ''}}
        />
        {this.state.fetching && <div className='input-search'><VscLoading className='rotate' /></div>}
        {this.props.applyIcon && <div className='input-search apply-icon' onClick={() => this.props.onApply && this.props.onApply()}><VscChevronRight /></div>}
        {this.props.closeIcon && <div className='input-search cross-icon' onClick={() => this.props.onClose && this.props.onClose()}><VscClose /></div>}
      </div>
    );
  };

  render() {
    return (
      <div className={this.props.className}>
        
        <div className="relative">
          {this.getElement()}
          {this.props.type === "password" && this.state.type === "text" && (
            <VscEye
              className="input-eye"
              onClick={() => this.onTogglePassword(true)}
            />
          )}
          {this.props.type === "password" && this.state.type === "password" && (
            <VscEyeClosed
              className="input-eye"
              onClick={() => this.onTogglePassword()}
            />
          )}
          {this.state.errors && this.state.errors.length > 0 &&
            <>
              <div className="error br-5" ref={this.state.errorRef} >
                {this.state.errors[0]}
              </div>
              <div style={{height: this.state.errorRef?.height}} className='mb-10'></div>
            </>
          }
        </div>
      </div>
    );
  }
}

export default TextInput;
