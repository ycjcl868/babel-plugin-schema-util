import { schema } from 'schema-util';

export default (content: string) => {
  const res = JSON.stringify(schema(content));
  return res;
};
