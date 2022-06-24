"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _BaseInput = require("../base-input/BaseInput");

var _lodash = require("lodash");

require("./Radio.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Radio extends _BaseInput.BaseInput {
  constructor(props) {
    var _props$id;

    super(props);

    _defineProperty(this, "handleChange", () => {
      this.setState({
        value: !this.state.value
      });
      this.props.onChange && this.props.onChange();
    });

    _defineProperty(this, "validateErrors", function () {
      let forceCheck = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      let touched = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      let errors = [];
      return errors;
    });

    _defineProperty(this, "getValue", () => {
      return [this.props.field, this.state.value];
    });

    this.state = {
      value: this.props.value,
      id: (_props$id = props.id) !== null && _props$id !== void 0 ? _props$id : 'rfl-radio-' + (0, _lodash.random)(99, 9999999)
    };
  }

  render() {
    var _this$props$label;

    return /*#__PURE__*/_react.default.createElement("div", {
      className: "form__radio-group"
    }, /*#__PURE__*/_react.default.createElement("input", {
      type: "radio",
      className: "form__radio-input",
      id: this.state.id,
      name: this.props.name,
      checked: this.state.value,
      onChange: e => this.handleChange()
    }), /*#__PURE__*/_react.default.createElement("label", {
      htmlFor: this.state.id,
      className: "form__radio-label"
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: "form__radio-btn"
    }), /*#__PURE__*/_react.default.createElement("span", null, (_this$props$label = this.props.label) !== null && _this$props$label !== void 0 ? _this$props$label : this.props.name)));
  }

}

exports.default = Radio;