---
title: AngularJS表单验证
date: 2018-03-04 16:59:33
categories: AngularJS
tags:
- javascript
- 表单
---

好记性不如烂笔头，以为自己完全记得表单验证怎么写，实际写时，却发现自己全忘记了。今天记录一下一个表单验证是怎么诞生的，方便日后参考。

<!-- more -->

# 问题描述

{% asset_img 0.png %}

添加器具一级类别的一个弹窗没有添加空校验，我们要实现的就是对这个表单进行空校验，避免用户误操作。

# 历史代码

根据页面路由，寻找`route.js`，找到对应的视图文件，找到了未添加验证的历史代码。

```html
<div class="inmodal">
    <div class="color-line"></div>
    <div class="modal-body">
        <ng-form class="form-horizontal">
            <div class="form-group">
                <label class="col-sm-2 control-label">请输入名称</label>
                <div class="col-sm-6">
                    <input type="text" class="form-control" ng-model="name">
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label">请输入拼音</label>
                <div class="col-sm-6">
                    <input type="text" class="form-control" ng-model="pinyin">
                </div>
            </div>
        </ng-form>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-default" ng-click="cancel()">取消</button>
        <button type="button" class="btn btn-primary" ng-click="ok()">确定</button>
    </div>
</div>
```

# 添加校验

## 添加名称

验证的第一步就是为我们的表单和相应的输入框添加名称，以便我们之后可以监听到某个表单中的某个输入框非法给用户显示一些提示信息。

```html
<div class="inmodal">
    <div class="color-line"></div>
    <div class="modal-body">
        <ng-form name="addEntityForm" class="form-horizontal">
            <div class="form-group">
                <label class="col-sm-2 control-label">请输入名称</label>
                <div class="col-sm-6">
                    <input name="name" type="text" class="form-control" ng-model="name">
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label">请输入拼音</label>
                <div class="col-sm-6">
                    <input name="pinyin" type="text" class="form-control" ng-model="pinyin">
                </div>
            </div>
        </ng-form>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-default" ng-click="cancel()">取消</button>
        <button type="button" class="btn btn-primary" ng-click="ok()">确定</button>
    </div>
</div>
```

这里，我将表单名设置为`addEntityForm`，输入框名分别设置为`name`与`pinyin`。

## 合法性

```html
<pre>{{ addEntityForm | json }}</pre>
```

插入这样一行代码，我们就可以利用`AngularJS`给我们提供的数据绑定，很直观地看出表单中的每个属性，以及表单中输入框的属性。

{% asset_img 1.png %}

## 输入校验

这里我们想完成空校验，所以在两个`input`中添加`required`，表示必填项。

```html
<div class="inmodal">
    <div class="color-line"></div>
    <div class="modal-body">
        <ng-form name="addEntityForm" class="form-horizontal">
            <div class="form-group">
                <label class="col-sm-2 control-label">请输入名称</label>
                <div class="col-sm-6">
                    <input name="name" type="text" class="form-control" ng-model="name" required>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label">请输入拼音</label>
                <div class="col-sm-6">
                    <input name="pinyin" type="text" class="form-control" ng-model="pinyin" required>
                </div>
            </div>
        </ng-form>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-default" ng-click="cancel()">取消</button>
        <button type="button" class="btn btn-primary" ng-click="ok()">确定</button>
    </div>
</div>
```

## 提示信息

仅有校验是不行的，我们需要在输入框不合法时提示用户哪个不合法？为什么不合法？

所以我们添加两行文字提示，当相应的输入框不合法时使用`ng-show`显示，这里`ng-show`中的表达式可以实际的业务场景进行填写。

这里我使用`$invalid`和`$touched`进行校验，当该输入框不合法，并且用户触摸过，则显示。

```html
<div class="inmodal">
    <div class="color-line"></div>
    <div class="modal-body">
        <ng-form name="addEntityForm" class="form-horizontal">
            <div class="form-group">
                <label class="col-sm-2 control-label">请输入名称</label>
                <div class="col-sm-6">
                    <input name="name" type="text" class="form-control" ng-model="name" required>
                    <div class="m-t-xs">
                        <span class="text-danger" ng-show="addEntityForm.name.$invalid && addEntityForm.name.$touched"><i class="fa fa-exclamation-triangle"></i> 名称不能为空</span>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label">请输入拼音</label>
                <div class="col-sm-6">
                    <input name="pinyin" type="text" class="form-control" ng-model="pinyin" required>
                    <div class="m-t-xs">
                        <span class="text-danger" ng-show="addEntityForm.pinyin.$invalid && addEntityForm.pinyin.$touched"><i class="fa fa-exclamation-triangle"></i> 拼音不能为空</span>
                    </div>
                </div>
            </div>
        </ng-form>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-default" ng-click="cancel()">取消</button>
        <button type="button" class="btn btn-primary" ng-click="ok()">确定</button>
    </div>
</div>
```

## 禁用提交按钮

此处是用`ng-click`指令实现的表单提交，所以我们需要在用户输入不合法时禁用掉这个提交按钮，我们使用`ng-disabled`指令。

为确定按钮添加`ng-disabled="addEntityForm.$invalid"`属性，这样在表单不合法时，就会禁用掉确定按钮。

# 最终效果

{% asset_img 2.png %}


