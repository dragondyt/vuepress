---
title: 'Failed to resolve: androidx.appcompat:appcompat:1.1.0'
tags:
  - 吐槽
  - 安卓
categories:
  - 踩坑
  - 安卓
keywords:
  - 'Failed to resolve: androidx.appcompat:appcompat:1.1.0'
cover: 'https://cdn.jsdelivr.net/gh/dyt2015/hexo-image/110823-14930033035b6a.jpg'
date: '2020-05-09 18:54:35'
permalink: /computer-science/java/android/c4877271.html
---

<!--more-->
## 安卓实验--内容提供器
### 日常踩雷
	新建了一个空activity项目

```bash
ERROR: Failed to resolve: androidx.appcompat:appcompat:1.1.0
ERROR: Failed to resolve: androidx.test.ext:junit:1.1.1
ERROR: Failed to resolve: androidx.test.espresso:espresso-core:3.2.0
ERROR: Failed to resolve: androidx.constraintlayout:constraintlayout:1.1.3
```

![init.gradle](https://i.loli.net/2020/05/10/BSgdvitcaTNJA3C.png)

感觉有毒，成功了，依赖还是未解决，清除缓存重启无效！
![有毒](https://i.loli.net/2020/05/10/tSw1UImsTEH6aqR.png)

删除init.gradle后,成功解决，好吧，估计问题在镜像仓库，也可能是这个配置问题，以后还是老老实实用官方源吧，虽然费时间。但出错率低。
    　　这是我的init.gradle，路径为C:\\Users\\{username}\\.gradle，建立这个文件的目的是加速依赖下载，现在看来反而是累赘，以前用着正常，现在不能用了也不知道是什么原因。

```groovy
allprojects{
    repositories {
        def ALIYUN_REPOSITORY_URL = 'http://maven.aliyun.com/nexus/content/groups/public'
        def ALIYUN_JCENTER_URL = 'http://maven.aliyun.com/nexus/content/repositories/jcenter'
        def ALIYUN_GOOGLE_URL = 'https://maven.aliyun.com/repository/google/'
        def ALIYUN_GRADLE_PLUGIN_URL = 'https://maven.aliyun.com/repository/gradle-plugin/'
        all { ArtifactRepository repo ->
            if(repo instanceof MavenArtifactRepository){
                def url = repo.url.toString()
                if (url.startsWith('https://repo1.maven.org/maven2')) {
                    project.logger.lifecycle "Repository ${repo.url} replaced by $ALIYUN_REPOSITORY_URL."
                    remove repo
                }
                if (url.startsWith('https://jcenter.bintray.com/')) {
                    project.logger.lifecycle "Repository ${repo.url} replaced by $ALIYUN_JCENTER_URL."
                    remove repo
                }
if (url.startsWith('https://dl.google.com/dl/android/maven2/')) {
                    project.logger.lifecycle "Repository ${repo.url} replaced by $ALIYUN_GOOGLE_URL."
                    remove repo
                }
                if (url.startsWith('https://plugins.gradle.org/m2/')) {
                    project.logger.lifecycle "Repository ${repo.url} replaced by $ALIYUN_GRADLE_PLUGIN_URL."
                    remove repo
                }
            }
        }
        maven {
                url ALIYUN_REPOSITORY_URL
                url ALIYUN_JCENTER_URL
	url ALIYUN_GOOGLE_URL 
 	url ALIYUN_GRADLE_PLUGIN_URL 

        }
    }
}
```

![image.png](https://i.loli.net/2020/05/10/6Az2DZ4cuX35WGR.png)

### 问题解决了，开工干活
#### 实验目的
1、掌握运行时权限使用
2、掌握访问其他应用程序的数据
#### 实验内容
1．实现拨打电话功能
2．访问通讯录
#### 实验仪器
1)PC机最低配置：2G Hz以上双核CPU,2G以上内存
2)Windows 32位或64位操作系统
3)Android Studio 2.2及以上版本
#### 实验主要步骤
1）创建实验项目：选择Empty Activity
2）编写布局文件；

activity_main.xml
```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:context=".MainActivity">

    <ListView
            android:id="@+id/list"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintLeft_toLeftOf="parent"
            app:layout_constraintRight_toRightOf="parent"
            app:layout_constraintTop_toTopOf="parent"/>

</androidx.constraintlayout.widget.ConstraintLayout>
```
list_item.xml

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
              xmlns:tools="http://schemas.android.com/tools" android:orientation="horizontal"
              android:layout_width="match_parent"
              android:layout_height="wrap_content"
              android:layout_margin="20dp"
              android:padding="5dp">

    <ImageView
            android:contentDescription="@string/icon"
            android:src="@mipmap/kyzja1gl2m4"
            android:id="@+id/image_photo"
            android:layout_width="70dp"
            android:layout_height="70dp" />
    <LinearLayout
            android:layout_weight="1"
            android:layout_width="0dp"
            android:layout_height="70dp"
            android:orientation="vertical"
            android:layout_marginRight="15dp"
            android:layout_marginLeft="15dp">

        <TextView
                android:id="@+id/name"
                android:layout_width="match_parent"
                android:layout_weight="1"
                android:layout_height="match_parent"
                android:text="@string/name"
                android:textStyle="bold"
                android:textColor="#000"
                android:textSize="20sp" tools:ignore="NestedWeights"/>
        <TextView
                android:id="@+id/phone"
                android:layout_weight="1"
                android:layout_height="match_parent"
                android:layout_width="match_parent"
                android:text="@string/phone"
                android:textStyle="bold"
                android:textColor="#666"
                android:textSize="20sp" />
    </LinearLayout>
    <Button
            android:layout_width="70dp"
            android:layout_height="70dp"
            android:id="@+id/call"
            android:text="@string/call"
    />
</LinearLayout>
```

3）编写Activity类，单击查询通讯录信息，申请运行时权限

MainActivity

```java
package tk.dragondyt.study6;
import android.Manifest;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.os.Bundle;
import android.provider.ContactsContract;
import android.util.Log;
import android.widget.ListView;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import java.util.ArrayList;
import java.util.List;
/**
 * @author dyt
 */
public class MainActivity extends AppCompatActivity {
    final String TAG = "MainActivity";
    ContactPersonAdapter adapter;
    List<Person> contactsList = new ArrayList<>();
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        ListView listView = findViewById(R.id.list);
        adapter = new ContactPersonAdapter(this,getLayoutInflater(),contactsList);
        if(ContextCompat.checkSelfPermission(this, Manifest.permission.READ_CONTACTS) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.READ_CONTACTS}, 1);
        } else {
            readContacts();
        }
        if(ContextCompat.checkSelfPermission(this, Manifest.permission.CALL_PHONE) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.CALL_PHONE}, 100);
        }
        listView.setAdapter(adapter);

    }
    private void readContacts() {
        try(Cursor cursor = getContentResolver().query(ContactsContract.CommonDataKinds.Phone.CONTENT_URI,
                null, null, null, null)) {
            if (cursor != null) {
                while (cursor.moveToNext()) {
                    String name = cursor.getString(cursor.getColumnIndex(
                            ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME));
                    String phone = cursor.getString(cursor.getColumnIndex(
                            ContactsContract.CommonDataKinds.Phone.NUMBER));
                    contactsList.add(new Person(name,phone));
                }
                adapter.notifyDataSetChanged();
            }
        } catch (Exception e) {
            Log.d(TAG, "readContacts: "+e.getMessage());
        }
    }
    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions,@NonNull int[] grantsResults) {
        if (requestCode == 1) {
            if (grantsResults.length > 0 && grantsResults[0] == PackageManager.PERMISSION_GRANTED) {
                readContacts();
            } else {
                Toast.makeText(this, "请授予访问通讯录权限", Toast.LENGTH_SHORT).show();
            }
        }
        if (requestCode==100){
            if (grantsResults.length > 0 && grantsResults[0] == PackageManager.PERMISSION_GRANTED) {
                readContacts();
            } else {
                Toast.makeText(this, "请授予拨打电话权限", Toast.LENGTH_SHORT).show();
            }
        }
    }
}

```


4）通过通讯录应用程序提供的内容提供器查询其数据
```java
private void readContacts() {
        try(Cursor cursor = getContentResolver().query(ContactsContract.CommonDataKinds.Phone.CONTENT_URI,
                null, null, null, null)) {
            if (cursor != null) {
                while (cursor.moveToNext()) {
                    String name = cursor.getString(cursor.getColumnIndex(
                            ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME));
                    String phone = cursor.getString(cursor.getColumnIndex(
                            ContactsContract.CommonDataKinds.Phone.NUMBER));
                    contactsList.add(new Person(name,phone));
                }
                adapter.notifyDataSetChanged();
            }
        } catch (Exception e) {
            Log.d(TAG, "readContacts: "+e.getMessage());
        }
    }
```

5）编写ListView展示通讯录方法，把查询到的数据展示在页面

ContactPersonAdapter

```java
package tk.dragondyt.study6;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.Button;
import android.widget.TextView;

import java.util.List;

/**
 * @author dyt
 */
public class ContactPersonAdapter extends BaseAdapter {

    /**定义数据*/
    private final List<Person> mData;
    /**定义Inflater,加载我们自定义的布局。*/
    private final LayoutInflater mInflater;
    private final Context context;

  /**
    定义构造器，在Activity创建对象Adapter的时候将数据data和Inflater传入自定义的Adapter中进行处理。
    */
    public ContactPersonAdapter(Context context,LayoutInflater inflater, List<Person> data){
        mInflater = inflater;
        mData = data;
        this.context = context;
    }

    @Override
    public int getCount() {
        return mData.size();
    }

    @Override
    public Object getItem(int position) {
        return position;
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View view, ViewGroup viewGroup) {
        @SuppressLint("ViewHolder")
        View item = mInflater.inflate(R.layout.list_item,null);
        Person person = mData.get(position);
        TextView name = item.findViewById(R.id.name);
        TextView phone = item.findViewById(R.id.phone);
        Button call = item.findViewById(R.id.call);
        call.setOnClickListener((v)->{
            Intent intentCall =  new Intent();
            intentCall.setAction(Intent.ACTION_CALL);
            intentCall.setData(Uri.parse("tel:" + person.getPhone()));
            context.startActivity(intentCall);
        });
        name.setText(person.name);
        phone.setText(person.phone);
         return item ;
    }
}
```

Person

```java
package tk.dragondyt.study6;

/**
 * @author dyt
 */
public class Person {
    String name;
    String phone;

    public Person(String name, String phone) {
        this.name = name;
        this.phone = phone;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", phone='" + phone + '\'' +
                '}';
    }
}

```
#### 最后附上截图，最讨厌没图的教程。
![运行截图](https://i.loli.net/2020/05/10/4ZVY3qmebrPkGuM.png)


[实验源码](https://vip.d0.baidupan.com/file/?VTMBP1loBTQBCFBoUGVRPQE+ATlTfwt9CnhQMlJ3W2wBLwUoCj4GIlMjADBWa1c6AD8FX1FnAmRWbAE1Uz0BNlVhAW5ZNQVmAWZQIFBiUSMBZgEzUzoLOQo/UGdSPltsAScFIgonBm9TNwBmVjBXZgB1BTBROwIvVmABN1MgATVVbQFnWTMFNwFiUGJQYlFjAW4BYFM+Cz4KOVBkUjtbPAFnBWQKYwZiU2YAZ1ZgV2UAPAU2UTYCZlZpATdTPAEuVS8BP1l0BXcBIlB1UGFRIgEyAWBTMQs4CjlQZFI6W2IBMQViCnEGJlNsADtWZ1cwAGcFMVE7AjhWaAE2Uz8BMVVkAWFZMQV/AXFQc1B0UW0BagEqUyoLbwphUCFSM1tqAScFJwonBiVTOABnVjdXbgBjBTFRPgIwVmABNFM7ASZVIAE/WXQFbAFmUDFQMVF+AW8BKlM+CzgKO1B4Ujo=)
