"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Chip = _interopRequireDefault(require("../chips/Chip"));

var _TextInput = _interopRequireDefault(require("../text-input/TextInput"));

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
class Tags extends _BaseInput.BaseInput {
  constructor(props) {
    var _this, _this$props$returnFie;

    super(props);
    _this = this;

    _defineProperty(this, "selectChipsOnStart", () => {
      var _copy;

      let chips = (_copy = (0, _Helper.copy)(this.props.chips)) !== null && _copy !== void 0 ? _copy : [];
      console.log('onselectchips on start: ', JSON.stringify(chips));
      chips = chips.map(chip => {
        var _this$props$value;

        if (typeof chip == 'string') {
          chip = {
            value: chip
          };
        }

        if (!chip.value) {
          chip.value = chip.name;
        }

        if (!chip.label) {
          if (chip.name) {
            chip.label = chip.name;
          } else {
            chip.label = chip.value;
          }
        }

        if ((_this$props$value = this.props.value) !== null && _this$props$value !== void 0 && _this$props$value.includes(chip.value)) {
          chip.selected = true;
        }

        return chip;
      });
      console.log('onselectchips on end: ', JSON.stringify(chips));
      return chips;
    });

    _defineProperty(this, "handleAddTag", () => {
      const chips = (0, _Helper.copy)(this.state.chips);
      let value = this.state.tagInput.current.getValue()[1];

      if (value) {
        if (chips !== null && chips !== void 0 && chips.find(chip => chip.value === value)) {
          return; // return toast({
          //   title: 'Tag already exists',
          //   type: 'danger'
          // });
        }

        chips.push({
          value,
          label: value
        }); // tagInput.setState({value: ''});

        this.setState({
          chips
        });
        this.state.tagInput.current.clearValue();
      }
    });

    _defineProperty(this, "onClickChip", chip => {
      let chips = (0, _Helper.copy)(this.state.chips);
      chips = chips.filter(c => c.value !== chip.value);
      this.setState({
        chips
      });
    });

    _defineProperty(this, "validateErrors", function () {
      let forceCheck = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      let errors = [];

      const selectedChips = _this.state.chips.filter(chip => chip.selected).length;

      if (selectedChips < _this.props.min) {
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
      const chips = this.state.chips.map(chip => chip.value);
      return [this.props.field, chips];
    });

    this.state = {
      chips: this.selectChipsOnStart(),
      tagInput: /*#__PURE__*/_react.default.createRef(),
      returnField: (_this$props$returnFie = this.props.returnField) !== null && _this$props$returnFie !== void 0 ? _this$props$returnFie : 'value',
      errors: []
    };
  }

  componentDidUpdate(props) {
    if (props.chips !== this.props.chips) {
      const chips = this.selectChipsOnStart();
      console.log('updating chips: ', JSON.stringify(chips));
      this.setState({
        chips
      });
    }
  }

  render() {
    var _this$state$chips;

    return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_TextInput.default, {
      ref: this.state.tagInput,
      noForm: true,
      className: "w-100 mr-10",
      onClickAdd: () => this.handleAddTag()
    }), /*#__PURE__*/_react.default.createElement("div", null, (_this$state$chips = this.state.chips) === null || _this$state$chips === void 0 ? void 0 : _this$state$chips.map((chip, i) => /*#__PURE__*/_react.default.createElement(_Chip.default, {
      key: i,
      closable: true,
      className: "mr-10 py-10 px-15 my-5",
      onClose: () => this.onClickChip(chip)
    }, chip.label))));
  }

}

exports.default = Tags;