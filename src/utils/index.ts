type PropertyName = string | number | symbol;
export type INestedObject = Record<string, any> & {
  id: string | number;
  children: INestedObject[];
};
export type IFlattenObject = INestedObject & {
  parentId: string | number | null;
  parentIdList: Array<string | number>;
};
export function omit<T extends Record<PropertyName, any>, K extends PropertyName[]>(
  obj: T,
  ...uselessKeyList: K
): Pick<T, Exclude<keyof T, K[number]>> {
  return Object.keys(obj).reduce((acc: T, key) => {
    if (uselessKeyList.includes(key)) {
      return acc;
    } else {
      return {
        ...acc,
        [key]: obj[key]
      };
    }
  }, {} as T);
}

export function flatten(data: INestedObject[]): IFlattenObject[] {
  const queue: Array<{
    pId: string | null;
    pIdList: string[];
    data?: INestedObject[];
  }> = [{ pId: null, pIdList: [], data }];
  const res: IFlattenObject[] = [];
  while (queue.length > 0) {
    const n = queue.length;
    for (let i = 0; i < n; i++) {
      const { pId, data, pIdList } = queue.shift()!;
      if (data && data.length > 0) {
        data.forEach(item => {
          res.push({
            ...item,
            ...{
              parentId: pId,
              parentIdList: pIdList,
              children: []
            }
          });
          queue.push({
            pId: item.id as string,
            pIdList: pIdList.concat(item.id as string),
            data: item.children
          });
        });
      }
    }
  }
  return res;
}

export function revert(list: IFlattenObject[]): INestedObject[] {
  const res: INestedObject[] = [];
  const mapping: Record<string, IFlattenObject> = list.reduce((acc: Record<string, IFlattenObject>, cur: IFlattenObject) => {
    acc[cur.key!] = cur;
    return acc;
  }, {});
  for (const item of Object.values(mapping)) {
    const { parentId } = item;
    const schemaData = omit(item, 'parentId', 'parentIdList') as INestedObject;
    if (!parentId) {
      res.push(schemaData);
    } else {
      const parent = mapping[parentId];
      parent.children = parent.children || [];
      parent.children.push(schemaData);
    }
  }
  return res;
}

export function compose(...funcs: Function[]) {
  if (funcs.length === 0) {
    return <T>(arg: T) => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(
    (a, b) =>
      (...args: any) =>
        a(b(...args))
  );
}
