<template>
  <el-container>
    <el-header> <div style="font-size: 30px;font-family: 宋体;color: white;">湖南师范大学招生办</div></el-header>
    <el-main>
      <div class="block">
      <el-carousel trigger="click" height="550px" :autoplay="true" :interval="2000">
        <el-carousel-item v-for="(image, index) in imageList" :key="index">
          <img :src="image" class="carousel-image">
      </el-carousel-item>
    </el-carousel>
    </div>
    </el-main>
    <el-footer> <div class="function-block" :class="{ 'disabled': !canEnterRegister }" @click="enterRegister">
        <div class="block-content">
          <h2>进入报名</h2>
          <p>未报名用户可点击</p>
        </div>
      </div>
      <div class="function-block" :class="{ 'disabled': !canViewInfo }" @click="viewInfo">
        <div class="block-content">
          <h2>查看、修改报名信息</h2>
          <p>队伍成员可进入</p>
        </div>
      </div>
      <div class="function-block" :class="{ 'disabled': !canChangeTeam }" @click="changeTeam">
        <div class="block-content">
          <h2>队伍变更</h2>
          <p>仅队员用户可进入</p>
        </div>
      </div>
      <div class="function-block" :class="{ 'disabled': !canChangeTeam }" @click="changeTeam">
        <div class="block-content">
          <h2>退出登录</h2>
          <p>&nbsp;</p>
        </div>
      </div></el-footer>
  </el-container>
</template>

<script>
export default {
  name: 'FrontFrameIndex',
  data () {
    return {
      canEnterRegister: true,
      canViewInfo: false,
      canChangeTeam: false,
      imageList: [
        'https://zsb.hunnu.edu.cn/images/banner01.jpg',
        'https://zsb.hunnu.edu.cn/images/banner04.jpg',
        'https://zsb.hunnu.edu.cn/images/banner07.jpg',
        'https://zsb.hunnu.edu.cn/images/banner03.jpg'
      ]
    }
  },
  methods: {
    enterRegister () {
      if (this.canEnterRegister) {
        // 进入报名的逻辑
        this.$router.push('/pc/inf')
      }
    },
    viewInfo () {
      if (this.canViewInfo) {
        // 查看或修改报名信息的逻辑
      }
    },
    changeTeam () {
      if (this.canChangeTeam) {
        // 队伍变更的逻辑
      }
    }
  }
}
</script>

<style scoped>
.el-main {
  display: flex;
  justify-content: space-around;
  color: #333;
  padding: 0;
}
.el-header {
  background: #8F0100; /* 使用线性渐变，颜色从左到右变化 */
  background-size: cover;
  z-index: 10; /* 确保顶栏在上方 */
  display: flex;
  align-items: center;
  justify-content: center;
}
.function-block {
  display: inline-block;
  width: 400px;
  background-color: #409EFF;
  color: white;
  text-align: center;
  padding: 20px;
  margin-top: 60px;
  margin-right: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  align-items: center;
}
.function-block.disabled {
  background-color: #C0C4CC;
  color: #666;
  box-shadow: none;
  cursor: not-allowed;
}
.function-block:hover:not(.disabled) {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
}
.block-content h2 {
  margin: 0;
  font-size: 24px;
}
.block-content p {
  margin: 10px 0 0 0;
  font-size: 16px;
}
.el-carousel {
  width: 100%;
  height: 700px; /* 调整轮播图的高度 */
  position: relative;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px; /* 调整与轮播图高度相同 */
  margin: 0;
  text-align: center;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.el-carousel img {
  width: 100%;
  height: 100%;  /* 使图片宽度充满容器 */   /* 使图片高度充满容器 */
  object-fit: cover; /* 裁剪图片以覆盖整个容器，可能会有部分图片不显示 */
     /* 使图片高度充满容器 */
}
.block{
  width: 100%;
  height: 700px;
}
.el-footer {
  display: flex; /* 将 footer 设为 Flex 容器 */
  justify-content: center; /* 在水平方向上居中子元素 */
  align-items: center; /* 在垂直方向上居中子元素 */
  padding: 20px; /* 可根据需要调整内边距 */
}
</style>
