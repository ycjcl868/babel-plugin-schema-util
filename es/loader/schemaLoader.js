import { schema } from 'schema-util';
export default (function (content, src) {
  try {
    var res = schema(content);
    return res;
  } catch (e) {
    e.message = "".concat(src, ": ").concat(e.message);
    console.log('---e-', e);
    throw e;
  }
});