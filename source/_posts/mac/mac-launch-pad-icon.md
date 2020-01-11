---
title: Mac LaunchPad 残留图标删除方案
date: 2020-01-11 22:57:26
categories: Mac
tags:
  - 最佳实践
---

```shell
# 定位到com.apple.dock.launchpad
cd /private/var/folders/_7/_64h39ss70sf1pgjphn1ld400000gn/0/com.apple.dock.launchpad/db
```

{% asset_img db.jpg %}

```shell
# 根据应用名删除数据
sqlite3 db "delete from apps where title='app-name';" && killall Dock
```
