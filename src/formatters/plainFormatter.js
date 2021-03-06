import { isObject } from 'lodash';

const stringify = (value) => (isObject(value) ? '[complex value]' : value);

const propertyActions = {
  unchanged: (object, parrentName) => `Property '${parrentName}${object.key}' wasn't changed`,
  changed: (object, parrentName) => `Property '${parrentName}${object.key}' was updated. From ${stringify(object.oldValue)} to ${stringify(object.newValue)}`,
  added: (object, parrentName) => `Property '${parrentName}${object.key}' was added with value: ${stringify(object.value)}`,
  deleted: (object, parrentName) => `Property '${parrentName}${object.key}' was removed`,
  parrent: (object, parrentName, func) => `${func(object.children, `${parrentName}${object.key}.`)}`,
};

const render = (ast) => {
  const iter = (data, parrentName = '') => data.map((object) => propertyActions[object.type](object, parrentName, iter)).join('\n');
  return iter(ast);
};

export default render;
