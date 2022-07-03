import classNames from "classnames";
import React from "react";
import { VscLoading } from "react-icons/vsc";
import { BaseInput } from "../base-input/BaseInput";


export default class SubmitButton extends BaseInput {

  constructor(props) {
    super(props); 

    this.state = {
    };
  }


  handleClick = () => {
    // if (this.props.formClicked) {
    //   this.props.formClicked();
    // }

    this.context.onFormSubmit && this.context.onFormSubmit();
    this.props.onClick && this.props.onClick();
  };


  render() {
    return <button disabled={this.props.disabled || this.props.loading} className={classNames('react-latest-button', this.props.className)} onClick={() => this.handleClick()}>{this.props.children} {this.props.loading && <VscLoading className='rotate ml-5' />}</button>
  }
}
