import BabelInlineImportPlugin from '../lib';
import * as babel from '@babel/core';

describe('Babel Inline Import - Plugin', () => {
  describe('Babel Plugin', () => {
    it('throws error when importing with destructuring', () => {
      expect(() => {
        babel.transform(
          "import { SomeExample, AnotherExample } from './fixtures/raw/example.raw';",
          {
            filename: __filename,
            plugins: [BabelInlineImportPlugin]
          }
        );
      }).toThrow(Error);
    });
  });
});
