---
title: Lua 语言基础
date: 2020-01-19 14:10:22
categories: Lua
tags:
  - 语言基础
  - 游戏
---
# 引言

## Lua 简介

`Lua`是一种轻量小巧的脚本语言，用标准`C`语言编写并以源代码形式开放，其设计目的是为了嵌入应用程序中，从而为应用程序提供灵活的扩展和定制功能。

其设计目的是为了嵌入应用程序中，从而为应用程序提供灵活的扩展和定制功能。

# 核心语法

## Hello World

```lua
print("Hello World!")
```

## 数据类型

`Lua`是动态类型语言，变量不要类型定义，只需要为变量赋值。

`Lua`中有`8`种基本类型。

### nil

`nil`类型表示未定义或空值，类似于`undefined`或`null`。

```lua
-- 变量undefined未定义
type(undefined)
-- 变量undefined的值为空
undefined = nil
type(undefined)
```

### boolean

`boolean`类型只有两个可选值`true`和`false`。

在`Lua`中，`false`和`nil`被视为`false`，其余的都是`true`，数字`0`也是`true`。

```lua
bool = true
type(bool)
```

### number

`Lua`默认只有一种`number`类型(`double`双精度类型)。

```lua
num = 3.1415926
type(num)
```

### string

字符串由一对单引号/双引号表示。

```lua
single = 'single quotation mark'
type(single)
double = "double quotation mark"
type(double)
```

也可以采用双方括号`[[]]`表示多行字符串。

```lua
text = [[
  我和我的祖国一刻也不能分割
  无论我走到哪里都流出一首赞歌
  我歌唱每一座高山我歌唱每一条河
  袅袅炊烟小小村落路上一道辙
]]
print(text)
```

字符串使用`..`运算符进行连接：

```lua
print('3.14' .. '15926')
```

使用`#`运算符来计算字符串的长度：

```lua
print(#'www.google.com')
```

### userdata

### function

### thread

### table
