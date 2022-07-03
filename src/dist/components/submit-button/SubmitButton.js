"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _vsc = require("react-icons/vsc");

var _BaseInput = require("../base-input/BaseInput");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SubmitButton extends _BaseInput.BaseInput {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleClick", () => {
      // if (this.props.formClicked) {
      //   this.props.formClicked();
      // }
      this.context.onFormSubmit && this.context.onFormSubmit();
      this.props.onClick && this.props.onClick();
    });

    this.state = {};
  }

  render() {
    return /*#__PURE__*/_react.default.createElement("button", {
      disabled: this.props.disabled || this.props.loading,
      className: (0, _classnames.default)('react-latest-button', this.props.className),
      onClick: () => this.handleClick()
    }, this.props.children, " ", this.props.loading && /*#__PURE__*/_react.default.createElement(_vsc.VscLoading, {
      className: "rotate ml-5"
    }));
  }

}

exports.default = SubmitButton;