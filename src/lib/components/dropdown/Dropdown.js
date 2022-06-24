import classnames from 'classnames';
import React from 'react';
import { FcOk } from 'react-icons/fc';
import { IoChevronDownCircleOutline } from 'react-icons/io5';
import { copy, empty } from '../../services/Helper';
import { BaseInput } from '../base-input/BaseInput';
import TextInput from '../text-input/TextInput';
import './Dropdown.scss';

/**
 * @param {array} options - {value, id}
 * @param {string} selected - selected value
 */
export default class Dropdown extends BaseInput {

  constructor(props) {
    super(props);

    const mappedOptions = this.mapOptions(this.props.options);
    let val = null;
    if (props.selected != undefined) {
      if (this.props.optionsUrl) {
        val = {id: this.props.selected, value: this.props.selected};
      } else {
        val = mappedOptions?.find(op => op.id == props.selected);
      }
    }
    this.state = {
      showList: false,
      currentValue: val || { value: '' },
      options: mappedOptions || [],
      filteredOptions: mappedOptions || [],
      optionsFetched: false
    };

    // this.handleBlur = debounce(this.handleBlur, this.props.debounce || 50);

  }

  componentDidUpdate(props) {
    const mappedOptions = this.mapOptions(this.props.options);
    let val = null;
    if (this.props.selected != undefined) {
      if (this.props.optionsUrl) {
        val = {id: this.props.selected, value: this.props.selected};
      } else {
        val = mappedOptions?.find(op => op.id == this.props.selected);
      }
    }
    if (JSON.stringify(props.options) != JSON.stringify(this.props.options)) {
      let filteredOptions = copy(mappedOptions);
      this.setState({ options: mappedOptions, filteredOptions, currentValue: val });
    }
    if (props.selected != this.props.selected) {
      this.setState({ currentValue: val });
    }
  }

  mapOptions = options => {
    return options?.map(op => ({ id: op?.id ?? op, value: op?.value ?? op }));
  };

  // todo option to truncate or in next line in case of long text going overflow container div/body
  // todo lazy load or async load from url for options

  handleBlur = () => {
    if (this.state.optionClicked) {
      this.setState({optionClicked: false});
    } else {
      this.setState({ showList: false, touched: true });
    }
    this.validateErrors(true);
  }

  validateErrors = (forceCheck = false, currentValue = null) => {
    let errors = [];

    const fieldName = (this.props.label ?? this.props.name ?? "Field");
    if (this.state.touched || forceCheck) {
      if (this.props.required && (empty(this.state.currentValue?.id) && empty(currentValue?.id))) {
        errors.push(fieldName + " is required");
      }
      this.setState({ errors });
    }
    return errors;
  };

  getValue = () => {
    return [this.props.field, this.state.currentValue?.id];
  }

  getOptions = async (val) => {
    let options = this.state.options;
    options = this.mapOptions(options);
    let filteredOptions = copy(options);
    this.setState({options, filteredOptions, optionsFetched: true, showList: !this.state.showList});

    if (val) {
      this.onSearch(val);
    }
  };

  onSearch = val => {
    let options = this.state.options;
    if (empty(options)) {
      return;
    }

    const filteredOptions = this.state.options.filter(op => op.value.toLowerCase().includes(val.toLowerCase()));
    this.setState({filteredOptions});
  };
  
  onOptionSelect = option => {
    this.setState({ currentValue: option, showList: false, optionClicked: true }); 
    this.validateErrors(true, option);
    this.props.onSelect && this.props.onSelect(option);
  };

  render() {
    return (
      <section className={classnames((this.props.className), 'rfl-dropdown cp relative br-5 my-15', {
        'disabled': this.props.disabled,
      })}
        onBlur={() => this.handleBlur()}
        tabIndex="0"
      >
        <label htmlFor={this.props.id} className={classnames({
          'required-label': this.props.required
        })}>
          {this.props.required && <sup>*</sup>}
          {this.props.title ?? this.props.label}
        </label>
        
        {this.props.searchable && <TextInput
         className='br-5' onFocusInput={val => { this.getOptions(val) }} value={this.state.currentValue?.value} onInputChange={val => this.onSearch(val)} debounce={5} />}

        {!this.props.searchable && <p className={classnames('br-5', {
          "error-border": this.state.errors?.length > 0,
          'active-dropdown': this.state.showList
        })}
          onClick={ev => { this.setState({ showList: !this.state.showList }) }}><span>{this.state.currentValue?.value}</span>
          <span><IoChevronDownCircleOutline /></span>
        </p>}

        {this.state.showList && this.state.options && <div className='relative'>
          <ul className='options shadow-1 br-5 w-100'
          >

            {this.state.filteredOptions?.map((option) =>
              <li key={option.id} className='p-10 rfl-h-between'
                onMouseDown={ev => { ev.stopPropagation(); this.onOptionSelect(option) }}
              >
                {option.value}
                {option.id == this.state.currentValue?.id && <FcOk />}
              </li>)}
          </ul>
        </div>}
        {this.state.errors && this.state.errors.length > 0 &&
          <>
            <div className="error br-5" ref={this.state.errorRef} >
              {this.state.errors[0]}
            </div>
            <div style={{ height: this.state.errorRef?.height }} className='mb-10'></div>
          </>
        }
      </section>
    )
  }
}
