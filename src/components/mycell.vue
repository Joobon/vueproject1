<template>
  <div class="cell" @click="tank">
      <span class="left">{{title}}</span>
      <div>
      <span class="right">{{dis}}</span>
      <span class="iconfont iconjiantou1"></span>
      </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'dis', 'type'],
  methods: {
    tank () {
      this.$emit('click')
    }
  }
}
</script>

<style lang='less' scoped>
.cell{
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    height: 50*100vw/360;
    border-bottom: 1px solid #aaa;
    line-height:50*100vw/360 ;
    font-size: 15*100vw/360;
    margin-left: 20px;
    .right{
        margin-right: 10px;
        color: #aaa
    }
}
</style>
