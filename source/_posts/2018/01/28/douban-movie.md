---
title: 豆瓣电影
date: 2018-01-28 22:16:35
categories: 微信小程序
tags:
- 架构
---

小程序逐渐兴起，趁着自己有时间，学习了一下官方文档。做了一个自认为还算过得去的微信小程序。

目前小程序这方面可供参考的资料太少，所以乖乖打开官方文档，相信在阅读过`AngularJS`官方文档的情况下，看[小程序的中文文档](https://developers.weixin.qq.com/miniprogram/dev/framework/MINA.html)应该不是难事。

官方并没有推荐架构设计，只能依靠自己的经验，自己觉得怎么优雅怎么设计。每一位软件工程师，都是艺术家。在此分享一下自己开发此小程序的编码心得与架构设计。

<!-- more -->

**目录结构**

```
pages/            页面
service/          服务
components/       组件
filter/           过滤器
icons/            图标
images/           图片
zanui/            UI库
```

**职责划分**

我将`pages`设计为控制器，调用`service`中封装好的方法进行数据请求，数据请求时显示加载中，数据请求结束将数据交给组件，让组件去渲染。

`service`设计为我们的`M`层，提供各种数据方法，如在豆瓣电影项目中，我在`service`中对微信的数据请求`wx.request`进行了封装，并向外暴露获取新片榜，热片榜等方法。

`components`就是可以复用的`V`层，就是我们`AngularJS`中的指令，其他框架中的组件。我设计组件为，接受外部数据，对数据进行格式化显示。

`filter`作为过滤器，采用微信中供多页面共享的`WXScript`实现。(过滤器，不过输入与输出，其实就是一个全局共享的函数，类似过滤器)
