---
title: gateway配合nacos SERVICE_UNAVAILABLE “Unable to find instance for xxx
tags:
  - java
  - 微服务
categories: java
keywords:
  - nacos1.4.1
  - gateway3.0.2
  - springcloud2020
cover: 'https://proprikol.ru/wp-content/uploads/2020/07/kartinki-zimnij-vecher-27.jpg'
date: '2021-05-15 01:34:35'
permalink: /computer-science/java/fd72446f.html
---

<!--more-->

# gateway配合nacos 找不到服务的问题

```
gateway版本: 3.0.2
```

```
nacos版本: 1.4.1
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/2021051417171856.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM1MTM2OTM3,size_16,color_FFFFFF,t_70)


![在这里插入图片描述](https://img-blog.csdnimg.cn/20210514171412544.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM1MTM2OTM3,size_16,color_FFFFFF,t_70)
gateway出错了,没有任何异常信息,增加自定义异常处理后,通过日志发现一个关键词`NoLoadBalancer`,突然就想到Spring Cloud2020移除了Ribbon,加入依赖后成功解决问题.

```xml
<dependency>
   <groupId>org.springframework.cloud</groupId>
   <artifactId>spring-cloud-loadbalancer</artifactId>
   <version>对应版本</version>
</dependency>
```


