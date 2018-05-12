---
title: 单例与接口的理解 基于实验的一次灵感
date: 2018-05-13 13:08:06
categories: 深度
tags:
- interface
- singleInstance
---

接口是什么呢？

> 维基百科：接口（英语：Interface），在JAVA编程语言中是一个抽象类型（Abstract Type），它被用来要求类(Class)必须实现指定的方法，使不同类的对象可以利用相同的界面进行沟通。接口通常以interface来宣告，它仅能包含方法签名（Method Signature）以及常量宣告（变量宣告包含了 static 及 final），一个接口不会包含方法的实现（仅有定义）。

接口是一个规范，是一个声明，一次偶然，让我初识接口的思想。

<!-- more -->

**简要描述**

实验内容：开发一个教学计划管理平台。

采用技术：`ThinkPHP`、`Bootstrap`、`MySQL`。

{% asset_img 0.png 效果图 %}

**单例模式**

因`ThinkPHP`中控制器调用`Service`时都需要去`new`一个`M`层的对象，所以准备体验一下单例模式，只有一个类的实例。

将构造函数设置为私有，防止外部`new`而失去了单例模式的意义；同时添加`getInstance`的公共静态方法，以供外部使用获取单例对象。

```php
<?php

namespace app\index\service;

use app\index\model\Teacher;

/**
 * 教师服务
 */
class TeacherService implements Service
{
    // 单例
    private static $instance;

    // 私有构造函数
    private function __construct()
    {
        
    }

    // 获取实例的方法
    public static function getInstance()
    {
        // 如果$instance不是本类的实例
        if(!(self::$instance instanceof self)) {
            // new一个本类的实例，并赋值给$instance
            self::$instance = new self();
        }
        return self::$instance;
    }
}
```

这样，我们在控制器中使用时，我们就可以通过`TeacherService::getInstance()`来获取一个`Service`的单例，类似于依赖注入。

```php
// 教师服务
protected $teacherService;
// 构造函数
function __construct(Request $request = null)
{
    // 调用父类构造函数
    parent::__construct($request);
    // 获取一个Service实例并赋值
    $this->teacherService = TeacherService::getInstance();
}
```
