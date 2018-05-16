---
title: 单例与接口的理解 基于实验的一次灵感
date: 2018-05-13 13:08:06
categories: 设计模式
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
class TeacherService
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

**单例的理解**

**接口**

当时写着写着就忘记了写`getInstance`方法，我们想要的是，所有的`Service`，都是单例的，使用的时候不用去`new`，直接在构造函数中获取实例即可。

为了解决这个问题，定义了一个`Service`接口，在接口中声明了`getInstance`方法，让每个`Service`类都去实现这个接口。

```php
<?php

namespace app\index\service;

interface Service
{
    public static function getInstance();
}
```

实现这个接口，如果有未实现的方法，我们智能的`IDE`会给我们错误提示。

如果使用接口仅仅停留在提示我们实现什么方法的话，那就太肤浅了。

**接口的理解**

通过`Service`接口，我们的控制器可以通过这个接口看到一个规范，所有实现`Service`接口的都有一个`getInstance`方法。

假如，控制器与`Service`不是一个人写的。

写控制器的人，不想看你错综复杂的代码实现，只想看看你的注释，那个方法是我应该用的，这个方法要什么参数，它返回给我什么参数。这不就是我们的接口吗？

同时，会想一下我们用的`Spring`中的`Service`，自动装配的并不是一个类，而是一个接口。

再去想想，其实我们的很多操作都与接口息息相关。

我们要一个接口，`Spring`给了我们一个符合这个接口的对象，所以我们实现`AOP`时，我们可以在执行某个方法之前或之后执行一些方法。

想想：如果让我们去实现`AOP`的实际原理，我们会怎么实现呢？

1.首先找到需要自动注入接口的地方。

2.找到这个接口的实现类，如果有多个实现类，去找符合其声明的实现类。

3.我们并不急着去`new`一个这个对象，我们先去看看有没有什么切面的组件声明，如果有，那我们就不能直接注入这个类的对象了，我们需要包装一下。

4.包装时，我们可以再建立一个类，将原方法都拷贝过来，然后再把我们切面的方法放在要切的方法之前或之后。

5.根据我们包装的类再去建立对象，再把这个对象注入进去，调用这个对象的方法时，就会执行我们切入的方法，以此完成`AOP`。
