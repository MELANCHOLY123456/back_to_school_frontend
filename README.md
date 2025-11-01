以下是项目使用说明文档，内容涵盖了 Git 操作、Node.js 和 npm 安装方法、配置国内镜像源、以及简化后的项目初始化与运行步骤。

------

# 🎓 come_back_to_school_system 使用说明文档

## ✅ 一、Git 使用方法

### 1. 配置 Git 账号信息（仅首次执行）

```bash
git config --global user.name "Lucian"
git config --global user.email "3540527513@qq.com"
```

### 2. 上传项目到远程仓库（首次推送）

```bash
git remote add origin https://gitee.com/Lucian_Chau/come_back_to_school_system_hnnu.git
git push -u origin master
```

### 3. 拉取远程代码（同步更新）

```bash
git pull origin master
```

### 4. 强制覆盖本地代码（如需重置）

```bash
git reset --hard           # 丢弃本地修改
git fetch origin
git reset --hard origin/master  # 强制同步远程主分支
```

------

## 💡 二、Node.js 与 npm 安装方法

### 1. 下载并安装 Node.js

访问官网 https://nodejs.org/zh-cn
 推荐下载 **LTS（长期支持版）**，安装后自动包含 `npm`

### 2. 验证安装成功

```bash
node -v
npm -v
```

------

## 🚀 三、配置国内 npm 镜像（提高安装速度）

推荐使用淘宝源（npmmirror）：

```bash
npm config set registry https://registry.npmmirror.com
```

如需恢复为官方源：

```bash
npm config set registry https://registry.npmjs.org
```

------

## 🔧 四、项目初始化与运行（简化版）

### 1. 克隆项目到本地

```bash
git clone https://gitee.com/Lucian_Chau/come_back_to_school_system_hnnu.git
cd come_back_to_school_system_hnnu
```

### 2. 安装依赖

```bash
npm install
```

### 3. 本地运行开发环境

```bash
npm run serve # 运行前修改/src/utils/request.js中的后台服务器的IP与端口号
```

访问提示中的地址（如：[http://localhost:8080）即可进入系统。](http://localhost:8080）即可进入系统。/)

### 4. 打包发布

```bash
npm run build # 打包到项目根目录的dist文件夹下
```

### 5. 自动格式检查与修复

```bash
npm run lint
```

------

## 🔧 五、可选配置与文档

如需修改默认端口或其他构建参数，请查看官方文档：
 👉 [Vue CLI 配置参考](https://cli.vuejs.org/config/)

