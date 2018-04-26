---
title: ZanUI 小记
date: 2018-03-11 10:31:15
categories: 微信小程序
tags:
- UI
---

对于一个不了解设计的软件工程师来说，样式简直是世界上最难的东西。所以我们需要一款优雅的小程序`UI`框架。

[`WeUI`](https://github.com/tencent/weui-wxss)是腾讯官方推出的一款`UI`框架，很好。但是对于更加喜欢蓝色科技感的我来说，或许更喜欢[`ZanUI`](https://www.youzanyun.com/zanui/weapp#/zanui/base/icon)。

<!-- more -->

**错误记录**

起初，以为这个东西和`WeUI`一样，将样式引进来，然后再找想要的组件，复制粘贴。

然后就去`ZanUI`的[`Github仓库`](https://github.com/youzan/zanui-weapp)中找代码，给了作者一个`Star`，然后开始抄代码。

这是错误的做法，不得不感叹`ZanUI`自己还是太稚嫩，想实现一个如下的`tabBar`。

{% asset_img 0.png tabBar %}

然后去找`tab`相关的代码，发现引用了好多文件，然后将代码都抄过来，发现最后代码乱到没法看。

逻辑十分混乱，心有不甘地将代码删除，关掉小程序去写`Java`。心里还默默地抱怨`ZanUI`写的代码怎么这样。

**官方文档**

几日之后，重新打开`ZanUI`的仓库，仔细的阅读了一下`README`，发现这个东西原来是有官方文档的。

{% asset_img 1.png README %}

官方文档中就给出了`ZanUI`的正确打开方式。

{% asset_img 2.png document %}

原来`ZanUI`为我们提供的不是一个样式，而是一套模板`template`，我们需要什么可以直接引入。

例如，实现像上图一样的一个`tabBar`，我们的代码会想下面这样：

```html
<import src="/zanui/tab/index.wxml" />

<view class="container">
    <template is="zan-tab" data="{{ ...tabs, componentId: 'tabs' }}"></template>
</view>
```

```javascript
const { extend, Tab } = require('../../zanui/index');

Page(extend({}, Tab, {
    data: {
        tabs: {
            list: [{
                id: 'inFilm',
                title: '正在热映'
            }, {
                id: 'inCome',
                title: '即将上映'
            }],
            selectedId: 'inFilm'
        },
        movieList: []
    },

    handleZanTabChange(e) {
        var componentId = e.componentId;
        var selectedId = e.selectedId;

        this.setData({
            [`${componentId}.selectedId`]: selectedId
        });
    }
}));
```

