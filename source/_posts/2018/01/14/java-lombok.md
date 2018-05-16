---
title: lombok 配置
date: 2018-01-14 13:51:26
categories: 项目优化
tags:
	- java
	- lombok
---

`Java`项目中，每一个`Bean`都需要设置`Set`、`Get`等方法，虽然我们可以通过`IDE`为我们提供的快捷键进行快速生成，但是这会让我们的代码显得很臃肿。

不光是这样，当建立一个实体时，我们发现返回到前台的数据是一个空的对象，找了半天才发现原因竟然是没有`Get`方法，因为每一个`Java Bean`的属性都是私有的，序列化为`json`时，我们需要使用实体中的`Get`方法来获取实体中的私有属性，进而进行序列化。

有没有一种方法可以消除这些臃肿的代码并且可以很简单地达到我们想使用`Set`、`Get`等方法的目的呢？答案就是`Lombok`。

<!-- more -->

**添加maven依赖**

```xml
<dependency>
	<groupId>org.projectlombok</groupId>
	<artifactId>lombok</artifactId>
</dependency>
```

**简化实体**

```java
package com.mengyunzhi.SpringBoot.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
public class ProductCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;                   // 商品类目id

    private String categoryName;       // 类目名称

    private String categoryType;       // 类目编号

    @CreationTimestamp
    private Date createTime;           // 创建时间

    @UpdateTimestamp
    private Date updateTime;           // 更新时间
}
```

看起来是不是很简洁呢？

**安装插件**

点击左上角的`IntelliJ IDEA`，选择`Preferences`。

{% asset_img 0.png Preferences %}

选择`Plugins`，点击`Browse repositories`，搜索`lombok`，点击`Install`即可。

{% asset_img 1.png Install %}

