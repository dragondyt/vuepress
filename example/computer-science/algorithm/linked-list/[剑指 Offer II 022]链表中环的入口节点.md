---
title: '[剑指 Offer II 022]链表中环的入口节点'
tags:
  - 链表
  - 快慢指针
permalink: /computer-science/algorithm/linked-list/9862a150.html
date: '2022-08-03 16:10:45'
---
```java
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
  public ListNode detectCycle(ListNode head) {
    //如果用两个指针
    ListNode fast = head, slow = head;
    while (fast != null && fast.next != null) {
      fast = fast.next.next;
      slow = slow.next;
      if (fast == slow) {
        break;
      }
    }
    if (fast == null || fast.next == null) {
      return null;
    }
    slow = head;
    while (slow!=fast){
        slow = slow.next;
        fast = fast.next;
    }
    return slow;
  }
}
```

