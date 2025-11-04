<template>
  <div class="frontframe-root">
    <el-container>
      <el-header>
        <div style="font-size: 32px; font-family: 宋体, sans-serif; color: white; font-weight: bold; letter-spacing: 2px;">湖南师范大学招生办</div>
      </el-header>
      <el-main>
        <div class="block">
          <el-carousel trigger="click" height="600px" :autoplay="true" :interval="2000">
            <el-carousel-item v-for="(image, index) in imageList" :key="index">
              <img :src="image" class="carousel-image">
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-main>
      <el-footer>
        <div class="function-block-container">
          <div class="function-block" :class="{ 'disabled': !canEnterRegister }" @click="enterRegister">
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
          <div class="function-block" @click="viewPersonalInfo">
            <div class="block-content">
              <h2>个人信息</h2>
              <p>&nbsp;</p>
            </div>
          </div>
          <div class="function-block" @click="logout">
            <div class="block-content">
              <h2>退出登录</h2>
              <p>&nbsp;</p>
            </div>
          </div>
        </div>
      </el-footer>
    </el-container>
    <!-- 友情链接和联系我们部分 -->
    <div class="pc-footer">
      <el-row :gutter="20" class="footer-section">
        <el-col :span="12" class="footer-column">
          <h4>友情链接</h4>
          <div class="footer-item">
            <router-link class="footer-link" to="/pc/back/main">
              <span class="icon-text">
                <i class="el-icon-right"></i>
                <span>网站后台</span>
              </span>
            </router-link>
          </div>
          <div class="footer-item">
            <a class="footer-link" href="https://zsb.hunnu.edu.cn/" target="_blank">
              <span class="icon-text">
                <i class="el-icon-right"></i>
                <span>招生信息网</span>
              </span>
            </a>
          </div>
          <div class="footer-item">
            <a class="footer-link" href="https://www.hunnu.edu.cn/" target="_blank">
              <span class="icon-text">
                <i class="el-icon-right"></i>
                <span>师大官网</span>
              </span>
            </a>
          </div>
        </el-col>
        <el-col :span="12" class="footer-column">
          <h4>联系我们</h4>
          <div class="footer-item">
            <p>地址：湖南省长沙市岳麓区潇湘中路110号</p>
          </div>
          <div class="footer-item">
            <p>部门：湖南师范大学招生办公室</p>
          </div>
          <div class="footer-item">
            <p>E-mail：zsb@hunnu.edu.cn</p>
          </div>
          <div class="footer-item">
            <p>电话：0731-88872222</p>
          </div>
        </el-col>
      </el-row>
      <div class="pc-under-footer">
        <el-row>
          <el-col :span="24">
            <p style="text-align: center;">&copy;版权 & 技术支持：湖南师范大学招生办公室信息技术组</p>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { removeInfo, removeSelectorInfo, removeSignupInfo } from '@/utils/storage'

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
    },

    viewPersonalInfo () {
      // 跳转到个人信息页面
      this.$router.push('/pc/inf')
    },

    logout () {
      // 退出登录的逻辑
      removeInfo()
      removeSelectorInfo()
      removeSignupInfo()
      this.$router.push('/pc/login')
    }
  }
}
</script>

<style scoped>
/* 页面总体：column flex 布局，header 固定，main(轮播) 固定高度，footer 填充剩余高度 */
.frontframe-root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.frontframe-root > .el-container {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
}

/* header */
.el-header {
  background: #8F0100;
  background-size: cover;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* main (轮播) 固定高度，不参与伸缩 */
.el-main {
  flex: none;
  padding: 0 0 0 0; /* 去掉底部 padding，避免出现白色缝隙 */
}
.block { width: 100%; }
.el-carousel { width: 100%; height: 600px; position: relative; border-radius: 0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
.el-carousel img { width: 100%; height: 100%; object-fit: cover; }

/* footer 占据剩余高度，内部按钮区域撑满高度 */
.el-footer {
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: stretch;
  padding: 0; /* 去掉 padding，让按钮区域能充满 */
  box-sizing: border-box;
  min-height: 120px; /* 保持一个合理的最小高度 */
}

.function-block-container {
  display: flex;
  gap: 12px; /* 缩小间隙，让按钮看起来连贯 */
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  align-items: stretch;
  align-content: stretch; /* 当换行时也拉伸内容 */
  height: 100%; /* 填满 el-footer 的高度 */
  padding: 12px; /* 小额内边距，避免按钮紧贴屏幕边缘 */
  box-sizing: border-box;
  flex-wrap: wrap;
}

/* 每个按钮均分宽度并撑满父容器高度 */
/* 每个按钮均分宽度并撑满父容器高度 */

.function-block {

  flex: 1 1 0;

  min-width: 120px; /* 允许更窄以便五个按钮能并排 */

  display: flex;

  flex-direction: column;

  justify-content: center;

  align-items: center;

  padding: 20px 16px;

  border-radius: 0; /* 去掉圆角以便按钮拼接时不露白边 */

  background-color: #409EFF;

  color: #fff;

  text-align: center;

  box-shadow: none; /* 去掉阴影以避免白色缝隙视觉 */

  transition: transform .2s ease, box-shadow .2s ease;

  height: 100%; /* 关键：填满 footer 内部可用高度 */

  min-height: 0; /* 允许向下收缩以支持 align-stretch */

  box-sizing: border-box;

  cursor: pointer; /* 添加手型光标 */

}

.function-block.disabled { background-color: #C0C4CC; color: #666; box-shadow: none; cursor: not-allowed; }
.function-block:hover:not(.disabled) { transform: translateY(-5px); box-shadow: 0 8px 16px rgba(0,0,0,0.2); }

.block-content { display:flex; flex-direction:column; justify-content:center; align-items:center; height:100%; }
.block-content h2 { margin:0; font-size:24px; }
.block-content p { margin:10px 0 0 0; font-size:16px; }

/* 响应式：窄屏时改为纵向排列，按钮高度自适应内容 */
@media (max-width: 992px) {
  .function-block-container { flex-direction: column; align-items: center; padding-bottom: 40px; }
  .function-block { width: 100%; max-width: 480px; height: auto; }
}

.pc-footer { background: #000000aa; color: #f4f4f4; margin: 0; padding: 20px 0; }
.footer-section { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
.footer-column h4 { margin: 0 0 15px 0; font-size: 18px; font-weight: bold; }
.footer-item { margin: 8px 0; }
.footer-link { color: #f4f4f4; text-decoration: none; }
.footer-link:hover { color: #ff5968; }
.icon-text { display: inline-flex; align-items: center; }
.icon-text i { margin-right: 8px; font-size: 12px; }
.pc-under-footer { margin: 20px 0 10px 0; background: #fff; color: #000; }
.pc-under-footer p { margin: 10px 0; font-size: 14px; }
</style>
