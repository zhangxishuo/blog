---
title: Angular服务
date: 2018-11-26 16:08:18
tags: 
- Angular
- Service
---

**提供器**

```typescript
@NgModule({
    providers: [ProductService]
    providers: [{ provide: ProductService, useClass: ProductService }]
    providers: [{ provide: ProductService, useFactory: () => {} }]
})
export class AppModule {
}
```

`providers`告诉`Angular`，当需要注入`ProductService`类型的对象时，使用`ProductService`类进行实例化。

就像`SpringBoot`中，某实现类实现接口，为其添加`@Service`注解交给`Spring`托管，就可以注入一样。

`Angular`也是一个`IOC`容器。

**注入器**

```typescript
@Component({
    组件配置
})
export class ProductComponent {
    constructor(private productService: ProductService) {
    }
}
```
