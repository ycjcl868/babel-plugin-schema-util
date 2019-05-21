import { join } from 'path';
import pluginTester from 'babel-plugin-tester';
import BabelInlineImportPlugin from '../lib';


pluginTester({
  pluginName: 'babel.inline.import',
  plugin: BabelInlineImportPlugin,
  pluginOptions: {
    extensions: [
      ".py",
      ".raw"
    ]
  },
  fixtures: join(__dirname, 'fixtures/raw'),
});


pluginTester({
  pluginName: 'babel.inline.import',
  plugin: BabelInlineImportPlugin,
  fixtures: join(__dirname, 'fixtures/schema'),
});
