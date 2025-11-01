<template>
  <div id="app">
    <!-- 湖南师范大学招生办公室 -->
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="less" scoped>
.container{
  background-color: #f7f7f7;
}

#app{
  max-width: 4096px;
  margin: 0 auto;
}

@media(max-width:1440px){
  #app{
    max-width: 100%;
    // padding: 0 10px;
  }
}
</style>
