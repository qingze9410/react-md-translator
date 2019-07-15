"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _marked = _interopRequireDefault(require("marked"));

var _prismjs = _interopRequireDefault(require("prismjs"));

var _canvas = _interopRequireDefault(require("./canvas"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var Markdown =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Markdown, _React$Component);

  function Markdown(props) {
    var _this;

    _classCallCheck(this, Markdown);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Markdown).call(this, props));
    _this.components = new Map();
    _this.renderer = new _marked["default"].Renderer();

    _this.renderer.table = function (header, body) {
      return "<table class=\"md-table\"><thead>".concat(header, "</thead><tbody>").concat(body, "</tbody></table>");
    };

    _this.renderer.listitem = function (text) {
      return "<li class=\"md-listitem\">".concat(text, "</li>");
    };

    _this.renderer.paragraph = function (text) {
      return "<p class=\"md-paragraph\">".concat(text, "</p>");
    };

    _this.renderer.heading = function (text, level, raw) {
      if (this.options.headerIds) {
        return '<h' + level + ' id="' + text + '" class="md-heading">' + text + '</h' + level + '>\n';
      } // ignore IDs


      return '<h' + level + ' class="md-heading" >' + text + '</h' + level + '>\n';
    }; // 开发自定义 marked.renderer;


    if (_this.props.renderer) _this.renderer = _this.props.renderer;
    return _this;
  }

  _createClass(Markdown, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.renderDOM();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.renderDOM();
    }
  }, {
    key: "renderDOM",
    value: function renderDOM() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.components[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2),
              id = _step$value[0],
              component = _step$value[1];

          var div = document.getElementById(id);

          if (div instanceof HTMLElement) {
            _reactDom["default"].render(component, div);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      _prismjs["default"].highlightAll();
    } //:::demo ::: 更换成带随机数id的坑位 ，再次render 放入坑位内

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var document = this.props.children;

      if (typeof document === 'string') {
        this.components.clear();
        var html = (0, _marked["default"])(document.replace(/:::\s?(demo|display)\s?([^]+?):::/g, function (match, p1, p2, offset) {
          var id = offset.toString(36);

          _this2.components.set(id, _react["default"].createElement(_canvas["default"], Object.assign({
            name: _this2.constructor.name.toLowerCase(),
            showCode: p1 === 'demo',
            containerId: id
          }, _this2.props), p2));

          return "<div id=".concat(id, " class=\"demo-container\"></div>");
        }), {
          renderer: this.renderer
        });
        return _react["default"].createElement("div", {
          dangerouslySetInnerHTML: {
            __html: html
          }
        });
      } else {
        return _react["default"].createElement("span", null);
      }
    }
  }]);

  return Markdown;
}(_react["default"].Component);

exports["default"] = Markdown;

_defineProperty(Markdown, "propTypes", {
  dependencies: _propTypes["default"].object,
  renderer: _propTypes["default"].object
});