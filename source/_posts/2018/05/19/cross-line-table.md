---
title: 跨行表格实现
date: 2018-05-19 09:11:06
categories: 前端
tags:
- HTML
- 表格
---

{% asset_img 0.png 人员档案 %}

人员档案管理时，用到了跨行的表格显示，一个原型的设计从无到有，真正地明白了一个原型的从无到有，其实我们并不是作为一个软件工程师在做原型的，我们更多的会去思考用户的习惯。

原型的精髓，在于理解用户的需求并优雅地设计。

<!-- more -->

**设计**

一个人员可以有一个或多个资质，后台返回给我们的数据应该是一条如下格式的数据。

```json
{
    "id": 1,
    "name": "张三",
    "qualifierCertificate": [{
        "name": "资质1"
    }, {
        "name": "资质2"
    }, {
        "name": "资质3"
    }]
}
```

虽然为人员档案管理，但其实是对人员与资质进行管理。

在设计方面，假设一个人员拥有三个资质，如果我们显示三条数据，用户看到的就是如下的表格。

姓名 | 资格证 
:-: | :-: 
张三 | 资格证1 
张三 | 资格证2 

显然，这是不合理的，如果一个部门中有两个张三，虽然我们的应用程序知道，他们的`id`不同，这是两个人，但是用户不知道啊，用户会认为这是一个人，像下面这样。

id | 姓名 | 资格证 
:-: | :-: | :-: 
1 | 张三 | 资格证1 
1 | 张三 | 资格证2 
2 | 张三 | 资格证3 

用户是看不见`id`的，所以用户会认为这个一个人的三个资格证，所以我们不能这么设计。

{% asset_img 1.png 跨行表格 %}

所以，我们就要采取跨行表格的设计，即便有重名的，用户也能分出这是两个人员。

**最初的实现**

{% asset_img 2.png 嵌套表格 %}

采用大表格套小表格的策略，小表格在一个`td`中，通过`colspan="4"`让这个`td`占四列，然后再这个四列中套我们的小表格。

但是看效果我们会发现一个问题，大小表格的列对不齐，虽然可以通过手动设置每类占据的百分比来解决，但总觉得这样不太好，毕竟将一个表格拆分为两个表格，如果以后要修改的话，还需要去考虑样式的对齐问题。

```html
<table class="table">
    <thead>
        <tr class="info">
            <th>姓名</th>
            <th>出生年月</th>
            <th>电话</th>
            <th>资格证名称</th>
            <th>发证单位</th>
            <th>发证日期</th>
            <th>有效期至</th>
            <th>培训记录</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>张三</td>
            <td>1998/01/01</td>
            <td>12345678901</td>
            <td colspan="4">
                <table class="table">
                    <tbody>
                        <tr>
                            <td>xxx证</td>
                            <td>xxx机关</td>
                            <td>124</td>
                            <td>21412</td>
                        </tr>
                        <tr>
                            <td>xxx证</td>
                            <td>xxx机关</td>
                            <td>124</td>
                            <td>21412</td>
                        </tr>
                        <tr>
                            <td>xxx证</td>
                            <td>xxx机关</td>
                            <td>124</td>
                            <td>21412</td>
                        </tr>
                    </tbody>
                </table>
            </td>
            <td>查看</td>
        </tr>
        <tr>
            <td>张三</td>
            <td>1998/01/01</td>
            <td>12345678901</td>
            <td colspan="4">
                <table class="table">
                    <tbody>
                        <tr>
                            <td>xxx证</td>
                            <td>xxx机关</td>
                            <td>124</td>
                            <td>21412</td>
                        </tr>
                        <tr>
                            <td>xxx证</td>
                            <td>xxx机关</td>
                            <td>124</td>
                            <td>21412</td>
                        </tr>
                        <tr>
                            <td>xxx证</td>
                            <td>xxx机关</td>
                            <td>124</td>
                            <td>21412</td>
                        </tr>
                    </tbody>
                </table>
            </td>
            <td>查看</td>
        </tr>
    </tbody>
</table>
```

**跨行**

同样都是表格，我们把我们的`table`映射到我们的`Excel`中，如果我们在`Excel`中去实现这个表格效果，我们会怎么实现呢？

我们会右键，合并单元格。

{% asset_img 3.png Excel %}

{% asset_img 4.png 合并单元格 %}

我们在控制器中传一个测试数组过来。

```json
[{
    "id": 1,
    "name": "人员1",
    "qualifications": [{
        "name": "检定员证"
    }, {
        "name": "xxx证"
    }, {
        "name": "xxx证"
    }]
}, {
    "id": 2,
    "name": "人员2",
    "qualifications": [{
        "name": "xxx证"
    }, {
        "name": "xxx证"
    }]
}, {
    "id": 3,
    "name": "人员3",
    "qualifications": []
}]
```

一个人员需要一行空列，放添加按钮，另外几列循环添加人员资质，可编辑和删除。

所以现在人员1有3个资格证，所以就需要四行，4个`tr`。

{% asset_img 5.png 多列显示 %}

如果在`tr`中循环我们的人员资质的话，那我们的人员在哪里循环呢？这里我的处理是将人员的循环放到了`tbody`中。

```html
<table cellpadding="1" cellspacing="1" class="table table-bordered table-striped">
    <thead>
        <tr>
            <th>市</th>
            <th>区/县</th>
            <th>技术机构</th>
            <th>管理部门</th>
            <th>姓名</th>
            <th>出生年月</th>
            <th>学历</th>
            <th>职务</th>
            <th>职称</th>
            <th>从业年限</th>
            <th>电话</th>
            <th>资格证名称</th>
            <th>发证单位</th>
            <th>发证日期</th>
            <th>有效期至</th>
            <th>资格证操作</th>
        </tr>
    </thead>
    <tbody ng-repeat="user in users">
        <tr>
            <td>测试市</td>
            <td>测试区县</td>
            <td>技术机构</td>
            <td>管理部门</td>
            <td>{{ user.name }}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
                <a class="btn btn-xs btn-primary"><i class="fa fa-plus"></i>&nbsp;添加</a>
            </td>
        </tr>
        <tr ng-repeat="qualification in user.qualifications">
            <td>测试市</td>
            <td>测试区县</td>
            <td>技术机构</td>
            <td>管理部门</td>
            <td>{{ user.name }}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>{{ qualification.name }}</td>
            <td></td>
            <td></td>
            <td></td>
            <td>
                <a class="btn btn-xs btn-warning"><i class="fa fa-paste"></i>&nbsp;编辑</a>
                <a class="btn btn-xs btn-danger"><i class="fa fa-trash-o"></i>&nbsp;删除</a>
            </td>
        </tr>
    </tbody>
</table>
```

**tbody**

熟悉`H5`的人可能对`tbody`很陌生，在过去的标准中，一个表格中应该有三种标签`<thead>`、`<tbody>`和`<tfoot>`，分别表示表格头，表格内容，表格尾。

但是在`HTML5`标准中，废弃了一部分`<tbody>`的属性，同时`<thead>`、`<tbody>`和`<tfoot>`默认不会影响表格的布局，所以我们不常用这个标签。

所以我们采用循环`tbody`，并不会对我们的表格布局有影响。

**合并单元格**

{% asset_img 6.png 合并单元格 %}

数据有了，我们要做的就是合并单元格，我们要把人员的信息都合并。

其实合并单元格也很简单，我们只需把第一行设置为占据人员资质数量加1行即可，然后把剩下的几行中有关该列的数据删除，即可实现单元格合并。

代码如下：

```html
<tbody ng-repeat="user in users">
    <tr>
        <td rowspan="{{user.qualifications.length + 1}}">测试市</td>
        <td rowspan="{{user.qualifications.length + 1}}">测试区县</td>
        <td rowspan="{{user.qualifications.length + 1}}">技术机构</td>
        <td rowspan="{{user.qualifications.length + 1}}">管理部门</td>
        <td rowspan="{{user.qualifications.length + 1}}">{{ user.name }}</td>
        <td rowspan="{{user.qualifications.length + 1}}"></td>
        <td rowspan="{{user.qualifications.length + 1}}"></td>
        <td rowspan="{{user.qualifications.length + 1}}"></td>
        <td rowspan="{{user.qualifications.length + 1}}"></td>
        <td rowspan="{{user.qualifications.length + 1}}"></td>
        <td rowspan="{{user.qualifications.length + 1}}"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>
            <a class="btn btn-xs btn-primary"><i class="fa fa-plus"></i>&nbsp;添加</a>
        </td>
    </tr>
    <tr ng-repeat="qualification in user.qualifications">
        <td>{{ qualification.name }}</td>
        <td></td>
        <td></td>
        <td></td>
        <td>
            <a class="btn btn-xs btn-warning"><i class="fa fa-paste"></i>&nbsp;编辑</a>
            <a class="btn btn-xs btn-danger"><i class="fa fa-trash-o"></i>&nbsp;删除</a>
        </td>
    </tr>
</tbody>
```

{% asset_img 7.png 合并后的效果 %}

**总结**

程序并不是脱离现实的，用户的需求总是实际工作或生活中有某些特定的需要才提出来的，所以在设计时我们要以用户的习惯思考，结合现实。有些我们通过固有思想无法去实现的东西，我们可以站在用户的角度，看看用户的日常工作中是怎么完成这个任务的，明白了这个，我们的程序不过是把这个完成过程交给了计算机。

做软件，不能脱离现实，如果脱离现实，我们的思想就会被禁锢在某些层面中，就像我们的面向对象一样，为什么面向对象可以让我们的程序设计更加容易。不要以一个`C++`老师的标准思想去面向对象，回想起我当初学习面向对象，老师完全是用面向类的思想去讲解的，总是我们应该建一个什么类什么类的，完全没有和现实中的对象结合起来。

因为我们设计面向对象的程序时，我们可以根据我们现实中的对象关系作为参考，我们直接把现实中的思想拿到我们的程序设计中，这正是面向对象的伟大之处。
