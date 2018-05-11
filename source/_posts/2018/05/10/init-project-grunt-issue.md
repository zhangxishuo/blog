---
title: 初始化AngularJS项目 Grunt 问题总结
date: 2018-05-10 18:56:18
categories: AngularJS
tags:
- Grunt
---

初始化计量办公自动化系统，`Grunt`虽然很强大，但是对于涉猎前端工具不深的我们来说，还是会遇到很多我们意想不到的问题的。

可能刚开始我们会被问题搞得焦头烂额，但是当我们真正理解问题的所在，去配置文件中查询关键字时，一切，原来是如此简单。

<!-- more -->

**初始化**

和我们正常的`AngularJS`项目一样，使用`Yeoman`来进行初始化。

```bash
# 创建文件夹
mkdir officeApp
# 进入文件夹
cd officeApp/
# 初始化项目
yo angular office
```

**启动**

项目初始化之后，使用我们的`grunt serve`命令来启动我们的前台。

```bash
# 启动
grunt serve
```

发现报了如下错误：

{% asset_img 0.png 错误信息 %}

*Fatal error: Port 35729 is already in use by another process.*

端口35729已经被另一个进行使用了，因为同时启动了两个`Grunt`任务，猜想可能是这两个任务使用到了同一个端口的进程。

打开`grunt`配置文件`Gruntfile.js`，`Command + F`。

{% asset_img 1.png 查询结果 %}

果然，两个`Grunt`启动了相同的端口，因为打开了`webApp`的前台，所以两个任务冲突，修改端口号为`35730`即解决。

**压缩问题**

项目初始化完成，然后开始添加模板，把一系列模板都放进来，同时设置配置，`grunt serve`没问题。

然后开始使用`grunt build`构建项目，然后使用`http-server`启动服务，确保项目没问题。

{% asset_img 2.png 构建项目 %}

{% asset_img 3.png 启动项目 %}

但是，打开浏览器，访问`http://127.0.0.1:8084/`，却发现什么都没有。

{% asset_img 4.png 错误页面 %}

打开控制台，发现报了一堆`404`的错误。

{% asset_img 5.png 控制台错误信息 %}

看错误信息：`config.js` 是 404，`__config`没有定义。

为了便于配置，本项目参照`webApp`，新建了一个`config.js`的配置文件，`__config`对象是我们在项目中的一个用于存放配置项的对象。

{% asset_img 6.png config %}

打开`dist`目录，发现该目录下并没有`config.js`文件。

{% asset_img 7.png dist %}

也就是说，我们建立的`config.js`在构建项目时被`Grunt`忽略了。

打开`Gruntfile.js`，发现`Grunt`有一个`copy`任务，注释中对此的描述是：**复制需要保存的文件到其他任务可以使用的地方。**

{% asset_img 8.png copy %}

简单的理解就是`grunt`把我们需要用到的配置的文件复制到我们`dist`目录下。

此处不光有`config.js`需要配置，我们需要用的都需要进行配置，下图就是我的配置项。

{% asset_img 9.png copy配置 %}

**样式问题**

再次构建项目，启动`http-server`，浏览器访问，发现样式与我们期待的样式不同。

{% asset_img 10.png 样式错误的页面 %}

打开控制台，发现是我们的`css`文件引用错误，下图为我们正常的样式界面。

{% asset_img 11.png 正常的样式 %}

打开`dist/styles`目录，去寻找我们想要的样式文件，发现文件名已经被更改为`style.xxxx.css`了。

{% asset_img 12.png dist %}

虽然这种改名在避免浏览器进行缓存时很有必要，但是我们并不想让我们引入的主题文件进行改名。

如果改名了，那我们在主题中引入的`style.css`就会`404`，所以我们要取消`grunt`对主题文件的重命名。

因为对`Grunt`不是很了解，所以只能尝试去配置文件中找关键字。`Command + F`，搜索`rename`。

{% asset_img 13.png rename %}

搜索`rename`直接搜索到了注释，我们看一下`filerev`任务的描述：因浏览器缓存原因而重命名的文件，这就是我们想要的。

修改其中对我们主题`css`文件的配置，这样就不会对我们的主题文件进行重命名。

**最终效果**

{% asset_img 14.png 最终效果 %}

**总结**

- 关键字很重要，对于一个我们并不了解的工具，如果我们不想去花费大量时间去学习它的话，只是想解决当前遇到的问题，关键字很有必要。毕竟，大牛们的注释都很精准，我们要做的，就是拿我们的关键字去查询相关注释，然后再做修改。

