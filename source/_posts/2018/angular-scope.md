---
title: Angular作用域
date: 2018-11-27 19:15:11
tags:
- Angular
- scope
---

# 两个服务

`@Injectable`，声明该类交给`Angular`托管，才能使用`Angular`中的注入。

与`Spring`类似，想要`@Autowired`，必须是一个`Spring`组件。

<!-- more -->

`@Injectable`是依赖注入的核心，`@Component`等能注入的都是基于该装饰器。

```typescript
@Injectable()
export class StockService {
}

@Injectable()
export class AnotherStockService implements StockService {
}
```

# 模块级注入

```typescript
@NgModule({
    providers: [StockService]
})
export class AppModule {
}
```

# 组件级注入

```typescript
@Component({
    providers: [{ provide: StockService, useClass: AnotherStockService }]
})
export class StockComponent {
    constructor(private stockService: StockService) {
    }
}
```

**在某个注入器的范围内，服务是单例的。**
