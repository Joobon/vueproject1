<template>
  <div class="top">
      <span> <slot name='left'></slot> </span>
      <span>{{topt}}</span>
      <span> <slot name="right"></slot> </span>
  </div>
</template>

<script>
export default {
  props: ['topt']
}
</script>

<style lang='less' scoped>
.top{
    display:flex;
    justify-content: space-between;
    height:50*100vw/360;
    font-size: 15*100vw/360;
    line-height: 50*100vw/360;
    padding:0 20px;
    border-bottom: 1px solid #ccc;
}

</style>
