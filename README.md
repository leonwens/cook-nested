# cook-nested

cook-nested 是一个针对嵌套结构数据提供 `新增，删除，更新，选择`操作的库

## 使用方式

### 新增

```javascript
import cookNestedData from 'cook-nested';
cookNestedData(originData, {
  type: 'INSERT',
  id: '2',
  data: {}
});
```

### 删除

```javascript
import cookNestedData from 'cook-nested';
cookNestedData(originData, {
  type: 'DELETE',
  id: '1'
});
```

### 更新

```javascript
import cookNestedData from 'cook-nested';
cookNestedData(originData, {
  type: 'UPDATE',
  id: '1',
  data: {}
});
```

### 选择

```javascript
import cookNestedData from 'cook-nested';
cookNestedData(originData, {
  type: 'SELECT',
  id: '1'
});
```

### 多种操作

```javascript
// 删掉id=1的元素然后在id=2的元素后插入新的data
import cookNestedData from 'cook-nested';
cookNestedData(
  originData,
  {
    type: 'DELETE',
    id: '1'
  },
  {
    type: 'INSERT',
    id: '2',
    data: {}
  }
);
```
