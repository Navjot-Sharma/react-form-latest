import React from 'react';
import classnames from 'classnames';
import { IoIosCloseCircleOutline } from 'react-icons/io';

export function Chip(props) {

  return (
    <div
      onClick={() => (props.onClick && props.onClick())}
      className={classnames("chip shadow-1 shadow-1-hover-h", props.className, {
        'active': props.active,
        'error-border': props.error,
        'error-color': props.error,
      })}
    >
      <p className={classnames(props?.pClass, 'd-inline-block')} title={props?.title}>
        {props ? props.children : ''}
      </p>
      {props && props.onClose ? <IoIosCloseCircleOutline className='chip-close' onClick={() => props.onClose()} /> : ''}
    </div>
  );
}

export default Chip;