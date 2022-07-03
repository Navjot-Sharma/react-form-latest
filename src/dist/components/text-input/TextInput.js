"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _vsc = require("react-icons/vsc");

var _Helper = require("../../services/Helper");

require("./TextInput.scss");

var _BaseInput = require("../base-input/BaseInput");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * listen to onInputChange 
**/
class TextInput extends _BaseInput.BaseInput {
  constructor(props) {
    var _this, _this$props$reInitCou;

    super(props);
    _this = this;

    _defineProperty(this, "onGetValue", () => {
      const errors = this.validateErrors(true);

      if (this.props.onGetValue && !errors.length) {
        this.props.onGetValue(this.state.input.value);
      }
    });

    _defineProperty(this, "setInputRef", ref => {
      this.setState({
        input: ref
      });

      if (ref && this.props.focus && !this.state.touched) {
        ref.focus();
      }

      if (ref && this.state.value != undefined && this.state.value != null) {
        ref.value = this.state.value;
      }
    });

    _defineProperty(this, "validateErrors", function () {
      var _ref, _this$props$name, _this$state$input$val, _this$state$input, _this$state$editor;

      let forceCheck = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      let errors = [];
      const fieldName = (_ref = (_this$props$name = _this.props.name) !== null && _this$props$name !== void 0 ? _this$props$name : _this.props.label) !== null && _ref !== void 0 ? _ref : "Field";
      const value = (_this$state$input$val = (_this$state$input = _this.state.input) === null || _this$state$input === void 0 ? void 0 : _this$state$input.value) !== null && _this$state$input$val !== void 0 ? _this$state$input$val : (_this$state$editor = _this.state.editor) === null || _this$state$editor === void 0 ? void 0 : _this$state$editor.value;

      if (_this.state.touched || forceCheck) {
        if (_this.props.required && !value) {
          errors.push(fieldName + " is required");
        } else if (_this.props.type == "password" && (value === null || value === void 0 ? void 0 : value.length) < 8) {
          errors.push(fieldName + " must have at least 8 characters");
        } else if (_this.props.minLength && !(0, _Helper.empty)(value) && (value === null || value === void 0 ? void 0 : value.length) < _this.props.minLength) {
          errors.push(fieldName + " must have at least ".concat(_this.props.minLength, " characters"));
        } else if (_this.props.maxLength && (value === null || value === void 0 ? void 0 : value.length) > _this.props.maxLength) {
          errors.push(fieldName + " must not exceed ".concat(_this.props.maxLength, " characters"));
        } else if (_this.props.min != null && !(0, _Helper.empty)(value) && +value < _this.props.min) {
          errors.push(fieldName + " must not be less than ".concat(_this.props.min));
        } else if (_this.props.max && !(0, _Helper.empty)(value) && +value > _this.props.max) {
          errors.push(fieldName + " must be less than ".concat(_this.props.max));
        } else if (_this.props.type === 'numeric' && isNaN(value)) {
          errors.push(fieldName + " must be a numeric");
        } else if (_this.props.type === 'integer' && (isNaN(value) || (value + '').includes('.'))) {
          if (isNaN(value)) {
            errors.push(fieldName + " must be integer");
          } else {
            errors.push(fieldName + " must not contains fractional values");
          }
        } else if (_this.props.noSpace && value.split(' ').length > 1) {
          errors.push(fieldName + " must not contain spaces.");
        } else if (_this.state.uniqueError) {
          errors.push(fieldName + " is already taken");
        }

        _this.setState({
          errors
        });
      }

      return errors;
    });

    _defineProperty(this, "onFocusInput", () => {
      this.setState({
        touched: true
      });

      if (this.props.onFocusInput) {
        var _this$state$input2;

        this.props.onFocusInput((_this$state$input2 = this.state.input) === null || _this$state$input2 === void 0 ? void 0 : _this$state$input2.value);
      }
    });

    _defineProperty(this, "onBlurInput", async () => {
      let errors = this.validateErrors(true);

      if (this.props.onBlurInput) {
        this.props.onBlurInput();
      }

      return errors;
    });

    _defineProperty(this, "onPressEnter", e => {
      if (this.props.enableEnter && e.key === 'Enter') {
        var _this$state$errors;

        this.onBlurInput();
        this.props.onEnter && !((_this$state$errors = this.state.errors) !== null && _this$state$errors !== void 0 && _this$state$errors.length) && this.props.onEnter(this.state.input.value);
      }
    });

    _defineProperty(this, "getValue", () => {
      return [this.props.field, this.state.input.value];
    });

    _defineProperty(this, "clearValue", () => {
      this.state.input.value = '';
    });

    _defineProperty(this, "onTogglePassword", function () {
      let hide = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (hide) {
        _this.setState({
          type: "password"
        });
      } else {
        _this.setState({
          type: "text"
        });
      } // this.state.input.focus();

    });

    _defineProperty(this, "onInputChange", () => {
      this.setState({
        value: this.state.input.value
      });

      if (this.props.onInputChange) {
        let errors = this.validateErrors();

        if (!errors || !errors.length) {
          this.props.onInputChange(this.state.input.value);
        }
      }
    });

    _defineProperty(this, "getInputType", () => {
      switch (this.props.type) {
        case 'password':
          return this.state.type;

        default:
          return 'text';
      }
    });

    _defineProperty(this, "getElement", () => {
      if (this.state.type == "textarea") {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "text-container"
        }, /*#__PURE__*/_react.default.createElement("label", {
          htmlFor: this.props.id,
          className: "input-label"
        }, this.props.required && /*#__PURE__*/_react.default.createElement("sup", {
          className: "app-primary"
        }, "*"), this.props.label), /*#__PURE__*/_react.default.createElement("textarea", {
          className: (0, _classnames.default)(this.props.inputClass, {
            "error-border": this.state.errors.length > 0
          }),
          placeholder: this.props.placeholder,
          ref: this.setInputRef,
          onFocus: () => this.onFocusInput(),
          onBlur: () => this.onBlurInput(),
          name: this.props.name,
          id: this.props.id,
          style: this.props.style
        }));
      }

      return /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)("input-container my-15", {
          "disabled": this.props.disabled
        })
      }, this.props.label && /*#__PURE__*/_react.default.createElement("label", {
        htmlFor: this.props.id,
        className: (0, _classnames.default)({
          'required-label': this.props.required
        })
      }, this.props.required && /*#__PURE__*/_react.default.createElement("sup", {
        className: "app-primary"
      }, "*"), this.props.label), /*#__PURE__*/_react.default.createElement("input", {
        className: (0, _classnames.default)(this.props.inputClass, {
          "error-border": this.state.errors.length > 0,
          "disabled": this.props.disabled,
          'fixed-height': !this.props.autoHeight
        }),
        placeholder: this.props.placeholder,
        ref: this.setInputRef,
        type: this.getInputType(),
        onFocus: () => this.onFocusInput(),
        onBlur: () => this.onBlurInput(),
        onChange: () => this.onInputChange(),
        onKeyDown: e => this.onPressEnter(e),
        name: this.props.name,
        id: this.props.id,
        disabled: this.props.disabled,
        style: {
          paddingLeft: this.props.chips ? Math.min(3, this.props.chips) * 145 : ''
        }
      }), this.state.fetching && /*#__PURE__*/_react.default.createElement("div", {
        className: "input-icon"
      }, /*#__PURE__*/_react.default.createElement(_vsc.VscLoading, {
        className: "rotate"
      })), this.props.onApply && /*#__PURE__*/_react.default.createElement("div", {
        className: "input-icon input-icon-btn apply-icon",
        onClick: () => this.props.onApply && this.props.onApply()
      }, /*#__PURE__*/_react.default.createElement(_vsc.VscChevronRight, null)), this.props.onClose && /*#__PURE__*/_react.default.createElement("div", {
        className: "input-icon input-icon-btn cross-icon",
        onClick: () => this.props.onClose && this.props.onClose()
      }, /*#__PURE__*/_react.default.createElement(_vsc.VscClose, null)), this.props.onClickAdd && /*#__PURE__*/_react.default.createElement("div", {
        className: "input-icon input-icon-btn add-icon",
        onClick: () => this.props.onClickAdd && this.props.onClickAdd()
      }, /*#__PURE__*/_react.default.createElement(_vsc.VscAdd, null)));
    });

    this.state = {
      input: /*#__PURE__*/_react.default.createRef(),
      value: props.value,
      touched: false,
      dirty: false,
      errors: [],
      valid: false,
      label: props.label,
      fetching: false,
      type: props.type || "text",
      errorRef: /*#__PURE__*/_react.default.createRef(),
      reInitCount: (_this$props$reInitCou = this.props.reInitCount) !== null && _this$props$reInitCou !== void 0 ? _this$props$reInitCou : 0,
      uniqueError: false
    };
    this.onInputChange = (0, _lodash.debounce)(this.onInputChange, this.props.debounce || 1000);
  }

  componentDidUpdate(props) {
    if (this.props.reInitCount && this.props.reInitCount !== props.reInitCount) {
      this.onGetValue();
    }

    if (this.props.value !== props.value || this.props.initCount && this.props.initCount !== props.initCount) {
      this.setState({
        value: this.props.value,
        touched: false,
        dirty: false,
        errors: [],
        valid: false,
        type: this.props.type || "text",
        reInitCount: this.props.reInitCount
      });
      this.state.input.value = this.props.value;
    }

    if (this.props.errors && JSON.stringify(this.state.errors) !== JSON.stringify(this.props.errors)) {
      this.setState({
        errors: this.props.errors
      });
    }
  }

  render() {
    var _this$state$errorRef;

    return /*#__PURE__*/_react.default.createElement("div", {
      className: this.props.className
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "relative"
    }, this.getElement(), this.props.type === "password" && this.state.type === "text" && /*#__PURE__*/_react.default.createElement(_vsc.VscEye, {
      className: "input-eye",
      onClick: () => this.onTogglePassword(true)
    }), this.props.type === "password" && this.state.type === "password" && /*#__PURE__*/_react.default.createElement(_vsc.VscEyeClosed, {
      className: "input-eye",
      onClick: () => this.onTogglePassword()
    }), this.state.errors && this.state.errors.length > 0 && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "error br-5",
      ref: this.state.errorRef
    }, this.state.errors[0]), /*#__PURE__*/_react.default.createElement("div", {
      style: {
        height: (_this$state$errorRef = this.state.errorRef) === null || _this$state$errorRef === void 0 ? void 0 : _this$state$errorRef.height
      },
      className: "mb-10"
    }))));
  }

}

var _default = TextInput;
exports.default = _default;