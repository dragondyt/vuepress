<template>
  <div class="reward">
    <button><i class="ic i-heartbeat"></i> 赞赏</button>
    <p>请我喝[茶]~(￣▽￣)~*</p>
    <div id="qr">
      <div><img alt="Ruri Shimotsuki 微信支付" data-src="//cdn.jsdelivr.net/gh/amehime/shoka@30732f13/images/wechatpay.png">
        <p>微信支付</p></div>
      <div><img alt="Ruri Shimotsuki 支付宝" data-src="//cdn.jsdelivr.net/gh/amehime/shoka@30732f13/images/alipay.png">
        <p>支付宝</p></div>
      <div><img alt="Ruri Shimotsuki 贝宝" data-src="//cdn.jsdelivr.net/gh/amehime/shoka@30732f13/images/paypal.png">
        <p>贝宝</p></div>
    </div>
  </div>

</template>

<script lang="ts" setup>

</script>

<style>
.reward {
  margin: 1.25rem auto;
  padding: .625rem 0;
  text-align: center;

  button {
    background: var(--primary-color);
    border: 0;
    border-radius: .3125rem;
    color: var(--grey-0);
    cursor: pointer;
    line-height: 2;
    outline: 0;
    padding: 0 .9375rem;
    vertical-align: text-top;

    &:hover {
      background: var(--primary-color);
    }

    i {
      margin-right: .3125rem;
    }
  }

  p {
    font-size: .8125em;
    color: var(--grey-5);
    margin: 0;
  }
}

#qr {
  padding-top: 1.25rem;
  display: none;

  a {
    border: 0;
  }

  img {
    display: inline-block;
    max-width: 100%;
  }

  p {
    text-align: center;
  }

}

</style>