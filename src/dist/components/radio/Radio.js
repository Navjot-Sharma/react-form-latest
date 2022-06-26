"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _BaseInput = require("../base-input/BaseInput");

var _lodash = require("lodash");

require("./Radio.scss");

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Radio extends _BaseInput.BaseInput {
  constructor(props) {
    var _this, _props$id;

    super(props);
    _this = this;

    _defineProperty(this, "handleChange", btn => {
      this.setState({
        value: btn.id
      });
      this.props.onChange && this.props.onChange();
    });

    _defineProperty(this, "validateErrors", function () {
      let forceCheck = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      let value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.state.value;
      let errors = [];

      if (_this.props.required && !value) {
        errors.push(_this.fieldName + " is required");
      }

      _this.setState({
        errors
      });

      return errors;
    });

    _defineProperty(this, "getValue", () => {
      var _this$props$id;

      return [this.props.field, (_this$props$id = this.props.id) !== null && _this$props$id !== void 0 ? _this$props$id : this.state.value];
    });

    this.state = {
      value: this.props.value,
      name: (_props$id = props.id) !== null && _props$id !== void 0 ? _props$id : 'rfl-radio-' + (0, _lodash.random)(99, 9999999),
      errors: []
    };
  }

  render() {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, this.props.buttons.map(btn => {
      var _btn$label;

      return /*#__PURE__*/_react.default.createElement("div", {
        key: btn.id,
        className: (0, _classnames.default)("form__radio-group", this.props.className)
      }, /*#__PURE__*/_react.default.createElement("input", {
        type: "radio",
        className: "form__radio-input",
        id: btn.id,
        name: this.state.name,
        checked: this.state.value === btn.id,
        onChange: e => this.handleChange(btn)
      }), /*#__PURE__*/_react.default.createElement("label", {
        htmlFor: btn.id,
        className: "form__radio-label"
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: (0, _classnames.default)("form__radio-btn", {
          'nfl-error': this.state.errors.length && !this.state.value
        })
      }), /*#__PURE__*/_react.default.createElement("span", null, (_btn$label = btn.label) !== null && _btn$label !== void 0 ? _btn$label : this.props.name)));
    }));
  }

}

exports.default = Radio;