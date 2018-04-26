---
title: Spring任务调度
date: 2018-03-25 11:36:27
categories: SpringBoot
tags:
- spring
- schedule
---

对于某些查询量较大且精确度不要求实时准确时，为了提升查询的效率，我们会单独建一张仅用于查询的表。

为了维护这张表，我们需要在服务器空闲时查询数据，然后存入表中，所以我们需要任务调度。

<!-- more -->

# 任务调度

任务调度，也就是我们平常所说的定时任务。

记得之前用到定时任务是在我们的课表日常推送上，在`linux`上设置一个定时任务，然后设置每天七点四十五去执行一个`shell`脚本，然后这个脚本再去触发我们课表系统中留出来的推送钉钉的接口，然后就完成每日课表信息推送。

其实`Spring`中，与此类似。

# 功能实现

## 官方文档

这是`Spring`官方文档中对定时任务的介绍及基本使用，[scheduling-tasks](https://spring.io/guides/gs/scheduling-tasks/)。

官方文档中只介绍了一种`fixedRate`的格式，每个多长时间执行以下这个任务，然而我们需要的是在每天的特定时间去更新数据，来维护我们的数据字典。

查阅资料发现，`Spring`其实是支持[`cron`表达式](https://zh.wikipedia.org/wiki/Cron)的。

## 开启任务调度

打开我们的`api`，找到我们声明`SpringBoot`应用程序的文件。

在该类的`@SpringBootApplication`的注解之下再添加一个注解`@EnableScheduling`，来告诉`Spring`，这个应用程序需要开启任务调度。

```java
@SpringBootApplication
@EnableScheduling  // 开启任务调度
public class ResourceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ResourceApplication.class, args);
    }
}
```

