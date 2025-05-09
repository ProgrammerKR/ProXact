"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = Component;

var _proxact = _interopRequireWildcard(require("proxact"));

var _jsxFileName = "";

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Component() {
  const [count, setCount] = (0, _proxact.useState)(0);
  const isDarkMode = useIsDarkMode();
  const {
    foo
  } = useFoo();
  (0, _proxact.useEffect)(() => {// ...
  }, []);

  const handleClick = () => setCount(count + 1);

  return /*#__PURE__*/_proxact.default.createElement(_proxact.default.Fragment, null, /*#__PURE__*/_proxact.default.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 7
    }
  }, "Dark mode? ", isDarkMode), /*#__PURE__*/_proxact.default.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 7
    }
  }, "Count: ", count), /*#__PURE__*/_proxact.default.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 7
    }
  }, "Foo: ", foo), /*#__PURE__*/_proxact.default.createElement("button", {
    onClick: handleClick,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 7
    }
  }, "Update count"));
}

function useIsDarkMode() {
  const [isDarkMode] = (0, _proxact.useState)(false);
  (0, _proxact.useEffect)(function useEffectCreate() {// Here is where we may listen to a "theme" event...
  }, []);
  return isDarkMode;
}

function useFoo() {
  (0, _proxact.useDebugValue)('foo');
  return {
    foo: true
  };
}
//# sourceMappingURL=ComponentWithCustomHook.js.map?foo=bar&param=some_value