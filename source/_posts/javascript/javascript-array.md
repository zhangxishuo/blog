---
title: JavaScript 数组
date: 2020-01-11 19:56:25
categories: JavaScript
tags:
  - 数组
  - 函数大全
---

# 概述

`JavaScript`的`Array`可以包含任意数据类型。

```javascript
var arr = [1, 'Hello World', false, null, undefined, {}, []];
```

# 属性

数组只有唯一的属性`length`，获取数组的长度。

## 清空数组

```javascript
var arr = [1, 2, 3, 4];
arr.length = 0;
```

```
arr -> []
```

## 扩大数组

```javascript
var arr = [1, 2, 3, 4];
arr.length = 8;
```

```
arr -> [1, 2, 3, 4, undefined, undefined, undefined, undefined]
```

## 越界

```javascript
var arr = [1, 2, 3, 4];
arr[5] = 6;
```

```
arr -> [1, 2, 3, 4, undefined, 6]
```

# 函数大全

## splice

从`start`开始删除`deleteCount`个元素，包括`start`索引位置的元素，并在该位置插入新元素`items`。

```javascript
splice(start: number, deleteCount: number, ...items: T[]): T[];
```
