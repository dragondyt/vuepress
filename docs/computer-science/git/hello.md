---
title: 'git push时出现error: src refspec master does not match any解决办法'
tags: 踩坑
categories: 教程
keywords:
  - git
  - dyt
  - dragondyt
  - 'git push: src refspec master does not match any'
cover: 'https://cdn.jsdelivr.net/gh/dyt2015/hexo-image/800.jfif'
date: '2020-04-24 05:55:57'
permalink: /computer-science/git/e1510a47.html
---


<!--more-->
# git push时出现error: src refspec master does not match any解决办法.
网传原因：
 　　++这是由于存储库仍然为空引起的。存储库中没有提交，因此没有 master分支可推送到服务器。++
网传解决方法：

```bash
touch README
git add README 
git commit -m 'first commit'
git push origin master
```

可能是我垃圾吧，git命令写错了，反正没能解决，如图：

![image.png](https://i.loli.net/2020/04/23/osObPwKIW1Nx6J2.png)

```bash
git show-ref
```
d601ecc070daac5320959ee8c47bca013a113256 refs/remotes/origin/master

终于换一种错误了，留下了无知的眼泪

```bash
git push origin HEAD:master
```

![image.png](https://i.loli.net/2020/04/23/PpUtIhJ1OxQz3yM.png)

一番调整，我终于成功了，失败30次，o(╥﹏╥)o

![image.png](https://i.loli.net/2020/04/23/3sLjPmV9KCNXDq5.png)

去目标仓库查看，发现有一个目录文件全没了(╥╯^╰╥)
我有修改一番，好刺激啊，这就是删库跑路的快感吗!

![image.png](https://i.loli.net/2020/04/23/GL8siwSMr4dZJAW.png)

这就是之前消失的文件，现在回来了，其他的又消失了。。。
经过检查，该文件夹下面含有 .git 文件夹，无法被追踪，删除即可，到此结束了，节后逃生的感觉。
总结：出现这个错误不一定是因为空目录，也可能是因为远程分支不在！！！

