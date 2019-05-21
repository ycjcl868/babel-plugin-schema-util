import * as fs from 'fs';
import * as path from 'path';
import rawLoader from './rawLoader';
import schemaLoader from './schemaLoader';
const requireResolve = require('require-resolve');

export default class BabelInlineImportHelper {
  static extensions = [
    '.raw',
    '.text',
    '.graphql',
    {
      name: '.schema',
      loader: schemaLoader,
    }
  ];
  static root = global.rootPath || process.cwd();
  // ['.a', '.b', '.c', { name: '.d', loader: (content) => `~~${content}~~` }]
  static shouldBeInlined(givenPath, extensions) {
    const accept = (typeof extensions === 'string')
      ? [extensions]
      : (extensions || BabelInlineImportHelper.extensions);

    for (const extension of accept) {
      const ext = extension.name || extension;
      if (givenPath.endsWith(ext)) {
        return true;
      }
    }

    return false;
  }
  // [ '', '', '' ]
  static getLoader(givenPath, extensions) {
    const curr = extensions.find(extension => {
      const ext = extension.name || extension;
      return givenPath.endsWith(ext)
    }) || {};
    return curr.loader || rawLoader;
  }

  static getContents(givenPath, reference, extensions) {
    if (!reference) {
      throw new Error('"reference" argument must be specified');
    }

    const mod = requireResolve(givenPath, path.resolve(reference));

    if (!mod || !mod.src) {
      throw new Error(`Path '${givenPath}' could not be found for '${reference}'`);
    }

    const rawContent = fs.readFileSync(mod.src).toString();
    const loader = BabelInlineImportHelper.getLoader(givenPath, extensions || BabelInlineImportHelper.extensions);
    const content = loader(rawContent);
    return content;
  }

  static transformRelativeToRootPath(path, rootPathSuffix) {
    if (this.hasRoot(path)) {
      const withoutRoot = path.substring(1, path.length);
      return `${BabelInlineImportHelper.root}${rootPathSuffix || ''}/${withoutRoot}`;
    }
    if (typeof path === 'string') {
      return path;
    }
    throw new Error('ERROR: No path passed');
  }

  static hasRoot(string) {
    if (typeof string !== 'string') {
      return false;
    }

    return string.substring(0, 1) === '/';
  }
}
