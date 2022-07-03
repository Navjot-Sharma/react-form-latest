"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Chip = Chip;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _io = require("react-icons/io");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Chip(props) {
  return /*#__PURE__*/_react.default.createElement("div", {
    onClick: () => props.onClick && props.onClick(),
    className: (0, _classnames.default)("chip shadow-1 shadow-1-hover-h", props.className, {
      'active': props.active,
      'error-border': props.error,
      'error-color': props.error
    })
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: (0, _classnames.default)(props === null || props === void 0 ? void 0 : props.pClass, 'd-inline-block'),
    title: props === null || props === void 0 ? void 0 : props.title
  }, props ? props.children : ''), props && props.onClose ? /*#__PURE__*/_react.default.createElement(_io.IoIosCloseCircleOutline, {
    className: "chip-close",
    onClick: () => props.onClose()
  }) : '');
}

var _default = Chip;
exports.default = _default;