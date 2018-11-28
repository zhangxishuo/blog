---
title: ubuntu-lock问题解决
date: 2018-11-29 00:55:22
tags:
- ubuntu
- lock
---

**Could not get lock /var/lib/dpkg/lock’ Error in Ubuntu**

```shell
ps aux | grep -i apt
```

```shell
sudo kill <process id>
```

```shell
sudo killall apt apt-get
```
