---
title: Angular开发规范
date: 2018-11-26 15:44:33
tags: 
- Angular
---

**组件中的依赖注入使用private声明**

```typescript
constructor(private router: Router) {
}
```

**实体中的属性使用public声明**

```typescript
export class Stock {
    constructor(public id: number,
                public name: string,
                public price: number,
                public rating: number,
                public desc: string,
                public categories: Array<string>) {
    }
}
```
