---
title: 在docker安装elasticsearch
tags: docker
categories: 教程
keywords:
  - java
  - dyt
  - dragondyt
  - elasticsearch
  - docker
cover: 'https://cdn.jsdelivr.net/gh/dyt2015/hexo-image/232714-1587742034b2eb.jpg'
date: '2020-04-30 05:55:57'
permalink: /computer-science/containerized/29596f0c.html
---
<!--more-->
## 安装elasticsearch（简称es）
拉取镜像，该命令拉取最新版（不推荐，最新版意味着踩坑）
```bash
docker pull elasticsearch
```
可以指定版本，查看[elasticsearch](https://hub.docker.com/_/elasticsearch)版本
```bash
docker pull elasticsearch:x.x.x
```
![执行docker pull elasticsearch](https://i.loli.net/2020/04/28/xIZKV5LsY16oDyO.png)
尝试运行
```bash
docker run --name elasticsearch -d -e ES_JAVA_OPTS="-Xms512m -Xmx512m" -p 9200:9200 -p 9300:9300 elasticsearch:latest
```
![冲突](https://i.loli.net/2020/04/29/fPN3OEz4Qno12b9.png)
查看所有容器
```bash
docker ps -a
```
解决方法
1. 删除容器，重新创建
```bash
docker rm containerId|names
```
![image.png](https://i.loli.net/2020/04/29/lfQk1gjGZtdcmR6.png)
发送GET请求，校验是否安装成功
```bash
curl localhost:9200
```
![curl localhost:9200](https://i.loli.net/2020/04/29/fgC7MHy3569aQh2.png)
2. 重新启动之前的容器
```bash
docker start containerId|names
```
## 安装可视化控件（kibana，elasticsearch-head...）
这里选择kibana，颜值就是正义，在docker中安装kibana[官方文档](https://www.elastic.co/guide/cn/kibana/current/docker.html)

需要指定版本，该版本与es一致
```bash
docker pull docker.elastic.co/kibana/kibana:7.6.2
```
![ response from daemon: manifest for docker.elastic.co/kibana/kibana:latest not found: manifest unknown: manifest unknown
](https://i.loli.net/2020/04/29/ouJnFqjbIe2OYpX.png)
运行kibana
```bash
docker run --link elasticsearch:elasticsearch -p 5601:5601 --name kibana -d docker.elastic.co/kibana/kibana:7.6.2
```
测试
```bash
 curl localhost:5601/status
```
出现kibana server is not ready yet
查看日志
```bash
docker logs -f containerId
```
![image.png](https://i.loli.net/2020/04/29/jTbGMCAv8UVYpqP.png)
完了掉坑里了，下次再写了顺便补上docker-compose部署



