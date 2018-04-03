---
title: doctrine php 中的 hibernate
date: 2018-04-01 16:23:26
tags: 
- php
- orm
---

对象关系映射，`Java`开发中我们使用`Hibernate`，将`Java Bean`映射为数据表，解决了团队协作中数据库同步的问题，同时也通过对象关系映射技术使我们对数据库的操作更加符合面向对象的思想。

而到了`php`中呢？作为世界上最好的语言，如何实现团队协作中数据库同步并更加利用面向对象的思想操作数据库呢？带着疑惑，我在`Google`上找到了答案。

<!-- more -->

**Google**

{% asset_img 0.png Google %}

遇到问题就找`Google`，我们还很平凡，我们遇到过的问题，肯定也有人遇到过，肯定有人给出优秀的解决方案。

`Stack Overflow`给出了这样的答案，`In my opinion the best ORM for PHP is Doctrine`。

跟着官方文档走，入一下门。[`Doctrine`官方文档](http://docs.doctrine-project.org/en/latest/)。

安装`Doctrine`，建议使用`Composer`，这是一个专门针对`php`的包管理工具，类似我们使用过的`npm`，这里有一篇非常详细的安装教程[Mac Install Composer](https://www.abeautifulsite.net/installing-composer-on-os-x)。

**安装**

新建一个空的项目，新建文件`composer.json`。

{% asset_img 1.png composer.json %}

声明一下需要`Composer`帮助我们管理的依赖。

```json
{
    "require": {
        "doctrine/orm": "2.4.*"
    },
    "autoload": {
        "psr-0": {"": "src/"}
    }
}
```

打开命令行，进入项目文件夹，运行`composer install`，`Composer`会自动为我们安装依赖。

{% asset_img 2.png composer install %}

除了安装依赖，我们还需要`bootstrap.php`和`cli-config.php`来配置和启动项目，比较简单，此处不再赘述。

**入门**

入门，当然是我们无比熟悉的教务管理系统啦！

{% asset_img 3.png ER图 %}

`Java`中，我们使用注解完成实体对象映射。而在`php`中，我们使用注释。其实注解就是注释。

**教师**

```php
<?php

namespace app\src\entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="teacher")
 */
class Teacher
{
    /**
     * @ORM\Id
     * @ORM\Column(name="id", type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="string")
     */
    protected $name;

    /**
     * @ORM\Column(type="string")
     */
    protected $username;

    /**
     * @ORM\Column(type="string")
     */
    protected $email;

    /**
     * @ORM\Column(type="boolean")
     */
    protected $sex;

    /**
     * @ORM\OneToMany(targetEntity="Klass", mappedBy="teacher")
     **/
    protected $klasses;

    public function getId() {
        return $this->id;
    }

    public function getName() {
        return $this->name;
    }

    public function getUsername() {
        return $this->username;
    }

    public function getEmail() {
        return $this->email;
    }

    public function getSex() {
        return $this->sex;
    }

    public function getKlasses() {
        return $this->klasses;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function setUsername($username) {
        $this->username = $username;
    }

    public function setEmail($email) {
        $this->email = $email;
    }

    public function setSex($sex) {
        $this->sex = $sex;
    }

    public function setKlasses($klasses) {
        $this->klasses = $klasses;
    }
}
```

**学生**

```php
<?php

namespace app\src\entity;

use Doctrine\ORM\Mapping as ORM;
use app\src\entity\Teacher;

/**
 * @ORM\Entity
 * @ORM\Table(name="klass")
 */
class Klass
{
    /**
     * @ORM\Id
     * @ORM\Column(name="id", type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="string")
     */
    protected $name;

    /**
     * @ORM\ManyToOne(targetEntity="Teacher", inversedBy="klasses")
     **/
    protected $teacher;

    public function getId() {
        return $this->id;
    }

    public function getName() {
        return $this->name;
    }

    public function getTeacher() {
        return $this->teacher;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function setTeacher($teacher) {
        $this->teacher = $teacher;
    }
}
```

**创建数据表**

与`hibernate`相同，此处有两种生成数据库的方式，`create`与`update`。

```bash
php vendor/bin/doctrine orm:schema-tool:create
php vendor/bin/doctrine orm:schema-tool:update
```

{% asset_img 4.png database %}

{% asset_img 5.png klass %}

{% asset_img 6.png teacher %}

