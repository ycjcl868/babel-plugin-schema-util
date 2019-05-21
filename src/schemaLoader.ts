import { schema } from 'schema-util';

export default (content: string, src: string) => {
  try {
    const res = JSON.stringify(schema(content))
      .replace(/\u2028/g, '\\u2028')
      .replace(/\u2029/g, '\\u2029');
    return res;
  } catch (e) {
    e.message = `${src}: ${e.message}`
    throw e;
  }
};
