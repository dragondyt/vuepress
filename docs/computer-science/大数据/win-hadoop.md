---
title: win10下hadoop学习
tags: hadoop
categories: 大数据
keywords:
  - hadoop
  - win10下hadoop学习
cover: >-
  https://cdn.jsdelivr.net/gh/dyt2015/hexo-image/hadoop-consulting-and-support.svg
date: '2021-04-24 05:55:57'
permalink: /computer-science/大数据/15d9e331.html
---

<!--more-->
# 下载
[下载hadoop](https://mirrors.tuna.tsinghua.edu.cn/apache/hadoop/common/hadoop-3.2.2/hadoop-3.2.2.tar.gz)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210423100922519.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM1MTM2OTM3,size_16,color_FFFFFF,t_70)
# 配置环境变量
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210423112247297.png)
path路径
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210423112306293.png)

# 配置文件

```hadoop-3.2.2\etc\hadoop\core-site.xml```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="configuration.xsl"?>
<configuration>
 <property>
        <name>fs.defaultFS</name>
        <value>hdfs://localhost:9000/</value>
 </property>
 <!-- 当前用户全设置成root -->
<property>
<name>hadoop.http.staticuser.user</name>
<value>root</value>
</property>

<!-- 不开启权限检查 -->
<property>
<name>dfs.permissions.enabled</name>
<value>false</value>
</property>

</configuration>

```

```hadoop-3.2.2\etc\hadoop\hdfs-site.xml```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="configuration.xsl"?>
<configuration>
    <property>
        <name>dfs.namenode.name.dir</name>
        <value>/d:/DevTools/hadoop-3.2.2/data/namenode</value>
        <description>NameNode directory for namespace and transaction logs storage.</description>
    </property>
    <property>
        <name>dfs.datanode.data.dir</name>
        <value>/d:/DevTools/hadoop-3.2.2/data/datanode</value>
        <description>DataNode directory</description>
    </property>
    <property>
        <name>dfs.replication</name>
        <value>2</value>
    </property>
</configuration>

```

```hadoop-3.2.2\etc\hadoop\mapred-site.xml```

```xml
<?xml version="1.0"?>
<?xml-stylesheet type="text/xsl" href="configuration.xsl"?>
<configuration>
    <property>
        <name>mapreduce.framework.name</name>
        <value>yarn</value>
    </property>
</configuration>

```
```hadoop-3.2.2\etc\hadoop\yarn-site.xml```
```xml
<?xml version="1.0"?>
<configuration>
<property>
        <name>yarn.nodemanager.aux-services</name>
        <value>mapreduce_shuffle</value>
    </property>
    <property>
        <name>yarn.nodemanager.aux-services.mapreduce_shuffle.class</name>
        <value>org.apache.hadoop.mapred.ShuffleHandler</value>
    </property>
    <property>
        <name>yarn.resourcemanager.hostname</name>
        <value>localhost</value>
    </property>
</configuration>
```

# 缺失文件
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210423101547514.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM1MTM2OTM3,size_16,color_FFFFFF,t_70)
[github下载](https://github.com/cdarlint/winutils/blob/master/hadoop-3.2.1)

# 遇到的问题
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210423110450309.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM1MTM2OTM3,size_16,color_FFFFFF,t_70)
>解决方案:安装[DirectX修复工具增强版](https://blog.csdn.net/vbcom/article/details/7245186)修复系统组件缺失,在C://Windows/System32目录下放置hadoop.dll

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210423110554561.png)
>  ps: 本来打算放弃的,win下的坑太多了,一顿瞎搞后终于成功了,还有点小问题

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210423122205257.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM1MTM2OTM3,size_16,color_FFFFFF,t_70)
## 节点未格式化

执行
```bash
hdfs namenode  -format
```
输入Y
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210423122919553.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM1MTM2OTM3,size_16,color_FFFFFF,t_70)

# 启动
执行命令或双击hadoop-3.2.2\sbin下的start-all.cmd

```bash
./start-all.cmd
```
## 访问8088

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210423123512815.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM1MTM2OTM3,size_16,color_FFFFFF,t_70)
## 访问9000

```It looks like you are making an HTTP request to a Hadoop IPC port. This is not the correct port for the web interface on this daemon.```

## 访问9870(hadoop新版本默认)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210423123926928.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM1MTM2OTM3,size_16,color_FFFFFF,t_70)


# 关闭

执行命令或双击hadoop-3.2.2\sbin下的stop-all.cmd

```bash
./stop-all.cmd
```

# 开发时修改权限

```core-site.xml```

```xml
<!-- 当前用户全设置成root -->
<property>
<name>hadoop.http.staticuser.user</name>
<value>root</value>
</property>

<!-- 不开启权限检查 -->
<property>
<name>dfs.permissions.enabled</name>
<value>false</value>
</property>

```

# 测试

## 环境准备
1. 使用图形界面添加等会用的的目录
2. 上传测试文件word,内容为

```bash
my name is abc, I can read abc.
this is a demo for mapreduce
I'm learning hadoop
hadoop and mapreduce
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210423142128838.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM1MTM2OTM3,size_16,color_FFFFFF,t_70)

## 代码编写

```pom.xml```

```xml
...
        <!-- hadoop 依赖 -->
        <dependency>
            <groupId>org.apache.hadoop</groupId>
            <artifactId>hadoop-hdfs</artifactId>
            <version>2.10.0</version>
        </dependency>
        <dependency>
            <groupId>org.apache.hadoop</groupId>
            <artifactId>hadoop-client</artifactId>
            <version>2.10.0</version>
        </dependency>

        <dependency>
            <groupId>org.apache.hadoop</groupId>
            <artifactId>hadoop-mapreduce-client-core</artifactId>
            <version>2.10.0</version>
        </dependency>
        <dependency>
            <groupId>org.apache.hadoop</groupId>
            <artifactId>hadoop-common</artifactId>
            <version>2.10.0</version>
        </dependency>
...
```

```java
package com.hadoop.demo.mapreduce;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import java.io.IOException;
public class MyJob {
    public static void main(String[] args) throws IOException, ClassNotFoundException, InterruptedException {
        //1 Configuration创建配置对象
        Configuration cfg=new Configuration();
        //2 getInstance创建job对象
        Job job = Job.getInstance(cfg);
        //3 set设置job,map,reduce类,map,reduce输出类
        job.setJarByClass(MyJob.class);
        job.setMapperClass(MyMap.class);
        job.setReducerClass(MyReduce.class);
        job.setOutputKeyClass(Text.class);
        job.setOutputValueClass(IntWritable.class);
        job.setMapOutputKeyClass(Text.class);
        job.setMapOutputValueClass(IntWritable.class);
        //4 FileInputFormat.addInputPath指定读取地址
        FileInputFormat.addInputPath(job,new Path("hdfs://localhost:9000/wc/input"));
        //5 FileOutputFormat.setOutputPath指定写入地址
        FileOutputFormat.setOutputPath(job,new Path("hdfs://localhost:9000/wc/output"));
        //6 waitForCompletion等待mapreduce完成
        boolean flag = job.waitForCompletion(true);
        //7 System.exit关闭系统
        System.exit(flag?0:1);
    }
}
```

```java
package com.hadoop.demo.mapreduce;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;
import java.io.IOException;
public class MyMap extends Mapper<LongWritable,Text,Text,IntWritable> {
    private IntWritable count=new IntWritable(1);
    private Text w=new Text();
    @Override
    protected void map(LongWritable key, Text value, Context context) throws IOException, InterruptedException {
        //1 toString字符串转换
        String line = value.toString();
        //2 split分割单词
        String[] words = line.split(" ");
        //3 for遍历
        for (String word:words){
            //4 set转换Text
            w.set(word);
            //5 write写入
            context.write(w,count);
        }
    }
}
```

```java
package com.hadoop.demo.mapreduce;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Reducer;
import java.io.IOException;
public class MyReduce extends Reducer<Text,IntWritable,Text,IntWritable> {
    private IntWritable i=new IntWritable();
    @Override
    protected void reduce(Text word, Iterable<IntWritable> values, Context context) throws IOException, InterruptedException {
        //1 int计数器
        int sum=0;
        //2 for遍历value
        for (IntWritable it:values){
            //3 get转换int
            sum +=it.get();
        }
        //4 set转换IntWritable
        i.set(sum);
        //5 write写入
        context.write(word,i);
    }
}
```
运行main方法就可以了

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210423143111343.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM1MTM2OTM3,size_16,color_FFFFFF,t_70)


## 运行结果
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210423142856778.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM1MTM2OTM3,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210423142925259.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM1MTM2OTM3,size_16,color_FFFFFF,t_70)

# 结语
个人感觉新版本对新手友好一下,HDFS WebUI 里可以上传文件,创建目录,2.7.1好像没有.
