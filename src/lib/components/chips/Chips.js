import React from 'react';
import classnames from 'classnames';
import Chip from './Chip';
import { BaseInput } from '../base-input/BaseInput';
import { copy } from '../../services/Helper';


/**
 * @param {Array} chips
 * @param {String} chips.value
 * @param {String} chips.label ?? chips.value
 * @param {Array | String} value
 * 
 */
export default class Chips extends BaseInput {

  constructor(props) {
    super(props);

    let multi = props.multi ?? (this.props.max && this.props.max > 1);

    this.state = {
      chips: this.selectChipsOnStart(multi),
      returnField: this.props.returnField ?? 'value',
      errors: [],
      multi
    };
  }

  componentDidUpdate(props) {
    if (props.chips !== this.props.chips || props.value !== this.props.value) {
      const chips = this.selectChipsOnStart();
      this.setState({chips});
    }
  }

  selectChipsOnStart = (multi = this.state?.multi) => {
    let chips = copy(this.props.chips) ?? [];
    chips = chips.map(chip => {

      if (typeof(chip) == 'string') {
        chip = {value: chip};
      }

      if (!chip.label) {
        if (chip.name) {
          chip.label = chip.name;
        } else {
          chip.label = chip.value;
        }
      }

      if (multi) {
        if (this.props.value?.includes(chip.value)) {
          chip.selected = true;
        }
      } else if (this.props.value === chip.value) {
        chip.selected = true;
      }

      return chip;

    });

    return chips;
  }
  
  onClickChip = (chip) => {
    const chips = copy(this.state.chips);
    chips.forEach(c => {
      if (c.value === chip.value) {
        c.selected = !c.selected;
      } else if (!this.state.multi) {
        c.selected = false;
      }
    });

    this.setState({chips});
  }

  validateErrors = (forceCheck = false) => {
    let errors = [];

    const selectedChips = this.state.chips.filter(chip => chip.selected).length;

    if (this.props.required && !selectedChips) {
      errors.push(`Please select at least1 ${this.props.label}`)
    } else if (selectedChips < this.props.min) {
      errors.push(`Please select at least ${this.props.min} ${this.props.label}`);
    } else if (selectedChips > this.props.max) {
      errors.push(`Maximum ${this.props.max} ${this.props.label} allowed`);
    }

    this.setState({ errors });

    return errors;
  };

  getValue = () => {
    const chips = this.state.chips.filter(c => c.selected).map(chip => (this.state.returnField && chip[this.state.returnField]) ?? chip);

    if (!this.state.multi) {
      return [this.props.field, chips[0]];
    }

    return [this.props.field, chips];
  }

  render() {
    return (
      <div className={this.props.className}>
        {this.state.chips.map( (chip, i) => <Chip
          onClick={() => this.onClickChip(chip)}
          error={this.state.errors.length}
          key={chip.value + i}
          className="mr-10 py-10 px-15 my-5"
          active={chip.selected}>
          {chip.label}
        </Chip>)}
      </div>
    );
  }
}
