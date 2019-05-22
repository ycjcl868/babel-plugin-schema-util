function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import BabelInlineImportHelper from './helper';

var parser = require('@babel/parser').parse;

export default function (babel) {
  var t = babel.types;
  ;

  var BabelInlineImport = function BabelInlineImport() {
    _classCallCheck(this, BabelInlineImport);

    return {
      visitor: {
        ImportDeclaration: {
          exit: function exit(path, state) {
            var givenPath = path.node.source.value;
            var reference = state && state.file && state.file.opts.filename;
            var extensions = state && state.opts && state.opts.extensions;

            if (BabelInlineImportHelper.shouldBeInlined(givenPath, extensions)) {
              if (path.node.specifiers.length > 1) {
                throw new Error("Destructuring inlined import is not allowed. Check the import statement for '".concat(givenPath, "'"));
              }

              var id = path.node.specifiers[0].local.name;
              var literal = BabelInlineImportHelper.getContents(givenPath, reference, extensions);
              var variable = t.variableDeclarator(t.identifier(id), literal);
              path.replaceWith({
                type: 'VariableDeclaration',
                kind: 'var',
                declarations: [variable],
                leadingComments: [{
                  type: 'CommentBlock',
                  value: " babel-plugin-inline-import '".concat(givenPath, "' ")
                }]
              });
            }
          }
        }
      }
    };
  };

  return new BabelInlineImport();
}