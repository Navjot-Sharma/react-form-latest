"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _fc = require("react-icons/fc");

var _io = require("react-icons/io5");

var _Helper = require("../../services/Helper");

var _BaseInput = require("../base-input/BaseInput");

var _TextInput = _interopRequireDefault(require("../text-input/TextInput"));

require("./Dropdown.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @param {array} options - {value, id}
 * @param {string} selected - selected value
 */
class Dropdown extends _BaseInput.BaseInput {
  constructor(props) {
    var _this;

    super(props);
    _this = this;

    _defineProperty(this, "mapOptions", options => {
      return options === null || options === void 0 ? void 0 : options.map(op => {
        var _op$id, _op$value;

        return {
          id: (_op$id = op === null || op === void 0 ? void 0 : op.id) !== null && _op$id !== void 0 ? _op$id : op,
          value: (_op$value = op === null || op === void 0 ? void 0 : op.value) !== null && _op$value !== void 0 ? _op$value : op
        };
      });
    });

    _defineProperty(this, "handleBlur", () => {
      if (this.state.optionClicked) {
        this.setState({
          optionClicked: false
        });
      } else {
        this.setState({
          showList: false,
          touched: true
        });
        console.log('handling blur');
      }

      this.validateErrors(true);
    });

    _defineProperty(this, "validateErrors", function () {
      var _ref, _this$props$label;

      let forceCheck = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      let currentValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      let errors = [];
      const fieldName = (_ref = (_this$props$label = _this.props.label) !== null && _this$props$label !== void 0 ? _this$props$label : _this.props.name) !== null && _ref !== void 0 ? _ref : "Field";

      if (_this.state.touched || forceCheck) {
        var _this$state$currentVa;

        if (_this.props.required && (0, _Helper.empty)((_this$state$currentVa = _this.state.currentValue) === null || _this$state$currentVa === void 0 ? void 0 : _this$state$currentVa.id) && (0, _Helper.empty)(currentValue === null || currentValue === void 0 ? void 0 : currentValue.id)) {
          errors.push(fieldName + " is required");
        }

        _this.setState({
          errors
        });
      }

      return errors;
    });

    _defineProperty(this, "getValue", () => {
      var _this$state$currentVa2;

      return [this.props.field, (_this$state$currentVa2 = this.state.currentValue) === null || _this$state$currentVa2 === void 0 ? void 0 : _this$state$currentVa2.id];
    });

    _defineProperty(this, "getOptions", async val => {
      let options = this.state.options;
      options = this.mapOptions(options);
      let filteredOptions = (0, _Helper.copy)(options);
      this.setState({
        options,
        filteredOptions,
        optionsFetched: true,
        showList: !this.state.showList
      });

      if (val) {
        this.onSearch(val);
      }
    });

    _defineProperty(this, "onSearch", val => {
      let options = this.state.options;

      if ((0, _Helper.empty)(options)) {
        return;
      }

      const filteredOptions = this.state.options.filter(op => op.value.toLowerCase().includes(val.toLowerCase()));
      this.setState({
        filteredOptions
      });
    });

    _defineProperty(this, "onOptionSelect", option => {
      this.setState({
        currentValue: option,
        showList: false,
        optionClicked: true
      });
      this.validateErrors(true, option);
      this.props.onSelect && this.props.onSelect(option);
    });

    const mappedOptions = this.mapOptions(this.props.options);
    let _val = null;

    if (props.selected != undefined) {
      if (this.props.optionsUrl) {
        _val = {
          id: this.props.selected,
          value: this.props.selected
        };
      } else {
        _val = mappedOptions === null || mappedOptions === void 0 ? void 0 : mappedOptions.find(op => op.id == props.selected);
      }
    }

    this.state = {
      showList: false,
      currentValue: _val || {
        value: ''
      },
      options: mappedOptions || [],
      filteredOptions: mappedOptions || [],
      optionsFetched: false
    }; // this.handleBlur = debounce(this.handleBlur, this.props.debounce || 50);
  }

  componentDidUpdate(props) {
    const mappedOptions = this.mapOptions(this.props.options);
    let val = null;

    if (this.props.selected != undefined) {
      if (this.props.optionsUrl) {
        val = {
          id: this.props.selected,
          value: this.props.selected
        };
      } else {
        val = mappedOptions === null || mappedOptions === void 0 ? void 0 : mappedOptions.find(op => op.id == this.props.selected);
      }
    }

    if (JSON.stringify(props.options) != JSON.stringify(this.props.options)) {
      let filteredOptions = (0, _Helper.copy)(mappedOptions);
      this.setState({
        options: mappedOptions,
        filteredOptions,
        currentValue: val
      });
    }

    if (props.selected != this.props.selected) {
      this.setState({
        currentValue: val
      });
    }
  }

  render() {
    var _this$props$title, _this$state$currentVa3, _this$state$errors, _this$state$currentVa4, _this$state$filteredO, _this$state$errorRef;

    return /*#__PURE__*/_react.default.createElement("section", {
      className: (0, _classnames.default)(this.props.className, 'rfl-dropdown cp relative br-5 my-15', {
        'disabled': this.props.disabled
      }),
      onBlur: () => this.handleBlur(),
      tabIndex: "0"
    }, /*#__PURE__*/_react.default.createElement("label", {
      htmlFor: this.props.id,
      className: (0, _classnames.default)({
        'required-label': this.props.required
      })
    }, this.props.required && /*#__PURE__*/_react.default.createElement("sup", null, "*"), (_this$props$title = this.props.title) !== null && _this$props$title !== void 0 ? _this$props$title : this.props.label), this.props.searchable && /*#__PURE__*/_react.default.createElement(_TextInput.default, {
      className: "br-5",
      onFocusInput: val => {
        this.getOptions(val);
      },
      value: (_this$state$currentVa3 = this.state.currentValue) === null || _this$state$currentVa3 === void 0 ? void 0 : _this$state$currentVa3.value,
      onInputChange: val => this.onSearch(val),
      debounce: 5
    }), !this.props.searchable && /*#__PURE__*/_react.default.createElement("p", {
      className: (0, _classnames.default)('br-5', {
        "error-border": ((_this$state$errors = this.state.errors) === null || _this$state$errors === void 0 ? void 0 : _this$state$errors.length) > 0,
        'active-dropdown': this.state.showList
      }),
      onClick: ev => {
        this.setState({
          showList: !this.state.showList
        });
      }
    }, /*#__PURE__*/_react.default.createElement("span", null, (_this$state$currentVa4 = this.state.currentValue) === null || _this$state$currentVa4 === void 0 ? void 0 : _this$state$currentVa4.value), /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(_io.IoChevronDownCircleOutline, null))), this.state.showList && this.state.options && /*#__PURE__*/_react.default.createElement("div", {
      className: "relative"
    }, /*#__PURE__*/_react.default.createElement("ul", {
      className: "options shadow-1 br-5 w-100"
    }, (_this$state$filteredO = this.state.filteredOptions) === null || _this$state$filteredO === void 0 ? void 0 : _this$state$filteredO.map(option => {
      var _this$state$currentVa5;

      return /*#__PURE__*/_react.default.createElement("li", {
        key: option.id,
        className: "p-10 rfl-h-between",
        onMouseDown: ev => {
          ev.stopPropagation();
          console.log('option clicked');
          this.onOptionSelect(option);
        }
      }, option.value, option.id == ((_this$state$currentVa5 = this.state.currentValue) === null || _this$state$currentVa5 === void 0 ? void 0 : _this$state$currentVa5.id) && /*#__PURE__*/_react.default.createElement(_fc.FcOk, null));
    }))), this.state.errors && this.state.errors.length > 0 && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "error br-5",
      ref: this.state.errorRef
    }, this.state.errors[0]), /*#__PURE__*/_react.default.createElement("div", {
      style: {
        height: (_this$state$errorRef = this.state.errorRef) === null || _this$state$errorRef === void 0 ? void 0 : _this$state$errorRef.height
      },
      className: "mb-10"
    })));
  }

}

exports.default = Dropdown;