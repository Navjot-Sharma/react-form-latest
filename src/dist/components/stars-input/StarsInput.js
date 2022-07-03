"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _io = require("react-icons/io");

var _BaseInput = require("../base-input/BaseInput");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class StarsInput extends _BaseInput.BaseInput {
  constructor(props) {
    var _this, _this$props$totalStar, _this$props$stars;

    super(props);
    _this = this;

    _defineProperty(this, "getValue", () => {
      return [this.props.field, this.state.selectedStars];
    });

    _defineProperty(this, "validateErrors", function () {
      var _selectedStars, _ref, _this$props$name;

      let forceCheck = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      let selectedStars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      let errors = [];
      selectedStars = (_selectedStars = selectedStars) !== null && _selectedStars !== void 0 ? _selectedStars : _this.state.selectedStars;
      const fieldName = (_ref = (_this$props$name = _this.props.name) !== null && _this$props$name !== void 0 ? _this$props$name : _this.props.label) !== null && _ref !== void 0 ? _ref : "Field";

      if (_this.state.touched || forceCheck) {
        if (_this.props.required && !selectedStars) {
          errors.push(fieldName + ' is required');
        } //  else if (this.props.min && selectedStars < this.props.min) {
        //   errors.push(fieldName + ` must be at least ${this.props.min}`);
        // } else if (this.props.max && selectedStars > this.props.max) {
        //   errors.push(fieldName + ` must not exceed ${this.props.max}`);
        // }


        _this.setState({
          errors
        });
      }

      return errors;
    });

    _defineProperty(this, "onClickStar", index => {
      this.setState({
        selectedStars: index,
        touched: true
      });
      this.validateErrors(true, index);
    });

    this.state = {
      totalStars: (_this$props$totalStar = this.props.totalStars) !== null && _this$props$totalStar !== void 0 ? _this$props$totalStar : 5,
      selectedStars: (_this$props$stars = this.props.stars) !== null && _this$props$stars !== void 0 ? _this$props$stars : 0,
      errors: []
    };
  }

  render() {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)(this.props.className, 'relative')
    }, Array(this.state.selectedStars).fill().map((star, index) => /*#__PURE__*/_react.default.createElement(_io.IoIosStar, {
      size: 25,
      onClick: () => this.onClickStar(index + 1),
      className: "cp",
      style: {
        marginRight: '3px'
      },
      key: index
    })), Array(this.state.totalStars - this.state.selectedStars).fill().map((star, index) => /*#__PURE__*/_react.default.createElement(_io.IoIosStarOutline, {
      size: 25,
      onClick: () => this.onClickStar(this.state.selectedStars + index + 1),
      className: (0, _classnames.default)('cp', {
        'error-color': this.state.errors && this.state.errors.length
      }),
      style: {
        marginRight: '3px'
      },
      key: index
    })));
  }

}

exports.default = StarsInput;