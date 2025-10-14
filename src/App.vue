<template>
  <div id="app">
    <el-container class="layout-container">
      <el-header class="header">
        <div class="header-content">
          <h1 class="title">诗词应用</h1>
          <nav class="nav">
            <router-link to="/" class="nav-link">
              <el-button type="text">首页</el-button>
            </router-link>
            <router-link to="/poems" class="nav-link">
              <el-button type="text">诗词</el-button>
            </router-link>
            <router-link to="/about" class="nav-link">
              <el-button type="text">关于</el-button>
            </router-link>
          </nav>
        </div>
      </el-header>
      
      <el-main class="main">
        <router-view />
      </el-main>
      
      <el-footer class="footer">
        <p>&copy; 2024 诗词应用 - 传承中华诗词文化</p>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup lang="ts">
// 使用Composition API和setup语法糖
// 这里可以添加全局的逻辑
</script>

<style scoped>
.layout-container {
  min-height: 100vh;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.title {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

.nav {
  display: flex;
  gap: 20px;
}

.nav-link {
  text-decoration: none;
}

.nav-link :deep(.el-button) {
  color: white;
  font-size: 16px;
}

.nav-link :deep(.el-button:hover) {
  color: #f0f0f0;
}

.main {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.footer {
  background-color: #f5f5f5;
  text-align: center;
  color: #666;
}

.footer p {
  margin: 0;
}
</style>