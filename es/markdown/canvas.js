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

var _less = _interopRequireDefault(require("less"));

var _prismjs = _interopRequireDefault(require("prismjs"));

require("prismjs/components/prism-less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Canvas).call(this, props)); //坑位Id

    _this.playerId = "player-".concat(parseInt(Math.random() * 1e9).toString(36)); //分类匹配出less/js/jsx/css

    var descriptionSource = _this.props.children.replace(/(`{3})([^`]|[^`][\s\S]*?[^`])\1(?!`)/ig, function (markdown) {
      var _markdown$match = markdown.match(/```(.*)\n?([^]+)```/),
          _markdown$match2 = _slicedToArray(_markdown$match, 3),
          all = _markdown$match2[0],
          type = _markdown$match2[1],
          code = _markdown$match2[2];

      switch (type.trim()) {
        case 'js':
        case 'jsx':
          _this.jsCode = code;
          break;

        case 'less':
          _this.lessCodeSource = (0, _marked.default)(all);

          _less.default.render("\n            #".concat(_this.playerId, " {\n              ").concat(code, "\n            }\n          "), function (e, compiledCode) {
            _this.lessCode = compiledCode.css;
          });

          break;

        case 'css':
          _this.cssCodeSource = (0, _marked.default)(all);

          _less.default.render("\n            #".concat(_this.playerId, " {\n              ").concat(code, "\n            }\n          "), function (e, compiledCode) {
            _this.cssCode = compiledCode.css;
          });

          break;

        default:
          break;
      }

      return '';
    }); //replace剩下的是description


    _this.description = (0, _marked.default)(descriptionSource);
    _this.state = {
      showBlock: false
    };
    return _this;
  }

  _createClass(Canvas, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.renderSource(this.jsCode);
    }
  }, {
    key: "blockControl",
    value: function blockControl() {
      var _this2 = this;

      this.setState({
        showBlock: !this.state.showBlock
      }, function () {
        if (_this2.state.showBlock && (_this2.lessCodeSource || _this2.cssCodeSource)) {
          _prismjs.default.highlightAllUnder(document.getElementById("".concat(_this2.props.containerId)));
        }
      });
    }
  }, {
    key: "renderSource",
    value: function renderSource(value) {
      var _this3 = this;

      new Promise(function (resolve) {
        var args = ['context', 'React', 'ReactDOM'];
        var argv = [_this3, _react.default, _reactDom.default];
        _this3.props.dependencies && Object.keys(_this3.props.dependencies).forEach(function (key) {
          args.push(key);
          argv.push(_this3.props.dependencies[key]);
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
          code = (0, _babelStandalone.transform)("\n           ".concat(value.replace('mountNode', "document.getElementById('".concat(_this3.playerId, "')")), "\n        "), {
            presets: ['react', 'stage-1']
          }).code;
        } else {
          code = (0, _babelStandalone.transform)("\n          class Demo extends React.Component {\n             ".concat(value, "\n          }\n          ReactDOM.render(<Demo {...context.props} />,\n          document.getElementById('").concat(_this3.playerId, "'))\n          "), {
            presets: ['react', 'stage-1']
          }).code;
        }

        args.push(code); //render to playrId div

        _construct(Function, _toConsumableArray(args)).apply(null, argv);
      }).catch(function (err) {
        if (process.env.NODE_ENV !== 'production') {
          throw err;
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

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
        value: this.jsCode,
        onChange: function onChange(code) {
          return _this4.renderSource(code);
        }
      }), this.lessCodeSource && _react.default.createElement("div", {
        className: "style-block",
        dangerouslySetInnerHTML: {
          __html: this.lessCodeSource
        }
      }), this.cssCodeSource && _react.default.createElement("div", {
        className: "style-block",
        dangerouslySetInnerHTML: {
          __html: this.cssCodeSource
        }
      })), _react.default.createElement("div", {
        className: "demo-block-control",
        onClick: this.blockControl.bind(this)
      }, this.state.showBlock ? _react.default.createElement("span", null, this.props.locale.hide) : _react.default.createElement("span", null, this.props.locale.show)), this.lessCode && _react.default.createElement("style", null, this.lessCode), this.cssCode && _react.default.createElement("style", null, this.cssCode));
    }
  }]);

  return Canvas;
}(_react.default.Component);

exports.default = Canvas;

_defineProperty(Canvas, "propTypes", {
  locale: _propTypes.default.object,
  name: _propTypes.default.string,
  containerId: _propTypes.default.string,
  children: _propTypes.default.node,
  dependencies: _propTypes.default.object
});

_defineProperty(Canvas, "defaultProps", {
  locale: {
    hide: '隐藏代码',
    show: '显示代码'
  }
});