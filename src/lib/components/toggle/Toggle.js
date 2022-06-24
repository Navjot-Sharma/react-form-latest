import classnames from 'classnames';
import { throttle } from 'lodash';
import React from 'react';
import { overflowElipsis } from '../../services/Helper';
import { BaseInput } from '../base-input/BaseInput';
import { random } from 'lodash';
import './Toggle.scss';

export class Toggle extends BaseInput {

  constructor(props) {
    super(props);

    this.state = {
      checked: this.props.checked,
      overflow: this.props.overflow,
      type: props.type ?? 'toggle', // toggle || check
      id: props.id ?? 'rfl-toggle-' + random(99, 9999999),
    };

    this.onToggle = throttle((e) => {this.handleChange(e)}, this.props.debounce ?? 10);
    // if (this.props.debounce) {
    // }
  }

  componentDidUpdate(props) {
    if (props.checked !== this.props.checked) {
      // console.log(props, this.props);
      this.setState({checked: this.props.checked});
    }
  }

  handleChange = (e) => {
    if (e.detail === 0) return;

    const newValue = !this.state.checked;
    if (!this.props.stateless) {
      this.setState({checked: newValue});
    }
    this.props.handleChange && this.props.handleChange(!this.props.stateless ? newValue : !this.props.checked);
  };

  validateErrors = (forceCheck = false, selected = this.state.selected) => {
    let errors = [];

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
        })} 
          onClick={(e) => {e.persist(); this.onToggle(e)}} >
          <input type="checkbox" id={this.state.id} checked={this.state.checked} onChange={() => null} />
          <label htmlFor={this.state.id} className='app-h-center'>
            <div className="switch">
              <div className="dot"></div>
            </div>
            {!this.state.overflow && <span>{this.props.label}</span>}
           {this.state.overflow && <span>{overflowElipsis(this.props.label, this.state.overflow, 'left')}</span>}
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
