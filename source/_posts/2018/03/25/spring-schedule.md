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

## 添加配置

设置定时任务，我们肯定不能把时间固定，因为可能会随着业务需求的改变而变更，我们我们定时任务执行的时间需要去在我们项目的配置文件中去添加一条关于定时任务时间的配置，用于动态去配置我们定时任务的执行时间。

打开我们的配置文件`application.yml`，这里我们使用`yml`格式的配置文件，这种文件的好处是各个配置之间的层次清晰，比较易读。

```yaml
# 任务调度 cron表达式 设置定时任务
schedule:
  # 检定信息执行时间 [秒|分|小时|日期|月份|星期] 当前配置为每晚22点执行
  checkedInfo: 0 0 22 * * ?
```

## 组件声明

开启定时任务，需要声明一个任务调度的组件，能让`Spring`扫描到。

我们建立一个任务调度类`ScheduledTasks`，添加`@Component`注解，声明一个组件。

```java
@Component   // 声明一个能被Spring扫描到的组件
public class ScheduledTasks {

}
```

## 任务调度

接下来我们实现任务调度就很简单了。

声明变量，依赖注入，获取时间配置，定时执行任务。

```java
@Component   // 声明一个能被Spring扫描到的组件
public class ScheduledTasks {

    private static final Logger logger = Logger.getLogger(ScheduledTasks.class);  // 日志
    private final YunzhiConfig yunzhiConfig;                                      // 数据库配置
    private final InstrumentCheckedRateService instrumentCheckedRateService;      // 器具检定率
    private final CheckAbilityStatisticsService checkAbilityStatisticsService;    // 器具检定能力统计

    // 注入配置
    @Autowired
    public ScheduledTasks(YunzhiConfig yunzhiConfig, InstrumentCheckedRateService instrumentCheckedRateService, CheckAbilityStatisticsService checkAbilityStatisticsService) {
        this.yunzhiConfig = yunzhiConfig;
        this.instrumentCheckedRateService = instrumentCheckedRateService;
        this.checkAbilityStatisticsService = checkAbilityStatisticsService;
    }

    // 任务调度，从配置中获取cron表达式
    @Scheduled(cron = "${schedule.checkedInfo}")
    public void generateInstrumentCheckedInfo() {
        // 校验当前服务是否为主服务，只在主服务数据库中写入数据
        if (yunzhiConfig.getMaster().equals(true)) {

            logger.info("主服务开始执行操作");
            instrumentCheckedRateService.generateInstrumentCheckedInfo();
        }
    }
}
```

