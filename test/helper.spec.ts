import BabelInlineImportHelper from '../lib/helper';
import schemaLoader from '../lib/loader/schemaLoader';

describe('Babel Inline Import - Helper', () => {

  describe('Class', () => {
    it('returns the default extensions', () => {
      expect(BabelInlineImportHelper.extensions).toEqual([
        '.raw',
        '.text',
        '.graphql',
        {
          'name': '.schema',
          'loader': schemaLoader,
        }
      ]);
    });

    it('returns the root path', () => {
      const rootByProcess = process.cwd();
      expect(BabelInlineImportHelper.root).toBe(rootByProcess);
    });
  });

  describe('shouldBeInlined', () => {
      it('accepts a default extension', () => {
        const shouldIt = BabelInlineImportHelper.shouldBeInlined('example.raw');
        expect(shouldIt).toBeTruthy();
      });

      it('rejects a non default extension', () => {
        const shouldIt = BabelInlineImportHelper.shouldBeInlined('example.js');
        expect(shouldIt).toBeFalsy();
      });

      it('accepts a user defined extension', () => {
        const shouldIt = BabelInlineImportHelper.shouldBeInlined('example.python', ['.python']);
        expect(shouldIt).toBeTruthy();
      });

      it('rejects a non user defined extension', () => {
        const shouldIt = BabelInlineImportHelper.shouldBeInlined('example.raw', ['.python']);
        expect(shouldIt).toBeFalsy();
      });
  });

  describe('getContents', () => {
    it('throws error if no reference is specified', () => {
      expect(() => {
        BabelInlineImportHelper.getContents('./fixtures/raw/example.raw');
      }).toThrow(Error);
    });

    it('throws error if file does not exist', () => {
      expect(() => {
        BabelInlineImportHelper.getContents('non_existent.raw', __filename);
      }).toThrow(Error);
    });
  });

  describe('transformRelativeToRootPath', () => {
    it('returns a string', () => {
      const func = BabelInlineImportHelper.transformRelativeToRootPath('');
      expect(typeof func).toBe('string');
    });

    it('transforms given path relative root-path', () => {
      const rootPath = `${process.cwd()}/some/path`;
      const result = BabelInlineImportHelper.transformRelativeToRootPath('/some/path');
      expect(result).toBe(rootPath);
    });

    it('throws error if no string is passed', () => {
      expect(() => {
        BabelInlineImportHelper.transformRelativeToRootPath();
      }).toThrow(Error);
    });
  });


  describe('hasRoot', () => {
    it('returns a boolean', () => {
      const func = BabelInlineImportHelper.hasRoot();
      expect(typeof func).toBe('boolean');
    });

    it('check if the string has "/" at the beginning', () => {
      const withRoot = BabelInlineImportHelper.hasRoot('/path');
      const withoutRoot = BabelInlineImportHelper.hasRoot('./some/path');
      expect(withoutRoot).toBeFalsy();
      expect(withRoot).toBeTruthy();
    });

    it('returns false if no string passed', () => {
      const nothingPassed = BabelInlineImportHelper.hasRoot();
      const wrongTypePassed = BabelInlineImportHelper.hasRoot([]);
      expect(nothingPassed).toBeFalsy();
      expect(wrongTypePassed).toBeFalsy();
    });
  });
});
