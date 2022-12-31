---
title: Android逆向工程：使用Apktool反编译小米便签
tags:
  - 安卓
  - 逆向工程
categories: 安卓
keywords:
  - 逆向工程
  - Apktool
  - 安卓
cover: 'https://cdn.jsdelivr.net/gh/dyt2015/hexo-image/5ed0bfdf3318a.jpg'
date: '2020-06-04 18:54:35'
permalink: /computer-science/reverse/aa3015f4.html
---

<!-- less -->
<!--more-->
## 记录一次安卓反编译过程
下周就要安卓课设，而我的课设作业是开发一个记事本，我发现我小米手机上的便签挺好的，于是想参考一下布局以及实现。

| 软件 | apktool | dex2jar | jd-jui |
| ---- | ---- | ---- | ---- |
| 版本 | 2.4.1 | 2.1 | 0.3.5|

### 准备工作
1. 获取小米便签
网上没有最新版下载，通过Es文件浏览器导出apk。
也可以通过mt浏览器，因为后面需要三个framework文件，Es浏览器和Re浏览器好像屏蔽了根目录，不能访问了。

2. 下载反编译相关工具
[菜鸟教程](https://www.runoob.com/w3cnote/android-tutorial-decompile-apk-get-code-resources.html)~~的[三个工具](http://static.runoob.com/download/%E5%8F%8D%E7%BC%96%E8%AF%91%E7%9B%B8%E5%85%B3%E7%9A%84%E4%B8%89%E4%B8%AA%E5%B7%A5%E5%85%B7.zip)~~,版本低,
3. 我使用的[三个工具](https://pan.baidu.com/s/1Lox7zYgUyfeB5H0i3aFxZw) 密码：7uyi
### 开始反编译
```bash
apktool.bat d base.apk
```
![Could not decode arsc file](https://i.loli.net/2020/06/04/ZXokSryDnmITE6L.png)

这个是由于apktool版本低导致的，下载[最新的](https://bitbucket.org/iBotPeaches/apktool/downloads/)重命名为apktool.jar替换即可
更新最新apktool后再次执行命令，还是失败，错误信息如下：
```bash
W: Could not decode attr value, using undecoded value instead: ns=miui, name=fabColor, value=0x7f06002e
W: Could not decode attr value, using undecoded value instead: ns=miui, name=fabColor, value=0x7f06002e
W: Could not decode attr value, using undecoded value instead: ns=android, name=id, value=0x100b0001
W: Could not decode attr value, using undecoded value instead: ns=miui, name=fabColor, value=0x7f06002e
W: Could not decode attr value, using undecoded value instead: ns=, name=layout, value=0x10030009
W: Could not decode attr value, using undecoded value instead: ns=, name=style, value=0x100d008f
W: Could not decode attr value, using undecoded value instead: ns=android, name=textAppearance, value=0x100d0058
W: Could not decode attr value, using undecoded value instead: ns=, name=style, value=0x100d008f
W: Could not decode attr value, using undecoded value instead: ns=android, name=textAppearance, value=0x100d008f
W: Could not decode attr value, using undecoded value instead: ns=miui, name=fabColor, value=0x7f06002e
W: Could not decode attr value, using undecoded value instead: ns=android, name=height, value=0x100a0003
W: Could not decode attr value, using undecoded value instead: ns=android, name=width, value=0x100a0003
I: Decoding values */* XMLs...
Can't find framework resources for package of id: 16. You must install proper framework files, see project website for more info.
```
查看一下反编译结果，发现资源以及提取出来，但是没有任何代码。
百度了最后一句话发现，有些应用需要提供额外框架，具体信息可以查看一下博文[Android逆向工程：解决针对小米系统应用，使用Apktool反编译失败问题！](https://blog.csdn.net/qq_34149335/article/details/85317554)

根据博文我提取了文章中提到的framework-res.apk，framework-ext-res.apk，miui.apk。
![文件列表](https://i.loli.net/2020/06/04/9Qt8rOxRElfmUTM.png)

执行一下命令安装：
```bash
apktool if framework-res.apk
apktool if framework-ext-res.apk
apktool if miui.apk
```
安装完成后发现缺少的16号对应framework-ext-res.apk

![缺少的16号](https://i.loli.net/2020/06/04/MKstzCTDjSVB6c3.png)

再次执行 apktool.bat d base.apk 后发现还有问题，提示缺少了id为18的框架文件

![缺少了id为18的框架文件](https://i.loli.net/2020/06/04/fpaNmjZBkUAHzbs.png) 

我有点头疼，我怎么知道18号是什么文件，于是尝试导入其他文件，搜索framework，找到了一个名为XiaomiServiceFramework.apk的文件，并进行安装；

![apktool if XiaomiServiceFramework.apk](https://i.loli.net/2020/06/04/aCuLyGkgOSX3zT4.png)

根据上图，我发现这个文件不是我们需要的，但它提供了一个信息：
++I: Decoding Shared Library (miui.system), pkgId: 18++
于是我去搜索system，经过筛选找到miuisystem.apk，进行安装，发现他就是我们需要的18号：

![apktool if miuisystem.apk](https://i.loli.net/2020/06/04/2KEGIgHxmPlTDpM.png)
再次反编译没有报错，查看文件发现Smali代码成功获取：

![成功截图](https://i.loli.net/2020/06/04/fvRbyGZUATC5u2S.png)

反编译到此结束，会smali语法的大佬已经可以阅读代码了，不会的可以使用[工具](https://pan.baidu.com/s/1Cr1E4Cw7d_djRkU92R12kQ)转java再阅读

### 使用dex2jar将dex转成jar
1. 将base.apk当成压缩包打开
2. 提取 classes.dex，classes2.dex
执行命令：
```bash
d2j-dex2jar.bat classes.dex
d2j-dex2jar.bat classes2.dex
```
![d2j-dex2jar.bat classes.dex](https://i.loli.net/2020/06/04/CdtOHRTqI81vZzk.png)
这个也是版本低导致的，下载[最新的](https://github.com/pxb1988/dex2jar/releases)就可以了
再次执行,出了新问题,我之前没遇到
```bash
C:\Users\dyt\Desktop\dex-tools-2.1-SNAPSHOT>d2j-dex2jar.bat classes.dex
dex2jar classes.dex -> .\classes-dex2jar.jar
Detail Error Information in File .\classes-error.zip
Please report this file to one of following link if possible (any one).
    https://sourceforge.net/p/dex2jar/tickets/
    https://bitbucket.org/pxb1988/dex2jar/issues
    https://github.com/pxb1988/dex2jar/issues [no attachment support, not preferred]
    dex2jar@googlegroups.com
```
换了一个多了后缀的2.1版本，成功解决，但我不记得在哪下的了

![成功获取jar](https://i.loli.net/2020/06/04/UGmDHJeog4KQwWX.png)

![获取的jar](https://i.loli.net/2020/06/04/HT1npCbsFUSjRqw.png)

### 使用jd-gui查看
这个就是软件使用了，跟一般软件没区别，将jar包拖到jd-gui.exe就行了，不多说，自己体会。

![使用截图](https://i.loli.net/2020/06/04/DfpVFCQrwcY16Ey.png)
