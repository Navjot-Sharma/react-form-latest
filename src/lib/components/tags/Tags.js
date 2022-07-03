import React from 'react';
import Chip from '../chips/Chip';
// import { toast } from 'react-toastify';
import TextInput from '../text-input/TextInput';
import { BaseInput } from '../base-input/BaseInput';
import { copy } from '../../services/Helper';


/**
 * @param {Array} chips
 * @param {String} chips.value
 * @param {String} chips.label ?? chips.value
 * @param {Array | String} value
 * 
 */
export default class Tags extends BaseInput {

  constructor(props) {
    super(props);

    this.state = {
      chips: this.selectChipsOnStart(),
      tagInput: React.createRef(),
      returnField: this.props.returnField ?? 'value',
      errors: []
    };
  }

  componentDidUpdate(props) {
    if (props.chips !== this.props.chips) {
      const chips = this.selectChipsOnStart();
      console.log('updating chips: ', JSON.stringify(chips));
      this.setState({ chips });
    }
  }

  selectChipsOnStart = () => {
    let chips = copy(this.props.chips) ?? [];
    console.log('onselectchips on start: ', JSON.stringify(chips));
    chips = chips.map(chip => {

      if (typeof (chip) == 'string') {
        chip = { value: chip };
      }

      if (!chip.value) {
        chip.value = chip.name;
      }

      if (!chip.label) {
        if (chip.name) {
          chip.label = chip.name;
        } else {
          chip.label = chip.value;
        }
      }

      if (this.props.value?.includes(chip.value)) {
        chip.selected = true;
      }

      return chip;

    });
    console.log('onselectchips on end: ', JSON.stringify(chips));

    return chips;
  }

  handleAddTag = () => {
    const chips = copy(this.state.chips);

    let value = this.state.tagInput.current.getValue()[1];

    if (value) {

      if (chips?.find(chip => chip.value === value)) {
        return;
        // return toast({
        //   title: 'Tag already exists',
        //   type: 'danger'
        // });
      }


      chips.push({
        value,
        label: value
      });
      // tagInput.setState({value: ''});

      this.setState({ chips });
      this.state.tagInput.current.clearValue();
    }

  }

  onClickChip = (chip) => {
    let chips = copy(this.state.chips);
    chips = chips.filter(c => c.value !== chip.value);

    this.setState({ chips });
  }

  validateErrors = (forceCheck = false) => {
    let errors = [];

    const selectedChips = this.state.chips.filter(chip => chip.selected).length;

    if (selectedChips < this.props.min) {
      errors.push(`Please select at least ${this.props.min} ${this.props.label}`);
    } else if (selectedChips > this.props.max) {
      errors.push(`Maximum ${this.props.max} ${this.props.label} allowed`);
    }

    this.setState({ errors });

    return errors;
  };

  getValue = () => {
    const chips = this.state.chips.map(chip => chip.value);

    return [this.props.field, chips];
  }

  render() {
    return (
      <div>
        <TextInput ref={this.state.tagInput} noForm className='w-100 mr-10'
          onClickAdd={() => this.handleAddTag()}
        />
        <div>
          {this.state.chips?.map((chip, i) => (
            <Chip
              key={i}
              closable
              className="mr-10 py-10 px-15 my-5"
              onClose={() => this.onClickChip(chip)}
            >
              {chip.label}
            </Chip>
          ))}
        </div>
      </div>
    );
  }
}
