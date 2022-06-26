import classnames from 'classnames';
import React from 'react';
import { overflowElipsis } from '../../services/Helper';
import { BaseInput } from '../base-input/BaseInput';
import { random } from 'lodash';
import './Toggle.scss';

export default class Toggle extends BaseInput {

  constructor(props) {
    super(props);

    this.state = {
      checked: this.props.checked,
      overflow: this.props.overflow,
      type: props.type ?? 'toggle', // toggle || check
      id: props.id ?? 'rfl-toggle-' + random(99, 9999999),
      errors: []
    };
  }

  // componentDidUpdate(props) {
  //   if (props.checked !== this.props.checked) {
  //     // console.log(props, this.props);
  //     this.setState({checked: this.props.checked});
  //   }
  // }

  handleChange = (e) => {
    if (e.detail === 0) return;

    const newValue = !this.state.checked;
    if (!this.props.stateless) {
      this.setState({checked: newValue});
    }
    this.props.handleChange && this.props.handleChange(!this.props.stateless ? newValue : !this.props.checked);
  };

  validateErrors = (forceCheck = false, checked = this.state.checked) => {
    let errors = [];

    if (this.props.required && !checked) {
      errors.push(this.fieldName + " is required");
    }

    this.setState({errors});

    return errors;
  };

  getValue = () => {
    return [this.props.field, this.state.checked];
  }

  render() {

    return (
      <>
        {!this.props.noForm && <div
        title={this.props.label}
        className={classnames("my-15 cp", this.props.className, {
          'neumorphism-toggle': this.state.type === 'toggle',
          'nfl-check': this.state.type === 'check',
          'disabled': this.props.disabled,
          'nfl-error': this.state.errors.length && !this.state.checked,
          // 'checked': this.state.checked
        })} 
          onClick={(e) => {e.persist(); this.handleChange(e)}} >
          <input 
            type="checkbox" 
            id={this.state.id}
            className={classnames({
              'checked': this.state.checked
            })}
            checked={this.props.checked} 
            disabled={this.props.disabled}
            onChange={() => null} 
          />
          <label htmlFor={this.state.id} className='app-h-center'>
            <div className="switch">
              <div className="dot"></div>
            </div>
            {!this.state.overflow && this.props.label && <span>{this.props.label}</span>}
           {this.state.overflow&& this.props.label && <span>{overflowElipsis(this.props.label, this.state.overflow, 'left')}</span>}
          </label>
        </div>}

        {/* {this.props.noForm && <div
        title={this.props.label}
        className={classnames("neumorphism-toggle my-15", this.props.className)} 
          onClick={(e) => {e.persist(); this.onToggle(e)}} >
          <input type="checkbox" id="neumorphism" checked={this.props.checked} 
            onChange={() => null}
          />
          <label htmlFor="neumorphism" className='app-h-center'>
            <div className="switch">
              <div className="dot"></div>
            </div>
            <span>{overflowElipsis(this.props.label, this.state.overflow, 'left')}</span>
          </label>
        </div>} */}
      </>
    );
  }
}
