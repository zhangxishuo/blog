---
title: hibernate_sequence 问题解决
date: 2018-01-07 12:55:51
tags:
	- hibernate
	- database
photos:
	- https://zhangxishuo.github.io/blog-images/2018/01/07/hibernate-sequence.jpg
---

`Hibernate`是一种`Java`语言下的对象关系映射解决方案。它为面向对象的领域模型到传统的关系型数据库的映射，提供了一个使用方便的框架。

<!-- more -->

**问题描述**

`SpringBoot`项目，在集成`Hibernate`生成数据表时，自动生成了一个额外的数据表`hibernate_sequence`。

**实体**

```java
package com.mengyunzhi.SpringBoot.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ProductCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String categoryName;

    private String categoryType;
}
```

**解决**

将主键生成的策略由`GenerationType.AUTO`修改为`GenerationType.IDENTITY`即可。

```java
package com.mengyunzhi.SpringBoot.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ProductCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String categoryName;

    private String categoryType;
}
```

**原因**

`@GeneratedValue(strategy = GenerationType.AUTO)`主键增长方式由数据库自动选择，当数据库选择`sequence`方式时，出现如上错误。

`@GeneratedValue(strategy = GenerationType.IDENTITY)` 要求数据库选择自增方式。

