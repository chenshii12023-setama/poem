<template>
  <div id="app">
    <nav class="navbar" v-if="isAuthenticated">
      <router-link to="/poems" class="logo">诗词赏析</router-link>
      <div class="nav-links">
        <router-link to="/poems">首页</router-link>
        <router-link to="/profile">个人中心</router-link>
        <button @click="handleLogout">退出</button>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const isAuthenticated = computed(() => authStore.isAuthenticated)

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #f8f8f8;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.logo {
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
  color: #333;
}

.nav-links {
  display: flex;
  gap: 20px;
  align-items: center;
}

.nav-links a {
  text-decoration: none;
  color: #333;
}

.nav-links button {
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
}
</style>