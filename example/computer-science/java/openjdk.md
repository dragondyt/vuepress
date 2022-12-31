---
title: win10下编译以及调试openjdk
tags: java
categories: 教程
keywords:
  - openjdk
  - dyt
  - dragondyt
  - win10下编译以及调试openjdk
cover: 'https://cdn.jsdelivr.net/gh/dyt2015/hexo-image/s1200'
date: '2020-12-06 01:00:19'
permalink: /computer-science/java/9c47706b.html
---

<!--more-->
# 编译OpenJDK
## 安装编译环境
### 下载openjdk
[使用git clone](https://github.com/openjdk/jdk.git)（如果觉得慢可以使用[coding导入的jdk](https://e.coding.net/dyt2015/dyt2015.coding.me/jdk.git)）
### 安装编译工具
#### 1.win下Cygwin64环境编译
1. 安装Cygwin

    1. [官方下载](https://cygwin.com/setup-x86_64.exe)
    2. 设置下载源
       ![清华下载源](https://img-blog.csdnimg.cn/20201203150840602.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM1MTM2OTM3,size_16,color_FFFFFF,t_70)
2. 需要安装的包
   ![cywin64需要的包](https://img-blog.csdnimg.cn/20201205165420711.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM1MTM2OTM3,size_16,color_FFFFFF,t_70)
```
补充：需要安装autoconf
```
3. 编译选项&检查
```bash

bash ./configure -with-freetype=buddle -enable-debug -with-target-bits=64 -disable-ccache

```
4. 构建
```bash
make all
```

#### 2.win下linux环境编译（ubuntu ）
1. 需要安装的包
   |包名| 命令 |
   |--|:--|
   | gcc | sudo apt-get install build-essential|
   | FreeType|sudo apt-get install libfreetype6-dev|
   | CUPS| sudo apt-get install libcups2-dev|
   | X11| sudo apt-get install libx11-dev libxext-dev libxrender-dev libxrandr-dev libxtst-dev libxt-dev|
   | ALSA| sudo apt-get install libasound2-dev|
   | libffi| sudo apt-get install libffi-dev|
   | Autoconf| sudo apt-get install autoconf|
   | zip| sudo apt-get install zip|

2. 执行命令

```bash
 bash configure --enable-debug --with-jvm-variants=server --with-boot-jdk=/mnt/e/jdk/jdk-16 --with-tools-dir=/mnt/d/vs/2019/Community/VC/Auxiliary/Build
```

命令解释：

> --with-boot-jdk 如果找不到正确jdk，通过该命令可以手动指定
> jdk版本必须是编译版本的前一个版本
> jdk需与目标平台（win/linux）一致

> --with-tools-dir 指定编译工具目录，具体指向跟编译目标有关


> 注意：win下wsl默认编译win平台jdk，如果需要编译linux版本需要进行配置

![build.doc](https://img-blog.csdnimg.cn/20201205165257927.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM1MTM2OTM3,size_16,color_FFFFFF,t_70)



### 遇到的问题
win10sdk路径包含括号
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020120516024683.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201205160143993.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM1MTM2OTM3,size_16,color_FFFFFF,t_70)
解决：更换目录
移动到正常目录（`括号都不行，中文就更不行了`）
创建软连接
```bash
   mklink /J "C:\Program Files (x86)\Windows Kits" "D:\WindowsKits"
```
当路径包含空格，路径会被截断。（参数是路径也会，最好是不要有空格）
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201205160709798.png)
警告
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201205161925170.png)
解决：执行
```bash
make clean
```

错误
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201205162125789.png)
解决：手动删除jdk下build文件夹

### 编译成功
![编译成功](https://img-blog.csdnimg.cn/20201205164033789.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM1MTM2OTM3,size_16,color_FFFFFF,t_70)
验证jdk
![验证jdk](https://img-blog.csdnimg.cn/20201205164441839.png)


ps：如果可以的话直接在linux系统下编译，就不会有这么多的路径问题

# 调试OpenJDK
## 安装clion
### 因为我是java使用idea，clion和它属于一家公司产品，使用方式相似，上手容易。安装过程（略）
## 配置clion
根据编译jdk时使用的工具链，调试时应该选择对应的工具链，否则会出现debug无效的情况

上一篇文章我虽然使用wsl环境编译jdk，但编译工具使用的是vs工具链，所以调试选择vs工具链。
![vs工具链](https://img-blog.csdnimg.cn/20201206143258927.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM1MTM2OTM3,size_16,color_FFFFFF,t_70)
WSL配置
当成普通linux服务器进行连接即可，缺什么安装什么，一般是缺失cmake，gdb。
![wsl配置](https://img-blog.csdnimg.cn/20201206143449329.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM1MTM2OTM3,size_16,color_FFFFFF,t_70)


### 导入项目
1. 导入jdk目录
2. 创建CMakeLists.txt
   简易版（能调试，大量飘红，少部分代码能跳转）
```bash
#自己版本能用就行
cmake_minimum_required(VERSION 3.16)
project(jdk)
# 添加源文件
file(GLOB_RECURSE SOURCE_FILES "*.cpp" "*.hpp" "*.c" "*.h")
# 添加执行配置
add_executable(hotspot ${SOURCE_FILES})
```
复杂版（`emmmm，我不会cmake，百度到的都是少了，有大佬教我吗`）

```bash
#自己版本能用就行
cmake_minimum_required(VERSION 3.16)
project(jdk)
# 添加源文件
file(GLOB_RECURSE SOURCE_FILES "*.cpp" "*.hpp" "*.c" "*.h")
# 添加执行配置
add_executable(hotspot ${SOURCE_FILES})
```

3. 修改run configuration

    1. 修改executable为`build/windows-x86_64-server-fastdebug/jdk/bin/java.exe`
    2. 设置参数，测试用-version，可以换成类
    3. 删除build下before launch下的build
       ![配置结果](https://img-blog.csdnimg.cn/20201206143943220.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM1MTM2OTM3,size_16,color_FFFFFF,t_70)

## 运行结果
断点打在`src/java.base/share/native/libjli/java.c`中的JavaMain函数，对c/c++不是很了解，看调用帧，这个应该是入口，下面三个点进去是汇编代码。
![调试openjdk](https://img-blog.csdnimg.cn/20201206145118669.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM1MTM2OTM3,size_16,color_FFFFFF,t_70)
