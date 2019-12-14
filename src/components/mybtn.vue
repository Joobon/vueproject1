<template>
  <div class="btn" @click="handerbtn" :class="{success:type==='success'}">{{text}}</div>
</template>

<script>
export default {
  props: ['text', 'type'],
  methods: {
    handerbtn (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang='less' scoped>
.btn{
    background:red;
    width: 314*100vw/360;
    height: 50*100vw/360;
    line-height: 50*100vw/360;
    border-radius:25*100vw/360;
    text-align: center;
    font-size: 20*100vw/360
}
.success{
  background: skyblue;
}
</style>
