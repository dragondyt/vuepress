---
title: 'AAPT: error: resource android:attr/fontVariationSettings not found'
tags:
  - 吐槽
  - flutter
categories:
  - 踩坑
  - flutter
keywords:
  - 'AAPT: error: resource android:attr/fontVariationSettings not found'
cover: 'https://cdn.jsdelivr.net/gh/dyt2015/hexo-image/193708-15779650287a6a.jpg'
date: '2020-05-09 18:54:35'
permalink: /computer-science/flutter/74684463.html
---

<!--more-->
## 心累，每天都是“惊喜”，我太菜了
环境
开发工具 idea

```bash
flutter doctor

D:\Android\flutter\bin\flutter.bat doctor --verbose
[√] Flutter (Channel stable, v1.17.0, on Microsoft Windows [Version 10.0.18363.815], locale zh-CN.ts-CN)
    • Flutter version 1.17.0 at D:\Android\flutter
    • Framework revision e6b34c2b5c (7 days ago), 2020-05-02 11:39:18 -0700
    • Engine revision 540786dd51
    • Dart version 2.8.1

[√] Android toolchain - develop for Android devices (Android SDK version 29.0.3)
    • Android SDK at D:\Android\android-sdk
    • Platform android-29, build-tools 29.0.3
    • ANDROID_HOME = D:\Android\android-sdk
    • Java binary at: D:\Program Files\Java\jdk1.8.0_241\bin\java
    • Java version Java(TM) SE Runtime Environment (build 1.8.0_241-b07)
    • All Android licenses accepted.

[!] Android Studio (not installed)
    • Android Studio not found; download from https://developer.android.com/studio/index.html
      (or visit https://flutter.dev/docs/get-started/install/windows#android-setup for detailed instructions).

[√] Connected device (1 available)
    • Android SDK built for x86 • emulator-5554 • android-x86 • Android 8.0.0 (API 26) (emulator)

! Doctor found issues in 1 category.
Process finished with exit code 0
```

![Could not find androidx.lifecycle:lifecycle-common:2.2.0，lifecycle-common-java8:2.2.0，lifecycle-runtime:2.2.0，androidx.fragment:fragment:1.1.0.，androidx.annotation:annotation:1.1.0.](https://i.loli.net/2020/05/09/IzAgor5ceEDQtC6.png)
解决方法：
```groovy
allprojects {
    repositories {
        google() 
        jcenter()
        maven { url "https://maven.google.com" }//感觉google()是假的,这里我用了阿里云镜像，可能没同步吧。
    }
}
```

![.gradle\caches\transforms-1\files-1.1\core-1.1.0.aar\5b817d4a7e2a888884c999547cadccef\res\values\values.xml:7:5-70: AAPT: error: resource android:attr/fontVariationSettings not found.AAPT: error: resource android:attr/ttcIndex not found](https://i.loli.net/2020/05/09/xOWjZLbfkpzEA5a.png)

[stackoverflow上解决方法](https://stackoverflow.com/questions/49208772/error-resource-androidattr-fontvariationsettings-not-found)

解决方法：
修改app下的build.gradle文件
```groovy
android {
    compileSdkVersion 28
    defaultConfig {
	...
        targetSdkVersion 28
	...
    }
    ...
}
```

stackoverflow真是个好东西，可惜要翻墙，感想上面的大神。
不写了，累，这种资料网站都要墙，真是丧心病狂，什么时候能不用镜像站。构建工具再好，巧妇难为无米之炊啊





