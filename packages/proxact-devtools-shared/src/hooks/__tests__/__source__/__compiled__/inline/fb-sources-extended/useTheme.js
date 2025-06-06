"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useTheme;
exports.ThemeContext = void 0;

var _proxact = require("proxact");

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
const ThemeContext = /*#__PURE__*/(0, _proxact.createContext)('bright');
exports.ThemeContext = ThemeContext;

function useTheme() {
  const theme = (0, _proxact.useContext)(ThemeContext);
  (0, _proxact.useDebugValue)(theme);
  return theme;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZVRoZW1lLmpzIl0sIm5hbWVzIjpbIlRoZW1lQ29udGV4dCIsInVzZVRoZW1lIiwidGhlbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBU0E7O0FBVEE7Ozs7Ozs7O0FBV08sTUFBTUEsWUFBWSxnQkFBRywwQkFBYyxRQUFkLENBQXJCOzs7QUFFUSxTQUFTQyxRQUFULEdBQW9CO0FBQ2pDLFFBQU1DLEtBQUssR0FBRyx1QkFBV0YsWUFBWCxDQUFkO0FBQ0EsNEJBQWNFLEtBQWQ7QUFDQSxTQUFPQSxLQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgRmFjZWJvb2ssIEluYy4gYW5kIGl0cyBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBmbG93XG4gKi9cblxuaW1wb3J0IHtjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0LCB1c2VEZWJ1Z1ZhbHVlfSBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBjb25zdCBUaGVtZUNvbnRleHQgPSBjcmVhdGVDb250ZXh0KCdicmlnaHQnKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXNlVGhlbWUoKSB7XG4gIGNvbnN0IHRoZW1lID0gdXNlQ29udGV4dChUaGVtZUNvbnRleHQpO1xuICB1c2VEZWJ1Z1ZhbHVlKHRoZW1lKTtcbiAgcmV0dXJuIHRoZW1lO1xufVxuIl0sInhfZmFjZWJvb2tfc291cmNlcyI6W1tudWxsLFt7Im5hbWVzIjpbIjxuby1ob29rPiIsInRoZW1lIl0sIm1hcHBpbmdzIjoiQ0FBRDtlZ0JDQSxBd0JEQSJ9XV1dfQ==