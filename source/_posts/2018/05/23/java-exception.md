---
title: Java 异常学习
date: 2018-05-23 09:44:13
categories: 编程语言
tags:
- java
- 异常
---

Exception

<!-- more -->

**简介**

所谓异常，

{% asset_img 0.png 异常结构 %}

看这个图，`Exception`有许多个异常的子类，包括`RuntimeException`和其他异常。

`RuntimeException`为什么如此特殊呢？举个例子大家就明白了。

**例子**

{% asset_img 1.png RuntimeException %}

{% asset_img 2.png IOException %}

可以看到，如果我们抛出一个`RuntimeException`，什么都没发生。如果抛出一个`IOException`，编译器会提示`Unhandled Exception`：未处理的异常。

`RuntimeException`属于非检查异常，一般都是运行时出错，就是我们的代码逻辑有问题：空指针异常、数组越界异常等等都属于运行异常。会由`JVM`自动抛出、自动捕获，我需要我们手动处理。手动处理也可以，如本系统自定义的`AccessDenyException`就属于运行时异常，也是可以进行`try ... catch`捕获并处理的。

{% asset_img 3.png CatchException %}

而除了`RuntimeException`的异常，称为检查异常，所以我们需要向上图一样进行`try ... catch`对异常进行捕获与处理。

**事务**

`Spring`中，我们会使用`@Transactional`注解来开启事务，默认情况下，如果抛出了未捕获的`RuntimeException`，就会进行数据回滚。