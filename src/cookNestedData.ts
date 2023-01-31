import { EActionType, IActionItem, IActionPayload } from '.';
import { compose, flatten, revert, INestedObject, IFlattenObject } from './utils';
interface IActionFunc {
  (payload: IActionPayload, data: IFlattenObject[]): IFlattenObject[];
}
interface IMiddlewareFunc {
  (data: IFlattenObject[]): IFlattenObject[];
}
const handleDelete: IActionFunc = (payload, originData) => {
  const { id } = payload;
  return originData.reduce((acc, cur) => {
    const { id: _id, parentIdList } = cur;
    if (!parentIdList.includes(id) && _id !== id) {
      acc.push(cur);
    }
    return acc;
  }, [] as IFlattenObject[]);
};
const handleInsert: IActionFunc = (payload, originData) => {
  const { id, data } = payload;
  return originData.concat({
    parentId: id,
    ...data
  });
};
const handleSelect: IActionFunc = (payload, originData) => {
  const { id } = payload;
  return originData.reduce((acc, cur) => {
    const { id: _id, parentIdList } = cur;
    if (parentIdList.includes(id) || _id == id) {
      acc.push(cur);
    }
    return acc;
  }, [] as IFlattenObject[]);
};
const handleUpdate: IActionFunc = (payload, originData) => {
  const { id, data } = payload;
  return originData.reduce((acc, cur) => {
    const { id: _id, parentIdList } = cur;
    if (id === _id) {
      acc.push({
        ...cur,
        ...data
      });
    } else if (!parentIdList.includes(id)) {
      acc.push(cur);
    }
    return acc;
  }, [] as IFlattenObject[]);
};

export default function (originData: INestedObject[], ...actionData: IActionItem[]): INestedObject[] {
  const middleware: IMiddlewareFunc[] = actionData.map(data => {
    const { type, payload } = data;
    if (type === EActionType.DELETE) {
      return handleDelete.bind(null, payload);
    }
    if (type === EActionType.INSERT) {
      return handleInsert.bind(null, payload);
    }
    if (type === EActionType.SELECT) {
      return handleSelect.bind(null, payload);
    }
    if (type === EActionType.UPDATE) {
      return handleUpdate.bind(null, payload);
    }
    return handleSelect.bind(null, payload);
  });
  const func = compose(flatten, ...middleware, revert);
  return func(originData);
}
