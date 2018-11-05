"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _marked = _interopRequireDefault(require("marked"));

var _babelStandalone = require("babel-standalone");

var _editor = _interopRequireDefault(require("../editor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//代码展示容器
var Canvas =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Canvas, _React$Component);

  function Canvas(props) {
    var _this;

    _classCallCheck(this, Canvas);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Canvas).call(this, props));
    _this.playerId = "".concat(parseInt(Math.random() * 1e9).toString(36));
    _this.document = _this.props.children.match(/([^]*)\n?(```[^]+```)/);
    _this.description = (0, _marked.default)(_this.document[1]);
    _this.source = _this.document[2].match(/```(.*)\n?([^]+)```/);
    _this.state = {
      showBlock: false
    };
    return _this;
  }

  _createClass(Canvas, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.renderSource(this.source[2]);
    }
  }, {
    key: "blockControl",
    value: function blockControl() {
      this.setState({
        showBlock: !this.state.showBlock
      });
    }
  }, {
    key: "renderSource",
    value: function renderSource(value) {
      var _this2 = this;

      new Promise(function (resolve) {
        var args = ['context', 'React', 'ReactDOM'];
        var argv = [_this2, _react.default, _reactDom.default];
        _this2.props.dependencies && Object.keys(_this2.props.dependencies).forEach(function (key) {
          args.push(key);
          argv.push(_this2.props.dependencies[key]);
        });
        resolve({
          args: args,
          argv: argv
        });
      }).then(function (_ref) {
        var args = _ref.args,
            argv = _ref.argv;
        var code;

        if (/ReactDOM\.render/.test(value)) {
          code = (0, _babelStandalone.transform)("\n           ".concat(value.replace('mountNode', "document.getElementById('".concat(_this2.playerId, "')")), "\n        "), {
            presets: ['react', 'stage-1']
          }).code;
        } else {
          code = (0, _babelStandalone.transform)("\n          class Demo extends React.Component {\n             ".concat(value, "\n          }\n          ReactDOM.render(<Demo {...context.props} />,\n          document.getElementById('").concat(_this2.playerId, "'))\n          "), {
            presets: ['react', 'stage-1']
          }).code;
        }

        args.push(code); //render to playrId div

        _construct(Function, _toConsumableArray(args)).apply(null, argv);

        _this2.source[2] = value;
      }).catch(function (err) {
        if (process.env.NODE_ENV !== 'production') {
          throw err;
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return _react.default.createElement("div", {
        className: "demo-block demo-box demo-".concat(this.props.name)
      }, _react.default.createElement("div", {
        className: "source",
        id: this.playerId
      }), this.state.showBlock && _react.default.createElement("div", {
        className: "meta"
      }, this.description && _react.default.createElement("div", {
        ref: "description",
        className: "description",
        dangerouslySetInnerHTML: {
          __html: this.description
        }
      }), _react.default.createElement(_editor.default, {
        value: this.source[2],
        onChange: function onChange(code) {
          return _this3.renderSource(code);
        }
      })), _react.default.createElement("div", {
        className: "demo-block-control",
        onClick: this.blockControl.bind(this)
      }, this.state.showBlock ? _react.default.createElement("span", null, this.props.locale.hide) : _react.default.createElement("span", null, this.props.locale.show)));
    }
  }]);

  return Canvas;
}(_react.default.Component);

exports.default = Canvas;

_defineProperty(Canvas, "propTypes", {
  locale: _propTypes.default.object,
  name: _propTypes.default.string,
  children: _propTypes.default.node,
  dependencies: _propTypes.default.object
});

_defineProperty(Canvas, "defaultProps", {
  locale: {
    hide: '隐藏代码',
    show: '显示代码'
  }
});