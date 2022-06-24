"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Toggle = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _Helper = require("../../services/Helper");

var _BaseInput = require("../base-input/BaseInput");

require("./Toggle.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Toggle extends _BaseInput.BaseInput {
  constructor(props) {
    var _this, _props$type, _props$id, _this$props$debounce;

    super(props);
    _this = this;

    _defineProperty(this, "handleChange", e => {
      if (e.detail === 0) return;
      const newValue = !this.state.checked;

      if (!this.props.stateless) {
        this.setState({
          checked: newValue
        });
      }

      this.props.handleChange && this.props.handleChange(!this.props.stateless ? newValue : !this.props.checked);
    });

    _defineProperty(this, "validateErrors", function () {
      let forceCheck = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      let selected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.state.selected;
      let errors = [];
      return errors;
    });

    _defineProperty(this, "getValue", () => {
      return [this.props.field, this.state.checked];
    });

    this.state = {
      checked: this.props.checked,
      overflow: this.props.overflow,
      type: (_props$type = props.type) !== null && _props$type !== void 0 ? _props$type : 'toggle',
      // toggle || check
      id: (_props$id = props.id) !== null && _props$id !== void 0 ? _props$id : 'rfl-toggle-' + (0, _lodash.random)(99, 9999999)
    };
    this.onToggle = (0, _lodash.throttle)(e => {
      this.handleChange(e);
    }, (_this$props$debounce = this.props.debounce) !== null && _this$props$debounce !== void 0 ? _this$props$debounce : 10); // if (this.props.debounce) {
    // }
  }

  componentDidUpdate(props) {
    if (props.checked !== this.props.checked) {
      // console.log(props, this.props);
      this.setState({
        checked: this.props.checked
      });
    }
  }

  render() {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !this.props.noForm && /*#__PURE__*/_react.default.createElement("div", {
      title: this.props.label,
      className: (0, _classnames.default)("my-15 cp", this.props.className, {
        'neumorphism-toggle': this.state.type === 'toggle',
        'nfl-check': this.state.type === 'check'
      }),
      onClick: e => {
        e.persist();
        this.onToggle(e);
      }
    }, /*#__PURE__*/_react.default.createElement("input", {
      type: "checkbox",
      id: this.state.id,
      checked: this.state.checked,
      onChange: () => null
    }), /*#__PURE__*/_react.default.createElement("label", {
      htmlFor: this.state.id,
      className: "app-h-center"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "switch"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "dot"
    })), !this.state.overflow && /*#__PURE__*/_react.default.createElement("span", null, this.props.label), this.state.overflow && /*#__PURE__*/_react.default.createElement("span", null, (0, _Helper.overflowElipsis)(this.props.label, this.state.overflow, 'left')))));
  }

}

exports.Toggle = Toggle;