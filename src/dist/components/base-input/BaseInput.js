"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseInput = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Form = require("../form/Form");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Must override two functions 
 * validateErrors & getValue
 */
class BaseInput extends _react.Component {
  constructor(props) {
    var _ref, _this$props$name;

    super(props);

    _defineProperty(this, "fieldName", '');

    this.fieldName = (_ref = (_this$props$name = this.props.name) !== null && _this$props$name !== void 0 ? _this$props$name : this.props.label) !== null && _ref !== void 0 ? _ref : "Field";
    this.inputComponentDidMount = this.componentDidMount;
    this.inputComponentWillUnmount = this.componentWillUnmount;

    this.componentDidMount = () => {
      this.context.setRefOnCustomInputs(this);
      this.inputComponentDidMount && this.inputComponentDidMount();
    };

    this.componentWillUnmount = () => {
      this.context.removeRefFromCustomInputs(this);
      this.inputComponentWillUnmount && this.inputComponentWillUnmount();
    };
  }

  validateErrors() {
    let forceCheck = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    let touched = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    let errors = [];
    return errors;
  }

  getValue() {
    return [this.props.field, this.state.value];
  }

}

exports.BaseInput = BaseInput;

_defineProperty(BaseInput, "contextType", _Form.FormContext);