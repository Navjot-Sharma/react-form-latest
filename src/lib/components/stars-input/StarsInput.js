import classnames from 'classnames';
import React from 'react';
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';
import { BaseInput } from '../base-input/BaseInput';


export default class StarsInput extends BaseInput {

  constructor(props) {
    super(props);

    this.state = {
      totalStars: this.props.totalStars ?? 5,
      selectedStars: this.props.stars ?? 0,
      errors: []
    };
  }

  getValue = () => {
    return [this.props.field, this.state.selectedStars];
  };

  validateErrors = (forceCheck = false, selectedStars = null) => {
    let errors = [];

    selectedStars = selectedStars ?? this.state.selectedStars;

    const fieldName = (this.props.name ?? this.props.label ?? "Field");

    if (this.state.touched || forceCheck) {
      if (this.props.required && !selectedStars) {
        errors.push(fieldName + ' is required');
      }
      //  else if (this.props.min && selectedStars < this.props.min) {
      //   errors.push(fieldName + ` must be at least ${this.props.min}`);
      // } else if (this.props.max && selectedStars > this.props.max) {
      //   errors.push(fieldName + ` must not exceed ${this.props.max}`);
      // }
      this.setState({ errors });
    }
    return errors;
  };


  onClickStar = (index) => {
    this.setState({ selectedStars: index, touched: true });
    this.validateErrors(true, index);
  };

  render() {
    return (
      <div className={classnames(this.props.className, 'relative')}>
        {Array(this.state.selectedStars).fill().map((star, index) => <IoIosStar
          size={25}
          onClick={() => this.onClickStar(index + 1)}
          className='cp' style={{ marginRight: '3px' }} key={index} />)}

        {Array(this.state.totalStars - this.state.selectedStars).fill().map((star, index) => <IoIosStarOutline
          size={25}
          onClick={() => this.onClickStar(this.state.selectedStars + index + 1)}
          className={classnames('cp', {
            'error-color': this.state.errors && this.state.errors.length
          })} style={{ marginRight: '3px' }} key={index} />)}
      </div>
    );
  }
}
