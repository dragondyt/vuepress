---
title: 一个bug
tags: 安卓
categories: bug
keywords:
  - java
  - dyt
  - dragondyt
  - BigDecimal
  - Integer
  - java.math.BigDecimal cannot be cast to java.lang.Integer
cover: 'https://cdn.jsdelivr.net/gh/dyt2015/hexo-image/800'
date: '2020-03-15 05:55:57'
permalink: /computer-science/java/49af668f.html
---

<!-- less -->
<!--more-->
## 一个让人烦躁的bug
&emsp;&emsp;今天写代码，一个简单的查询，总是出现++java.math.BigDecimal cannot be cast to java.lang.Integer++，项目是热部署的，以为是缓存，清除一遍又一遍还是无效。我试着用toString方法转字符串然后转int，结果出现了异常，但是注释掉的代码可以运行

![转换异常](https://i.loli.net/2020/03/14/2zCrRnfDEuaKFlt.png)，看不出哪里有异常转换，我也有点好奇Map<String, Integer>是怎么变成Map<String, BigDecimal>的。
![类型变化](https://i.loli.net/2020/03/14/GvNLp9oMh2qQsmy.png)
我手动写了一个Map<String, Integer>尝试放入一个BigDecimal，结果编译失败了！

![编译失败](https://i.loli.net/2020/03/14/ETqiF5OfxA4edSN.png)

查询使用了mybatis3.2.6框架（不是plus）， resultType="java.util.Map"
下面是sql
```sql
select MONTH(日期) as month,SUM(amount) AS total FROM `销售` where YEAR(日期) = #{year} GROUP BY MONTH(日期);
```


