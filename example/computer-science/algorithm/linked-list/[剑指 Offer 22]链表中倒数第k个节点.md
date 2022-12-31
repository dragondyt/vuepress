---
title: '[剑指 Offer 22]链表中倒数第k个节点'
categories:
  - - 计算机科学
    - 算法
    - 链表
tags:
  - 链表
permalink: /computer-science/algorithm/linked-list/8f835b6d.html
date: '2022-07-28 16:59:09'
---
```java
class Solution {
    public ListNode getKthFromEnd(ListNode head, int k) {
        ListNode p1 = head;
        // p1 先走 k 步
        for (int i = 0; i < k; i++) {
            p1 = p1.next;
        }
        ListNode p2 = head;
        // p1 和 p2 同时走 n - k 步
        while (p1 != null) {
            p2 = p2.next;
            p1 = p1.next;
        }
        // p2 现在指向第 n - k + 1 个节点，即倒数第 k 个节点
        return p2;
    }
}
```
