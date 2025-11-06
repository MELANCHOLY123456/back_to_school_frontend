<template>
  <div class="frontframe-root">
    <el-container>
      <el-header>
        <div class="header-title">湖南师范大学招生办</div>
      </el-header>
      <el-main>
        <div class="carousel-container">
          <el-carousel trigger="click" height="500px" :autoplay="true" :interval="3000">
            <el-carousel-item v-for="(image, index) in imageList" :key="index">
              <img :src="image" class="carousel-image">
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-main>
      <el-footer>
        <div class="function-section">
          <div class="function-block-container">

            <div class="function-block" :class="{ 'disabled': !canEnterRegister }" @click="enterRegister">

              <div class="block-icon">

                <i class="el-icon-edit"></i>

              </div>

              <div class="block-content">

                <h3>进入报名</h3>

                <p>未报名用户可点击</p>

              </div>

            </div>

            <div class="function-block" :class="{ 'disabled': !canViewInfo }" @click="viewInfo">

              <div class="block-icon">

                <i class="el-icon-document"></i>

              </div>

              <div class="block-content">

                <h3>查看、修改报名信息</h3>

                <p>请填写报名信息人</p>

              </div>

            </div>

            <div class="function-block" :class="{ 'disabled': !canChangeTeam }" @click="changeTeam">

              <div class="block-icon">

                <i class="el-icon-user"></i>

              </div>

              <div class="block-content">

                <h3>队伍变更</h3>

                <p>仅从用户可见入</p>

              </div>

            </div>

            <div class="function-block" @click="viewPersonalInfo">

              <div class="block-icon">

                <i class="el-icon-setting"></i>

              </div>

              <div class="block-content">

                <h3>修改报名信息</h3>

                <p>个人信息维护</p>

              </div>

            </div>

            <div class="function-block" @click="logout">

              <div class="block-icon">

                <i class="el-icon-switch-button"></i>

              </div>

              <div class="block-content">

                <h3>退出登录</h3>

                <p>安全退出系统</p>

              </div>

            </div>

          </div>
        </div>
      </el-footer>
    </el-container>
    <!-- 友情链接和联系我们部分 -->
    <div class="pc-footer">
      <div class="footer-content">
        <div class="footer-columns">
          <div class="footer-column">
            <h4>友情链接</h4>
            <div class="footer-links">
              <router-link class="pc-footer-link" to="/pc/back/main">
                <span class="icon-text">
                  <i class="el-icon-monitor"></i>
                  <span>网站后台</span>
                </span>
              </router-link>
              <a class="pc-footer-link" href="https://zsb.hunnu.edu.cn/" target="_blank">
                <span class="icon-text">
                  <i class="el-icon-link"></i>
                  <span>招生信息网</span>
                </span>
              </a>
              <a class="pc-footer-link" href="https://www.hunnu.edu.cn/" target="_blank">
                <span class="icon-text">
                  <i class="el-icon-school"></i>
                  <span>师大官网</span>
                </span>
              </a>
            </div>
          </div>
          <div class="footer-column">
            <h4>联系我们</h4>
            <div class="contact-info">
              <p><i class="el-icon-location-information"></i>地址：湖南省长沙市岳麓区高新村西119号</p>
              <p><i class="el-icon-office-building"></i>部门：湖南师范大学招生办公室</p>
              <p><i class="el-icon-message"></i>E-mail：zsb@hunnu.edu.cn</p>
              <p><i class="el-icon-phone"></i>电话：0731-88872222</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pc-under-footer">
      <p>&copy;版权 & 技术支持：湖南师范大学招生办公室信息技术组</p>
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
      this.$router.push('/pc/inf')
    },
    logout () {
      removeInfo()
      removeSelectorInfo()
      removeSignupInfo()
      this.$router.push('/pc/login')
    }
  }
}
</script>

<style scoped>
/* 页面总体布局 */
.frontframe-root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f5f7fa;
}
.frontframe-root > .el-container {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
}

/* 头部样式 */
.el-header {
  background: linear-gradient(135deg, #8F0100 0%, #B10100 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: relative;
}

.el-header::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
}

.header-title {
  font-size: 32px;
  font-weight: bold;
  letter-spacing: 3px;
  color: white;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
}

/* 轮播图区域 */
.el-main {
  padding: 0;
}
.carousel-container {
  width: 100%;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
.el-carousel {
  width: 100%;
  height: 500px;
  position: relative;
  overflow: hidden;
}
.el-carousel img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 功能区域 */
.el-footer {

  flex: 1 1 auto;

  display: flex;

  justify-content: center;

  align-items: center;

  padding: 0;

  box-sizing: border-box;

  min-height: 350px;

  background: linear-gradient(to bottom, rgba(248, 249, 250, 0.8), rgba(233, 236, 239, 0.9));

}

.function-section {
  width: 100%;
  max-width: 1000px;
}

.function-block-container {

  display: flex;

  flex-wrap: nowrap;

  justify-content: center;

  align-items: stretch;

  gap: 25px;

  width: 100%;

  max-width: 1600px;

  margin: 0 auto;

  padding: 40px 20px;

  min-height: 240px;

}

.function-block-row {
  display: flex;
  justify-content: center;
  gap: 30px;
}

.function-block-row:first-child {
  justify-content: center;
}

.function-block-row:last-child {
  justify-content: center;
}

/* 功能块样式 */
.function-block {

  position: relative;

  flex: 1 1 0;

  min-width: 160px;

  max-width: 200px;

  display: flex;

  flex-direction: column;

  justify-content: center;

  align-items: center;

  padding: 30px 20px;

  border-radius: 12px;

  background: linear-gradient(135deg, #ffffff, #f8f9fa);

  color: #333;

  text-align: center;

  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);

  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  min-height: 180px;

  box-sizing: border-box;

  cursor: pointer;

  border: 1px solid #eaeaea;

}

.function-block::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #8F0100, #B10100);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.function-block:hover:not(.disabled) {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.function-block:hover:not(.disabled)::before {
  transform: scaleX(1);
}

.function-block:hover:not(.disabled) .block-icon {
  color: #8F0100;
  transform: scale(1.1);
}

.function-block.disabled {
  background: #f0f2f5;
  color: #a0a4a8;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.block-icon {

  font-size: 36px;

  margin-bottom: 15px;

  color: #8F0100;

  transition: all 0.3s ease;

}

.function-block.disabled .block-icon {
  color: #a0a4a8;
}

.block-content h3 {
  margin: 0 0 10px 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.function-block.disabled .block-content h3 {
  color: #a0a4a8;
}

.block-content p {
  margin: 0;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.function-block.disabled .block-content p {
  color: #a0a4a8;
}

/* 页脚区域 */
.pc-footer {
  background: linear-gradient(135deg, #2c3e50, #34495e);
  color: #ecf0f1;
  margin: 40px 0 0 0;
  padding: 40px 0 20px;
}

.footer-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-columns {
  display: flex;
  justify-content: space-between;
  gap: 40px;
}

.footer-column {
  flex: 1;
}

.footer-column h4 {
  font-size: 18px;
  margin-bottom: 20px;
  position: relative;
  padding-bottom: 10px;
}

.footer-column h4::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 2px;
  background: #8F0100;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.pc-footer-link {
  color: #bdc3c7;
  text-decoration: none;
  transition: color 0.3s;
  display: block;
}

.pc-footer-link:hover {
  color: #8F0100;
}

.icon-text {
  display: flex;
  align-items: center;
}

.icon-text i {
  margin-right: 8px;
  font-size: 16px;
}

.contact-info p {
  margin-bottom: 12px;
  display: flex;
  align-items: flex-start;
  color: #bdc3c7;
}

.contact-info i {
  margin-right: 10px;
  width: 16px;
  text-align: center;
  margin-top: 2px;
}

.pc-under-footer {
  background: #1a252f;
  color: #95a5a6;
  padding: 15px 0;
  text-align: center;
}

.pc-under-footer p {
  margin: 0;
  font-size: 14px;
}

/* 响应式设计 */
@media (min-width: 1600px) {
  .function-block-container {
    max-width: 1600px;
  }

  .function-block {
    min-width: 180px;
    max-width: 220px;
  }
}

@media (max-width: 1600px) and (min-width: 1400px) {
  .function-block-container {
    max-width: 1400px;
  }

  .function-block {
    min-width: 160px;
    max-width: 200px;
    padding: 25px 18px;
    min-height: 170px;
  }
}

@media (max-width: 1400px) and (min-width: 1200px) {
  .function-block-container {
    max-width: 1200px;
  }

  .function-block {
    min-width: 150px;
    max-width: 180px;
    padding: 22px 16px;
    min-height: 160px;
  }

  .block-content h3 {
    font-size: 17px;
  }

  .block-content p {
    font-size: 13px;
  }
}

@media (max-width: 1200px) and (min-width: 992px) {
  .function-block-container {
    max-width: 1000px;
  }

  .function-block {
    min-width: 140px;
    max-width: 170px;
    padding: 20px 15px;
    min-height: 150px;
  }

  .block-content h3 {
    font-size: 16px;
  }

  .block-content p {
    font-size: 12px;
  }
}

@media (max-width: 992px) {
  .function-block-container {
    flex-direction: column;
    align-items: center;
    padding: 30px 20px;
    gap: 20px;
    flex-wrap: wrap;
  }

  .function-block {
    width: 100%;
    max-width: 400px;
    min-height: 140px;
    margin-bottom: 0;
  }

  .el-footer {
    min-height: 500px;
  }
}

@media (max-width: 768px) {
  .function-block-container {
    padding: 20px 15px;
    gap: 15px;
  }

  .function-block {
    max-width: 320px;
    min-height: 130px;
    padding: 20px 15px;
  }
  .block-content h3 {
    font-size: 16px;
  }
  .block-content p {
    font-size: 12px;
  }
  .block-icon {
    font-size: 32px;
  }
}

@media (max-width: 480px) {
  .function-block {
    max-width: 280px;
    min-height: 120px;
    padding: 18px 12px;
  }

  .block-content h3 {
    font-size: 15px;
  }

  .block-icon {
    font-size: 28px;
  }

}
</style>
