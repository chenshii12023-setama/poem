<template>
  <div class="home">
    <!-- 欢迎区域 -->
    <el-row class="welcome-section">
      <el-col :span="24">
        <div class="welcome-card">
          <h2>欢迎来到诗词应用</h2>
          <p>探索中华诗词之美，感受千年文化传承</p>
          <el-button type="primary" size="large" @click="goToPoems">
            <el-icon><Reading /></el-icon>
            开始阅读
          </el-button>
        </div>
      </el-col>
    </el-row>

    <!-- 特色功能 -->
    <el-row :gutter="20" class="features-section">
      <el-col :xs="24" :sm="8" v-for="feature in features" :key="feature.id">
        <el-card class="feature-card" shadow="hover">
          <div class="feature-icon">
            <el-icon size="40" :color="feature.color">
              <component :is="feature.icon" />
            </el-icon>
          </div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </el-card>
      </el-col>
    </el-row>

    <!-- 推荐诗词 -->
    <div class="recommended-section">
      <h3>今日推荐</h3>
      <el-row :gutter="20">
        <el-col :xs="24" :md="12" v-for="poem in recommendedPoems" :key="poem.id">
          <el-card class="poem-card" shadow="hover">
            <div class="poem-header">
              <h4>{{ poem.title }}</h4>
              <span class="poem-meta">{{ poem.author }} · {{ poem.dynasty }}</span>
            </div>
            <div class="poem-content">
              {{ poem.content }}
            </div>
            <div class="poem-actions">
              <el-button type="text" @click="addToFavorites(poem)">
                <el-icon><Star /></el-icon>
                收藏
              </el-button>
              <el-button type="text">
                <el-icon><Share /></el-icon>
                分享
              </el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePoemStore } from '@/stores/counter'
import { ElMessage } from 'element-plus'

const router = useRouter()
const poemStore = usePoemStore()

// 特色功能数据
const features = ref([
  {
    id: 1,
    title: '海量诗词',
    description: '收录唐诗宋词等经典作品',
    icon: 'Collection',
    color: '#409EFF'
  },
  {
    id: 2,
    title: '智能搜索',
    description: '快速找到您想要的诗词',
    icon: 'Search',
    color: '#67C23A'
  },
  {
    id: 3,
    title: '个人收藏',
    description: '收藏喜爱的诗词作品',
    icon: 'Star',
    color: '#E6A23C'
  }
])

// 推荐诗词数据
const recommendedPoems = ref([
  {
    id: 1,
    title: '静夜思',
    author: '李白',
    dynasty: '唐',
    content: '床前明月光，疑是地上霜。举头望明月，低头思故乡。'
  },
  {
    id: 2,
    title: '春晓',
    author: '孟浩然',
    dynasty: '唐',
    content: '春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。'
  }
])

// 跳转到诗词页面
const goToPoems = () => {
  router.push('/poems')
}

// 添加到收藏
const addToFavorites = (poem: any) => {
  poemStore.addToFavorites(poem)
  ElMessage.success('已添加到收藏')
}

onMounted(() => {
  // 组件挂载时的逻辑
})
</script>

<style scoped>
.home {
  padding: 20px 0;
}

.welcome-section {
  margin-bottom: 40px;
}

.welcome-card {
  text-align: center;
  padding: 60px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.welcome-card h2 {
  font-size: 32px;
  margin-bottom: 16px;
  font-weight: 600;
}

.welcome-card p {
  font-size: 18px;
  margin-bottom: 32px;
  opacity: 0.9;
}

.features-section {
  margin-bottom: 40px;
}

.feature-card {
  text-align: center;
  padding: 20px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.feature-icon {
  margin-bottom: 16px;
}

.feature-card h3 {
  margin: 0 0 12px 0;
  font-size: 20px;
  color: #333;
}

.feature-card p {
  margin: 0;
  color: #666;
  line-height: 1.6;
}

.recommended-section h3 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.poem-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.poem-header h4 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.poem-content {
  line-height: 1.8;
  color: #555;
  margin-bottom: 16px;
  font-size: 16px;
}

.poem-actions {
  display: flex;
  gap: 16px;
}

@media (max-width: 768px) {
  .welcome-card {
    padding: 40px 16px;
  }
  
  .welcome-card h2 {
    font-size: 24px;
  }
  
  .welcome-card p {
    font-size: 16px;
  }
}
</style>