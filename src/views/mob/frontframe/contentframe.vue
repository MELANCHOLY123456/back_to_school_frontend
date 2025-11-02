<template>
  <div>
    <van-nav-bar title="主页" left-text="返回" left-arrow class="custom-nav-bar" @click-left="onClickLeft"
      @click-right="onClickRight">
      <template #right>
        <van-icon color="#fff" name="user" size="18" class="nav-icon" />
        <span class="nav-title-deputy">&nbsp;个人信息</span>
      </template>
      <template #left>
        <van-icon color="#fff" name="arrow-left" size="18" class="nav-icon" />
        <span class="nav-title-deputy">&nbsp;返回</span>
      </template>
      <template #title>
        <span class="nav-title ">{{ currentYear+1 }}·回访母校报名</span>
      </template>
    </van-nav-bar>

    <div style="min-height: calc(100vh - 15.64vh);">
      <router-view></router-view>
    </div>

    <div class="mFooter">
      <van-row type="flex" justify="space-around">
        <van-col class="mFooterItem" span="10">
          <h4>友情链接</h4>
        </van-col>
        <van-col class="mFooterItem" span="10">
          <h4>联系我们</h4>
        </van-col>
      </van-row>
      <van-row type="flex" justify="space-around">
        <van-col class="mFooterItem" span="10">
          <router-link class="link" to="/pc/back/main">
            <span class="icon-text">
              <i class="el-icon-bottom-right"></i>
              <h5>网站后台</h5>
            </span>
          </router-link>
        </van-col>
        <van-col class="mFooterItem" span="10">
          <h5>地址：湖南省长沙市岳麓区潇湘中路110号</h5>
        </van-col>
      </van-row>
      <van-row type="flex" justify="space-around">
        <van-col class="mFooterItem" span="10">
          <a class="link" href="https://zsb.hunnu.edu.cn/" target="_blank">
            <span class="icon-text">
              <i class="el-icon-bottom-right"></i>
              <h5>招生信息网</h5>
            </span>
          </a>
        </van-col>
        <van-col class="mFooterItem" span="10">
          <h5>部门：湖南师范大学招生办公室</h5>
        </van-col>
      </van-row>
      <van-row type="flex" justify="space-around">
        <van-col class="mFooterItem" span="10">
          <a class="link" href="https://www.hunnu.edu.cn/" target="_blank">
            <span class="icon-text">
              <i class="el-icon-bottom-right"></i>
              <h5>师大官网</h5>
            </span>
          </a>
        </van-col>
        <van-col class="mFooterItem" span="10">
          <h5>E-mail：zsb@hunnu.edu.cn</h5>
        </van-col>
      </van-row>
      <van-row type="flex" justify="space-around">
        <van-col class="mFooterItem" span="10"></van-col>
        <van-col class="mFooterItem" span="10">
          <h5>电话：0731-88872222</h5>
        </van-col>
      </van-row>
    </div>

    <div class="mUnderFooter">
      <van-row type="flex" justify="center">
        <van-col span="24">
          <h6 style="text-align: center;">&copy;版权 & 技术支持：湖南师范大学招生办公室信息技术组</h6>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'mFrontFrameBelowMain',
  data () {
    return {

    }
  },
  methods: {
    onClickLeft () {
      console.log('返回按钮被点击')
      this.$router.push('/mob/main') // 明确跳转到移动端主页
      Toast('返回')
    },
    onClickRight () {
      this.$router.push('/mob/information')
      Toast('个人信息')
    }
  },
  computed: {
    currentYear () {
      return new Date().getFullYear()
    }
  }
}
</script>

<style lang="less" scoped>
.custom-nav-bar {
  background-color: #FF5968;
  /* 导航栏背景色 */
}

.nav-title {
  color: white;
  /* 标题颜色 */
  font-size: 18px;
  /* 标题字号 */
}

.nav-title-deputy {
  color: white;
  /* 标题颜色 */
  font-size: 16px;
  /* 标题字号 */
}

.mFooter {
  background: #000000aa;
  color: #f4f4f4;
  margin: 40px 0 0 0;
  padding: 20px 0;
}

.mFooterItem {
  margin: 3px 0;
}

// 底栏超链接的颜色
.link {
  color: #f4f4f4;
  /* 普通状态的颜色 */
}

.link:hover {
  color: red;
  /* 鼠标悬浮时的颜色 */
}

.icon-text {
  display: inline-flex;
  align-items: center;
  /* 垂直居中对齐 */
}

.icon-text i {
  margin-right: 0.5vw;
  /* 图标和文字之间的间距 */
  font-size: 1vw;
  /* 调整图标大小 */
}

.icon-text h5 {
  margin: 0;
  /* 去除默认外边距 */
}

// .link.router-link-exact-active {
//   color: red; /* 激活状态的颜色 */
// }

// .link.router-link-active {
//   color: green; /* 当前活动状态的颜色 */
// }

.mUnderFooter {
  margin: 3px 0;
  background: #fff;
}
</style>
