<template>
  <div id="app">
    <div class="container">
      <div class="close">
        <span class="iconfont iconicon-test"></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="inputs">
        <input data-v-744880be placeholder="请输入手机号" class="input" />
        <input data-v-744880be placeholder="密码" class="input" type="password" />
      </div>
      <p class="tips">
        没有账号？
        <a href="#/register" class>去注册</a>
      </p>
      <mybtn text="登录" @click="handerbtn"></mybtn>
    </div>
  </div>
</template>

<script>
import mybtn from '@/components/mybtn'
export default {
  data () {
    return {

    }
  },
  components: {
    mybtn
  },
  methods: {
    handerbtn (data) {
      console.log(data)
    }
  }
}
</script>

<style lang='less' scoped>
.container {
  padding: 20px;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>
