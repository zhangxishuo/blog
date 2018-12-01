---
title: Angular提供器
date: 2018-11-27 21:17:38
tags:
- Angular
- provide
---

# 工厂方法

```typescript
providers: [{ provide: ProductService, useFactory: () => { 返回一个对象实例 } }]
```

虽然名为工厂方法，但是创建出来的对象仍然是单例的。

工厂方法只在创建第一个需要注入的对象时被调用一次。

<!-- more -->

# 在工厂方法中使用依赖注入

```typescript
{
    provide: ProductService,
    useFactory: (logger: LoggerService) => {
    },
    deps: [LoggerService]   // 需要的依赖
}
```

# 值提供

```typescript
{ provide: "IS_DEV_ENV", useValue: { isDev: true } }
```
