---
title: Spring项目中对 Gateway 的理解
date: 2018-04-29 20:50:11
categories: SpringBoot
tags:
- java
---

开发中，为了让我们的应用程序更安全，我们会减少服务器对外暴露的端口号。对于前后台分离的项目来说，后台需要一个端口，前台需要开放一个端口，这就不是我们想要的，我们想实现的就是，一个应用程序，我们只对外暴露一个端口。

而`Spring`中的`Gateway`正好符合我们的要求，并且它还能让我们的应用更易于拓展，让我们来理解一下`Gateway`这个入口吧！

<!-- more -->

**官方文档**

做什么，当然要从[官方文档](https://cloud.spring.io/spring-cloud-gateway/single/spring-cloud-gateway.html)开始。

看完官方文档，我们应该能入门这个`Gateway`的思想，我们可以通过配置进行数据从一个源转发到另一个源，类似于路由，将某些路由转发到其他的路由上。

**整体架构**

新需求，新建了一个前台系统，为了实现跨系统间的登录功能，两个系统公用一个后台，所以我们对新系统的架构进行了类似原系统的设计。

{% asset_img 0.png 设计图 %}

后台还使用`webApp`原后台，开设8081端口，我们的新系统开设在8089端口上，所以我们需要进行映射。

使用`Gateway`，我们的`web`应用运行在8080端口，我们将前缀为`resource`的请求转发到我们后台的8081，将其余的请求转发到我们前台的8089端口。

之前，我们用到的网关时将数据从8080开设转发，将一些声明都写进了项目的`yml`配置文件中。

新的转发方式，第一时间想到的就是再建立一个网关的项目，然后在其中声明我们需要转发的配置项。但是如何深入想想，两个网关的功能都是相同的，只是转发的端口不同而已。

所以我们可以在运行`Gateway`的`jar`文件时为其添加参数，来使用一个入口，完成我们两个转发的功能。

**具体实现**

进入我们的前台项目，`grunt serve`启动项目，发现我们的项目运行在8089端口，打开浏览器，访问`http://localhost:8089/#!/login`，请求登录页。

{% asset_img 1.png 前台 %}

然后再进入后台目录，`mvn spring-boot:run`，运行后台项目。

**网关配置**

*打包项目*

进入我们的网关项目目录，运行`mvn package`打包项目。

{% asset_img 2.png 打包项目 %}

然后`maven`就会对我们的项目进行打包，会在`target`目录生成一个可执行的`jar`文件。

进入`target`目录，这个`gateway-0.0.1-SNAPSHOT-exec.jar`就是我们要运行的`jar`文件。

{% asset_img 3.png 可执行jar文件 %}

*运行项目*

```bash
java -jar gateway-0.0.1-SNAPSHOT-exec.jar --port=8088 --ui.url=http://localhost:8089
```

运行`java`项目，设置参数为运行在8088端口，同时将`ui`转发到`http://localhost:8089`。

*这里的参数是与我们的`spring`项目中的`application.yml`中的配置项对应的。*

```yaml
# 资源地址
zuul:
  routes:
    # 后台
    resource:
      path: /resource/**
      # 不排除任何header信息
      sensitiveHeaders:
      url: ${resource.url:http://localhost:8081}

    # 其它地址
    ui:
      path: /**
      url: ${ui.url:http://localhost:8083}

# 网关启动配置
server:
  port: ${port:8080}
```

这是网关配置文件中的部分内容，配置中的`${}`中的内容表示这是一个可以有外部运行时提供的参数，而我们看到这里有`resource.url`、`ui.url`、`port`等都是与我们传递的参数对应的。

我们加的参数`--port=8088`和`--ui.url=http://localhost:8089`就是用于`yml`文件中的配置替换，这样写，执行时，`spring`就把我们配置文件中的`port`改为8088，`ui.url`改为`http://localhost:8089`。

执行命令后，等待我们项目的启动。

命令行给出了我们如下提示：`Tomcat`在`http`8088端口上启动，同时`GatewayApplication`在多长时间启动。

{% asset_img 4.png 网关启动在8088端口 %}

打开浏览器，访问我们的`8088`端口。

{% asset_img 5.png 浏览器访问8088 %}

**理解**

我们访问的时`8088`端口，这是一个网关启动的端口。

当我们请求为`http://localhost:8088/#!/login`路由时，根据我们的`route.js`路由配置，去请求我们的相关资源配置。

{% asset_img 6.png 路由配置 %}

先不考虑`js`脚本，我们只考虑这个`login`的`html`页面，浏览器会发起一个`http://localhost:8088/views/login.html`的请求，这个请求被我们的网关处理了。

网关判断：是不是`resource`，如果是，转到我们的后台；如果不是，转到我们的前台`http://localhost:8089`。

然后这个`http://localhost:8088/views/login.html`的请求就转发到我们的`http://localhost:8089/views/login.html`了，然后浏览器就为我们呈现出一个完整的登陆页面。
