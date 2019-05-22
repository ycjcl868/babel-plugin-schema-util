import { schema } from 'schema-util';

export default (content: string, src: string) => {
  try {
    const res = schema(content);
    return res;
  } catch (e) {
    e.message = `${src}: ${e.message}`
    throw e;
  }
};
