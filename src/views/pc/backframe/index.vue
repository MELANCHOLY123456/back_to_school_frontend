<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <!-- 侧边栏 -->
      <el-aside
        collapse-transition="true"
            :style="{
            minWidth: isCollapse ? '75px' : '165px',
            width: isCollapse ? '75px' : '10vw',
            transition: 'width 0.3s ease'
          }"
          style="background-color: rgb(238, 241, 246);"
      >
      <!-- 收起/展开侧边栏控制 -->
      <!-- <el-radio-group v-model="isCollapse" size="small" style="margin:0 auto; background-color: #fff;">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group> -->
            <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
      >
        <el-image
        style="width: 100%; padding: 15%;"
        :src="srcUrl"
        fit="fit"></el-image>
      <!-- 菜单 -->

        <el-menu-item index="1" @click="navigateTo('/pc/back/main')">
          <i class="el-icon-s-home"></i>
          <span>主页</span>
        </el-menu-item>

        <el-menu-item index="2" @click="navigateTo('/pc/back/headOfCollege')">
          <i class="el-icon-school"></i>
          <span>本学院报名信息</span>
        </el-menu-item>

        <el-submenu index="3" v-if="au === 2">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>账号与信息</span>
          </template>
          <el-menu-item-group>
            <span slot="title">账号</span>
            <el-menu-item index="3-1" @click="navigateTo('/pc/back/account')">账号管理</el-menu-item>
            <el-menu-item index="3-2" @click="navigateTo('/pc/back/admin')">权限管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="报名信息">
            <el-menu-item index="3-3" @click="navigateTo('/pc/back/signupinf')">报名信息管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-menu-item index="4" v-if="au === 2" @click="navigateTo('/pc/back/setting')">
          <i class="el-icon-menu"></i>
          <span>系统设置</span>
        </el-menu-item>

        <el-menu-item index="5" v-if="au === 2" @click="navigateTo('/pc/back/function')">
          <i class="el-icon-s-tools"></i>
          <span>快捷功能</span>
        </el-menu-item>

        <el-menu-item index="6" @click="navigateTo('/')">
          <i class="el-icon-s-promotion"></i>
          <span>返回前台</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 主体区域 -->
    <el-container>
      <el-header style="background-color: #fff; padding: 10px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee;">
        <div style="display: flex; align-items: center;">
          <!-- 折叠按钮 -->
                    <el-button
            v-show="!isCollapse"
            type="text"
            icon="el-icon-s-fold"
            @click="handleCollapse"
            style="margin-right: 2vw;"
            circle
          ></el-button>
          <el-button v-show="isCollapse"  type="text" icon="el-icon-s-unfold" @click="handleCollapse" style="margin-right: 2vw;" circle></el-button>

          <el-avatar :size="40" style="margin-right: 10px;" :src="form.avatar"></el-avatar>
          <span>{{form.name}}</span>
        </div>

        <!-- <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px;"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> -->

        <el-button @click="handleLogout" type="text" style="color: #f56c6c;">
          <i class="el-icon-log-out"></i> 退出登录
        </el-button>
      </el-header>

      <el-main style="padding: 20px">
        <div ref="chartContainer" style="width: 100%; height: 100%;">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getAu } from '@/api/getInf'
import { getSignupInfo, removeInfo, removeSelectorInfo, removeSignupInfo } from '@/utils/storage'

export default {
  name: 'backFrameIndex',
  data () {
    return {
      au: 0,
      isCollapse: false,
      form: {
        name: '',
        avatar: ''
      },
      srcUrl: require('@/assets/logoABL.png')
    }
  },
  mounted () {
    this.getAU()
    this.getForm()
  },
  methods: {
    async getAU () {
      try {
        const res = await getAu()
        this.au = res.data.authority
        if (this.au === 0) {
          this.$message.error('该账户不能访问该页面')
          this.$router.push('/')
        }
      } catch (error) {
        console.error('获取权限失败:', error)
        this.$message.error('获取权限失败，请稍后重试')
      }
    },
    getForm () {
      this.form = getSignupInfo()
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    // 使用 @click 事件导航，添加条件判断
    navigateTo (path) {
      if (this.$route.path !== path) { // 仅当当前路由与目标路由不同，才进行跳转
        this.$router.push(path)
      }
    },
    handleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    handleLogout () {
    // 退出登录逻辑（清除本地存储的用户信息，跳转到登录页面等）
      removeInfo()
      removeSelectorInfo()
      removeSignupInfo()
      this.$router.push('/pc/login') // 假设你有一个登录页面的路由
      // 移除 window.location.reload()，因为路由跳转会自动重新加载页面
    }
  }
}
</script>

<style scoped>
.el-header {
  background-color: #fff;
  color: #333;
  line-height: 60px;
  border-bottom: 1px solid #ddd;
}

.el-aside {
  background-color: rgb(238, 241, 246);
  color: #333;
}

.el-menu-vertical-demo {
  min-height: 100vh;
  border-right: 1px solid #eee;
}

.el-menu-vertical-demo .el-menu-item, .el-menu-vertical-demo .el-submenu__title {
  font-size: 14px;
}

.el-menu-vertical-demo .el-menu-item {
  padding-left: 20px;
}

.el-dropdown {
  display: inline-block;
  margin-right: 15px;
}

.el-button {
  font-size: 14px;
  padding: 0 10px;
}

.el-avatar {
  margin-right: 10px;
}
</style>
