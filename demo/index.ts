import cookNest, { EActionType } from '../src';
const originData = [
  {
    id: 1,
    a: 1,
    b: 2,
    children: [
      {
        id: 2,
        a: 2,
        b: 3,
        children: [
          {
            id: 4,
            a: 5,
            b: 6,
            children: []
          }
        ]
      },
      {
        id: 3,
        a: 3,
        b: 4,
        children: []
      }
    ]
  },
  {
    id: 5,
    a: 1,
    b: 2,
    children: [
      {
        id: 6,
        a: 2,
        b: 3,
        children: [
          {
            id: 7,
            a: 5,
            b: 6,
            children: []
          }
        ]
      },
      {
        id: 8,
        a: 3,
        b: 4,
        children: []
      }
    ]
  }
];
const newData1 = cookNest(
  originData,
  {
    type: EActionType.UPDATE,
    payload: {
      id: 1,
      data: {
        a: 10,
        b: 21,
        children: [{ id: 12, a: 12, b: 90, children: [] }]
      }
    }
  },
  {
    type: EActionType.INSERT,
    payload: {
      id: 5,
      data: {
        id: 13,
        a: 9,
        b: 8
      }
    }
  }
);
console.log(newData1, originData);
