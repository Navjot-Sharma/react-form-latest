"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Chip = _interopRequireDefault(require("./Chip"));

var _BaseInput = require("../base-input/BaseInput");

var _Helper = require("../../services/Helper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @param {Array} chips
 * @param {String} chips.value
 * @param {String} chips.label ?? chips.value
 * @param {Array | String} value
 * 
 */
class Chips extends _BaseInput.BaseInput {
  constructor(props) {
    var _this, _props$multi, _this$props$returnFie;

    super(props);
    _this = this;

    _defineProperty(this, "selectChipsOnStart", function () {
      var _this$state, _copy;

      let multi = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (_this$state = _this.state) === null || _this$state === void 0 ? void 0 : _this$state.multi;
      let chips = (_copy = (0, _Helper.copy)(_this.props.chips)) !== null && _copy !== void 0 ? _copy : [];
      chips = chips.map(chip => {
        if (typeof chip == 'string') {
          chip = {
            value: chip
          };
        }

        if (!chip.label) {
          if (chip.name) {
            chip.label = chip.name;
          } else {
            chip.label = chip.value;
          }
        }

        if (multi) {
          var _this$props$value;

          if ((_this$props$value = _this.props.value) !== null && _this$props$value !== void 0 && _this$props$value.includes(chip.value)) {
            chip.selected = true;
          }
        } else if (_this.props.value === chip.value) {
          chip.selected = true;
        }

        return chip;
      });
      return chips;
    });

    _defineProperty(this, "onClickChip", chip => {
      const chips = (0, _Helper.copy)(this.state.chips);
      chips.forEach(c => {
        if (c.value === chip.value) {
          c.selected = !c.selected;
        } else if (!this.state.multi) {
          c.selected = false;
        }
      });
      this.setState({
        chips
      });
    });

    _defineProperty(this, "validateErrors", function () {
      let forceCheck = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      let errors = [];

      const selectedChips = _this.state.chips.filter(chip => chip.selected).length;

      if (_this.props.required && !selectedChips) {
        errors.push("Please select at least1 ".concat(_this.props.label));
      } else if (selectedChips < _this.props.min) {
        errors.push("Please select at least ".concat(_this.props.min, " ").concat(_this.props.label));
      } else if (selectedChips > _this.props.max) {
        errors.push("Maximum ".concat(_this.props.max, " ").concat(_this.props.label, " allowed"));
      }

      _this.setState({
        errors
      });

      return errors;
    });

    _defineProperty(this, "getValue", () => {
      const chips = this.state.chips.filter(c => c.selected).map(chip => {
        var _ref;

        return (_ref = this.state.returnField && chip[this.state.returnField]) !== null && _ref !== void 0 ? _ref : chip;
      });

      if (!this.state.multi) {
        return [this.props.field, chips[0]];
      }

      return [this.props.field, chips];
    });

    let _multi = (_props$multi = props.multi) !== null && _props$multi !== void 0 ? _props$multi : this.props.max && this.props.max > 1;

    this.state = {
      chips: this.selectChipsOnStart(_multi),
      returnField: (_this$props$returnFie = this.props.returnField) !== null && _this$props$returnFie !== void 0 ? _this$props$returnFie : 'value',
      errors: [],
      multi: _multi
    };
  }

  componentDidUpdate(props) {
    if (props.chips !== this.props.chips || props.value !== this.props.value) {
      const chips = this.selectChipsOnStart();
      this.setState({
        chips
      });
    }
  }

  render() {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: this.props.className
    }, this.state.chips.map((chip, i) => /*#__PURE__*/_react.default.createElement(_Chip.default, {
      onClick: () => this.onClickChip(chip),
      error: this.state.errors.length,
      key: chip.value + i,
      className: "mr-10 py-10 px-15 my-5",
      active: chip.selected
    }, chip.label)));
  }

}

exports.default = Chips;