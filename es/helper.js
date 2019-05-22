function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import * as fs from 'fs';
import * as path from 'path';
import * as t from '@babel/types';
import * as babylon from '@babel/parser';
import traverse from '@babel/traverse';
import rawLoader from './loader/rawLoader';
import schemaLoader from './loader/schemaLoader';

var requireResolve = require('require-resolve');

var BabelInlineImportHelper =
/*#__PURE__*/
function () {
  function BabelInlineImportHelper() {
    _classCallCheck(this, BabelInlineImportHelper);
  }

  _createClass(BabelInlineImportHelper, null, [{
    key: "shouldBeInlined",
    // ['.a', '.b', '.c', { name: '.d', loader: (content) => `~~${content}~~` }]
    value: function shouldBeInlined(givenPath, extensions) {
      var accept = typeof extensions === 'string' ? [extensions] : extensions || BabelInlineImportHelper.extensions;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = accept[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var extension = _step.value;
          var ext = extension.name || extension;

          if (givenPath.endsWith(ext)) {
            return true;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return false;
    } // [ '', '', '' ]

  }, {
    key: "getLoader",
    value: function getLoader(givenPath, extensions) {
      var curr = extensions.find(function (extension) {
        var ext = extension.name || extension;
        return givenPath.endsWith(ext);
      }) || {};
      return curr.loader || rawLoader;
    }
  }, {
    key: "getContents",
    value: function getContents(givenPath, reference, extensions) {
      if (!reference) {
        throw new Error('"reference" argument must be specified');
      }

      var mod = requireResolve(givenPath, path.resolve(reference));

      if (!mod || !mod.src) {
        throw new Error("Path '".concat(givenPath, "' could not be found for '").concat(reference, "'"));
      }

      var rawContent = fs.readFileSync(mod.src).toString();
      var loader = BabelInlineImportHelper.getLoader(givenPath, extensions || BabelInlineImportHelper.extensions);
      var content = loader(rawContent, mod.src);
      return BabelInlineImportHelper.astify(content);
    }
  }, {
    key: "transformRelativeToRootPath",
    value: function transformRelativeToRootPath(path, rootPathSuffix) {
      if (this.hasRoot(path)) {
        var withoutRoot = path.substring(1, path.length);
        return "".concat(BabelInlineImportHelper.root).concat(rootPathSuffix || '', "/").concat(withoutRoot);
      }

      if (typeof path === 'string') {
        return path;
      }

      throw new Error('ERROR: No path passed');
    }
  }, {
    key: "hasRoot",
    value: function hasRoot(string) {
      if (typeof string !== 'string') {
        return false;
      }

      return string.substring(0, 1) === '/';
    } // convert literal to ast

  }, {
    key: "astify",
    value: function astify(literal) {
      if (literal === null) {
        return t.nullLiteral();
      }

      switch (_typeof(literal)) {
        case 'function':
          var ast = babylon.parse(literal.toString(), {
            allowReturnOutsideFunction: true,
            allowSuperOutsideMethod: true
          });
          return traverse.removeProperties(ast);

        case 'number':
          return t.numericLiteral(literal);

        case 'string':
          return t.stringLiteral(literal);

        case 'boolean':
          return t.booleanLiteral(literal);

        case 'undefined':
          return t.unaryExpression('void', t.numericLiteral(0), true);

        default:
          if (Array.isArray(literal)) {
            return t.arrayExpression(literal.map(BabelInlineImportHelper.astify));
          }

          return t.objectExpression(Object.keys(literal).filter(function (k) {
            return typeof literal[k] !== 'undefined';
          }).map(function (k) {
            return t.objectProperty(t.stringLiteral(k), BabelInlineImportHelper.astify(literal[k]));
          }));
      }
    }
  }]);

  return BabelInlineImportHelper;
}();

BabelInlineImportHelper.extensions = ['.raw', '.text', '.graphql', {
  name: '.schema',
  loader: schemaLoader
}];
BabelInlineImportHelper.root = global.rootPath || process.cwd();
export { BabelInlineImportHelper as default };