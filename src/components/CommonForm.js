import React from 'react';
import {TextInput} from '../dist/index';

export default class CommonForm extends React.Component {

  render() {
    return  <TextInput
      field='commonAge'
      label='Age'
      type='integer'
      min={0}
      max={150}
    />;
  }
}
