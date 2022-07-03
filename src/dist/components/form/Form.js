"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FormContext = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Helper = require("../../services/Helper");

var _lodash = require("lodash");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const FormContext = /*#__PURE__*/_react.default.createContext({}); // pass onValue prop to get value by clicking on appsubmitbutton


exports.FormContext = FormContext;

class Form extends _react.Component {
  // static contextType = FormContext;
  constructor(props) {
    var _props$formId;

    super(props);

    _defineProperty(this, "inputRefs", {});

    _defineProperty(this, "currentRefCount", 0);

    _defineProperty(this, "inputs", []);

    _defineProperty(this, "onFormSubmit", () => {
      if (this.validateForm()) {
        this.getValue();
      }
    });

    _defineProperty(this, "validateForm", () => {
      let errors = [];
      this.inputs.forEach(input => {
        errors = this.validateInput(input, errors);
      });
      this.props.onValidate && this.props.onValidate(errors.length <= 0);
      return errors.length <= 0;
    });

    _defineProperty(this, "validateInput", (input, errors) => {
      return [...errors, ...this.inputRefs[input.ref].validateErrors(true)];
    });

    _defineProperty(this, "getValue", () => {
      let values = {};
      this.inputs.forEach(input => {
        let value = this.getValueInput(input);
        values[value[0]] = value[1];
      });
      this.props.onValue && this.props.onValue((0, _Helper.mapKeysToObject)(values));
      return values;
    });

    _defineProperty(this, "getValueInput", input => {
      return this.inputRefs[input.ref].getValue();
    });

    this.state = {
      formId: (_props$formId = props.formId) !== null && _props$formId !== void 0 ? _props$formId : 'rfl-form-' + (0, _lodash.random)(99, 9999999)
    };
  }

  reInit() {
    this.currentRefCount = 0;
    this.inputs = [];
    this.inputRefs = {};
  }

  removeRefFromCustomInputs(child) {
    const idx = this.inputs.findIndex(input => input.ref === child.reactFormCounter && child.reactFormId === this.state.formId);

    if (idx > -1) {
      this.inputs.splice(idx, 1);
      delete this.inputRefs[child.reactFormCounter];
      this.currentRefCount--;
    }
  }

  setRefOnCustomInputs(child) {
    if (child.props.noForm || child.props.formId && child.props.formId !== this.state.formId) {
      return;
    }

    if (this.props.formId && !child.props.formId) {
      return;
    }

    this.currentRefCount++;
    let currentRefCount = this.currentRefCount;
    this.inputRefs["child".concat(currentRefCount)] = child;
    child.reactFormCounter = "child".concat(currentRefCount);
    child.reactFormId = this.state.formId;
    this.inputs.push({
      ref: "child".concat(currentRefCount)
    });
  }

  render() {
    return /*#__PURE__*/_react.default.createElement(FormContext.Provider, {
      value: this
    }, !this.props.className && this.props.children, !!this.props.className && /*#__PURE__*/_react.default.createElement("div", {
      className: this.props.className
    }, this.props.children));
  }

}

exports.default = Form;