---
title: >-
  使用yandex邮箱 ,报错Got bad greeting from SMTP host: smtp.yandex.com, port: 465,
  response: [EOF]
tags:
  - 踩坑
  - java
categories: Springboot
keywords:
  - java
  - springboot
  - mail
cover: 'https://t1.hxzdhn.com/uploads/tu/201706/9999/8bc6588842.png'
date: '2020-07-30 05:54:35'
permalink: /computer-science/java/c82dcf86.html
---

<!-- less -->
<!--more-->
## 前言
&emsp;&emsp;今天做了一个自动打卡工具，准备搭建邮件服务，反馈打卡结果。使用的邮箱是yandex mail。出现Got bad greeting from SMTP host: smtp.yandex.com, port: 465, response: [EOF]，记录一下。

### 邮箱准备
&emsp;&emsp;使用邮箱没有要求，支持smtp就行
#### 注册邮箱
[yandex mail注册地址](https://mail.yandex.com/)
#### 登录邮箱
&emsp;&emsp;登录邮箱后可能会提示开启smtp。

这里是官方提供打开smtp的文档，还记录了端口号。
![官方文档表示端口是465](https://img-blog.csdnimg.cn/20200729200238708.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM1MTM2OTM3,size_16,color_FFFFFF,t_70)
#### 启用smtp
&emsp;&emsp;邮箱首页右上角的齿轮>security> Email clients>
![smtp启用页面](https://img-blog.csdnimg.cn/20200729200832524.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM1MTM2OTM3,size_16,color_FFFFFF,t_70)
这里我使用outlook测试了连接，使用的端口是465，附连接成功图。

![连接成功图](https://img-blog.csdnimg.cn/20200729201400266.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM1MTM2OTM3,size_16,color_FFFFFF,t_70)
### 邮件协议
#### SMTP 协议
SMTP是一个相对简单的基于文本的协议。在其之上指定了一条消息的一个或多个接收者（在大多数情况下被确认是存在的），然后消息文本会被传输。可以很简单地通过telnet程序来测试一个SMTP服务器。提供了SSL加密的SMTP协议被称为SMTPS，SMTP使用TCP端口`25`，SMTPS使用TCP端口`465`

#### POP3 协议
POP3，全名为“Post Office Protocol - Version 3”，即“邮局协议版本3”。是TCP/IP协议族中的一员，由RFC1939 定义。本协议主要用于支持使用客户端远程管理在服务器上的电子邮件。提供了SSL加密的POP3协议被称为POP3S，POP3 默认端口`110`，POP3S默认端口`995`。
#### IMAP 协议
IMAP（Internet Mail Access Protocol）以前称作交互邮件访问协议（Interactive Mail Access Protocol），是一个应用层协议。IMAP是斯坦福大学在1986年开发的一种邮件获取协议。它的主要作用是邮件客户端可以通过这种协议从邮件服务器上获取邮件的信息，下载邮件等。当前的权威定义是RFC3501。IMAP协议运行在TCP/IP协议之上，使用的端口是`143`。它与POP3协议的主要区别是用户可以不用把所有的邮件全部下载，可以通过客户端直接对服务器上的邮件进行操作，提供了SSL加密的IMAP协议被称为IMAP S，POP3 默认端口`143`，POP3S默认端口`993`。


### 搭建步骤及简单使用
#### mail依赖
build.gradl文件
```bash
    compile group: 'org.springframework.boot', name: 'spring-boot-starter-mail', version: '2.3.2.RELEASE'
```
#### yml配置文件

```yaml
server:
  port: 80
logging:
  level:
    web: debug
spring:
  mail:
    default-encoding: UTF-8
    host: smtp.yandex.com
    username: xxx@xxx.xx
    password: 123456
    port: 25 #smtp协议使用25端口 
#    port: 465 #smtps使用465端口，不然报错。
    protocol: smtp #指定协议
    test-connection: true
    properties:
      mail:
        smtp:
          auth: true # 使用
          starttls: # 使用 SSL 安全协议，须如下配置
            enable: true
            required: true
```
#### java代码
##### MailService 接口文件
```java
public interface MailService {

    /**
     * 发送纯文本邮件
     * @param toAddr 收件人
     * @param title 标题
     * @param content 内容
     */
    void sendTextMail(String toAddr, String title, String content);

    /**
     * 发送 html 邮件
     * @param toAddr 收件人
     * @param title 标题
     * @param content 内容（HTML）
     */
    void sendHtmlMail(String toAddr, String title, String content);

    /**
     *  发送待附件的邮件
     * @param toAddr 收件人
     * @param title 标题
     * @param content 内容
     * @param filePath 附件地址
     */
    void sendAttachmentsMail(String toAddr, String title, String content, String filePath);

    /**
     *  发送文本中有静态资源（图片）的邮件
     * @param toAddr 收件人
     * @param title 标题
     * @param content 内容
     * @param rscPath 资源路径
     * @param rscId 资源id (可能有多个图片)
     */
    void sendInlineResourceMail(String toAddr, String title, String content, String rscPath, String rscId);

}
```
##### MailServiceImpl文件

```java
@Component
public class MailServiceImpl implements MailService {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final JavaMailSender mailSender;

    /**
     * 注入常量
     */

    @Value("${spring.mail.username}")
    private String from;

    public MailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    /**
     * 发送文本邮件
     *
     * @param toAddr  收件人
     * @param title   标题
     * @param content 内容
     */
    @Override
    public void sendTextMail(String toAddr, String title, String content) {
        // 纯文本邮件对象
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setTo(toAddr);
        message.setSubject(title);
        message.setText(content);

        try {
            mailSender.send(message);
            if (logger.isInfoEnabled()) {
                logger.info("Text邮件已经发送。");
            }
        } catch (Exception e) {
            logger.error("发送Text邮件时发生异常！", e);
        }

    }
    
    /**
     * 发送 html 邮件
     *
     * @param toAddr  收件人
     * @param title   标题
     * @param content 内容（HTML）
     */
    @Override
    public void sendHtmlMail(String toAddr, String title, String content) {
        // html 邮件对象
        MimeMessage message = mailSender.createMimeMessage();

        try {
            //true表示需要创建一个multipart message
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(from);
            helper.setTo(toAddr);
            helper.setSubject(title);
            helper.setText(content, true);

            mailSender.send(message);
            if (logger.isInfoEnabled()) {
                logger.info("html邮件发送成功");
            }
        } catch (MessagingException e) {
            logger.error("发送html邮件时发生异常！", e);
        }
    }


    /**
     * 发送待附件的邮件
     *
     * @param toAddr   收件人
     * @param title    标题
     * @param content  内容
     * @param filePath 附件地址
     */
    @Override
    public void sendAttachmentsMail(String toAddr, String title, String content, String filePath) {
        MimeMessage message = mailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(from);
            helper.setTo(toAddr);
            helper.setSubject(title);
            helper.setText(content, true);

            FileSystemResource file = new FileSystemResource(new File(filePath));
            String fileName = filePath.substring(filePath.lastIndexOf(File.separator));
            helper.addAttachment(fileName, file);
            mailSender.send(message);
            if (logger.isInfoEnabled()) {
                logger.info("带附件的邮件已经发送。");
            }
        } catch (MessagingException e) {
            logger.error("发送带附件的邮件时发生异常！", e);
        }
    }


    /**
     * 发送文本中有静态资源（图片）的邮件
     *
     * @param toAddr  收件人
     * @param title   标题
     * @param content 内容
     * @param rscPath 资源路径
     * @param rscId   资源id (可能有多个图片)
     */
    @Override
    public void sendInlineResourceMail(String toAddr, String title, String content, String rscPath, String rscId) {
        MimeMessage message = mailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(from);
            helper.setTo(toAddr);
            helper.setSubject(title);
            helper.setText(content, true);

            FileSystemResource res = new FileSystemResource(new File(rscPath));
            helper.addInline(rscId, res);

            mailSender.send(message);
            if (logger.isInfoEnabled()) {
                logger.info("嵌入静态资源的邮件已经发送。");
            }
        } catch (MessagingException e) {
            logger.error("发送嵌入静态资源的邮件时发生异常！", e);
        }
    }
}
```
##### 测试类

```java
@SpringBootTest
class ClockInApplicationTests {
    @Autowired
    MailService mailService;
    @Test
    void sendTextMail(){
        mailService.sendTextMail("vlnrjp92486@chacuo.net","单元测试","测试邮件发送");
    }
}
```
#### 运行结果
如标题所述，出现了异常
![异常图](https://img-blog.csdnimg.cn/20200729210357480.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM1MTM2OTM3,size_16,color_FFFFFF,t_70)
使用协议对应端口后发送成功，附图。
![单元测试通过](https://img-blog.csdnimg.cn/20200729211122279.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM1MTM2OTM3,size_16,color_FFFFFF,t_70)
### 结语
&emsp;&emsp;通过这个实践，我觉要写代码前还是要做很多准备，或者说我了解的东西不过全面。出错后百度异常信息怎么都找不到，想着哪里出错了，之前使用outlook连接测试通过，应该就是代码问题。后来看到很多人使用25端口发送，然后去百度端口才发现协议与端口不一致。所以我觉得写代码前的准备不充分或者知识储备不足，这个重要信息都不了解。
