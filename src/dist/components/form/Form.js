"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Helper = require("../../services/Helper");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// pass onValue prop to get value by clicking on appsubmitbutton
class Form extends _react.Component {
  constructor(props) {
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

    this.state = {};
  }

  reInit() {
    this.currentRefCount = 0;
    this.inputs = [];
    this.inputRefs = {};
  }

  recursiveCloneChildren(children, isFirst) {
    if (isFirst) {
      // recursiveCloneChildren runs twice in development due to strict mode enabled
      this.reInit();
    }

    return _react.default.Children.map(children, child => {
      var _child, _child$type, _child2, _child2$type;

      if (! /*#__PURE__*/_react.default.isValidElement(child)) return child;
      let newChild = child; // handles functional components

      if (typeof child.type === "function" && !((_child = child) !== null && _child !== void 0 && (_child$type = _child.type) !== null && _child$type !== void 0 && _child$type.ReactFormLatestInput) && (_child2 = child) !== null && _child2 !== void 0 && (_child2$type = _child2.type) !== null && _child2$type !== void 0 && _child2$type.renderDefault) {
        newChild = new child.type(child.props);
        newChild = newChild.render();
      }

      if (! /*#__PURE__*/_react.default.isValidElement(newChild)) return child;
      child = newChild;
      let childProps = {};

      if ( /*#__PURE__*/_react.default.isValidElement(child) && child.type && child.type.ReactFormLatestInput === 'ReactFormLatestInput' && !child.props.noForm && (!child.props.formId || child.props.formId === this.props.formId)) {
        childProps = this.setRefOnCustomInputs(child);
      }

      if (child.type.ReactFormLatestInput === 'SubmitButton') {
        childProps.formClicked = () => this.onFormSubmit();
      }

      childProps.children = this.recursiveCloneChildren(child.props.children);
      let el;

      if (childProps.children) {
        el = /*#__PURE__*/_react.default.cloneElement(child, childProps, childProps.children);
      } else {
        el = /*#__PURE__*/_react.default.cloneElement(child, childProps);
      }

      return el;
    });
  }

  setRefOnCustomInputs(child) {
    this.currentRefCount++;
    let currentRefCount = this.currentRefCount;
    let childProps = {
      ref: r => {
        this.inputRefs["child".concat(currentRefCount)] = r;
      },
      disabled: this.props.disabled || child.props.disabled
    };
    this.inputs.push({
      ref: "child".concat(currentRefCount)
    });
    return childProps;
  }

  render() {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !this.props.className && this.recursiveCloneChildren(this.props.children, true), !!this.props.className && /*#__PURE__*/_react.default.createElement("div", {
      className: this.props.className
    }, this.recursiveCloneChildren(this.props.children, true)));
  }

}

exports.default = Form;