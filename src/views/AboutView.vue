<template>
  <div class="about">
    <!-- 关于应用 -->
    <el-card class="about-card" shadow="never">
      <div class="about-header">
        <h2>关于诗词应用</h2>
        <p>传承中华诗词文化，感受千年文学之美</p>
      </div>
      
      <div class="about-content">
        <el-row :gutter="30">
          <el-col :xs="24" :md="12">
            <div class="section">
              <h3>项目简介</h3>
              <p>
                诗词应用是一个基于Vue 3和TypeScript构建的现代化Web应用，
                致力于为用户提供优质的中华古典诗词阅读体验。
                我们收录了从先秦到近代的经典诗词作品，
                让传统文化在数字时代焕发新的生机。
              </p>
            </div>
            
            <div class="section">
              <h3>核心功能</h3>
              <ul class="feature-list">
                <li>📚 海量诗词库，涵盖各个历史时期</li>
                <li>🔍 智能搜索，快速定位目标诗词</li>
                <li>❤️ 个人收藏，保存喜爱的作品</li>
                <li>📱 响应式设计，支持多设备访问</li>
                <li>🎨 现代化界面，提升阅读体验</li>
              </ul>
            </div>
          </el-col>
          
          <el-col :xs="24" :md="12">
            <div class="section">
              <h3>技术栈</h3>
              <div class="tech-grid">
                <div class="tech-item" v-for="tech in technologies" :key="tech.name">
                  <div class="tech-icon">
                    <el-icon :size="24" :color="tech.color">
                      <component :is="tech.icon" />
                    </el-icon>
                  </div>
                  <div class="tech-info">
                    <h4>{{ tech.name }}</h4>
                    <p>{{ tech.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <!-- 开发团队 -->
    <el-card class="team-card" shadow="never">
      <h3>开发信息</h3>
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-number">{{ stats.poems }}</div>
          <div class="stat-label">诗词总数</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">{{ stats.authors }}</div>
          <div class="stat-label">作者数量</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">{{ stats.dynasties }}</div>
          <div class="stat-label">朝代覆盖</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">{{ stats.favorites }}</div>
          <div class="stat-label">用户收藏</div>
        </div>
      </div>
    </el-card>

    <!-- 联系方式 -->
    <el-card class="contact-card" shadow="never">
      <h3>联系我们</h3>
      <div class="contact-grid">
        <div class="contact-item">
          <el-icon size="20" color="#409EFF"><Message /></el-icon>
          <span>邮箱：contact@poem-app.com</span>
        </div>
        <div class="contact-item">
          <el-icon size="20" color="#67C23A"><Link /></el-icon>
          <span>网站：https://poem-app.com</span>
        </div>
        <div class="contact-item">
          <el-icon size="20" color="#E6A23C"><Star /></el-icon>
          <span>GitHub：github.com/poem-app</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePoemStore } from '@/stores/counter'

const poemStore = usePoemStore()

// 技术栈数据
const technologies = ref([
  {
    name: 'Vue 3',
    description: '现代化前端框架',
    icon: 'Platform',
    color: '#4FC08D'
  },
  {
    name: 'TypeScript',
    description: '类型安全的JavaScript',
    icon: 'Document',
    color: '#3178C6'
  },
  {
    name: 'Element Plus',
    description: '企业级UI组件库',
    icon: 'Grid',
    color: '#409EFF'
  },
  {
    name: 'Pinia',
    description: 'Vue状态管理',
    icon: 'Connection',
    color: '#FFD43B'
  },
  {
    name: 'Vue Router',
    description: '路由管理系统',
    icon: 'Guide',
    color: '#4FC08D'
  },
  {
    name: 'Vite',
    description: '快速构建工具',
    icon: 'Lightning',
    color: '#646CFF'
  }
])

// 统计数据
const stats = ref({
  poems: 0,
  authors: 0,
  dynasties: 0,
  favorites: 0
})

// 动画计数器
const animateNumber = (target: number, key: keyof typeof stats.value) => {
  let current = 0
  const increment = target / 50
  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      current = target
      clearInterval(timer)
    }
    stats.value[key] = Math.floor(current)
  }, 30)
}

onMounted(() => {
  // 模拟数据加载后的动画效果
  setTimeout(() => {
    animateNumber(1200, 'poems')
    animateNumber(300, 'authors')
    animateNumber(15, 'dynasties')
    animateNumber(poemStore.favoritePoems.length, 'favorites')
  }, 500)
})
</script>

<style scoped>
.about {
  padding: 20px 0;
}

.about-card,
.team-card,
.contact-card {
  margin-bottom: 30px;
  border: none;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.about-header {
  text-align: center;
  margin-bottom: 40px;
}

.about-header h2 {
  font-size: 32px;
  color: #333;
  margin-bottom: 16px;
}

.about-header p {
  font-size: 18px;
  color: #666;
  margin: 0;
}

.section {
  margin-bottom: 30px;
}

.section h3 {
  font-size: 24px;
  color: #333;
  margin-bottom: 16px;
}

.section p {
  line-height: 1.8;
  color: #555;
  font-size: 16px;
}

.feature-list {
  list-style: none;
  padding: 0;
}

.feature-list li {
  padding: 8px 0;
  font-size: 16px;
  color: #555;
}

.tech-grid {
  display: grid;
  gap: 20px;
}

.tech-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #f9f9f9;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.tech-item:hover {
  background: #f0f0f0;
  transform: translateY(-2px);
}

.tech-info h4 {
  margin: 0 0 4px 0;
  font-size: 16px;
  color: #333;
}

.tech-info p {
  margin: 0;
  font-size: 14px;
  color: #666;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  margin-top: 20px;
}

.stat-item {
  text-align: center;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
}

.stat-number {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 16px;
  opacity: 0.9;
}

.contact-grid {
  display: grid;
  gap: 16px;
  margin-top: 20px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #f9f9f9;
  border-radius: 8px;
  font-size: 16px;
  color: #555;
}

@media (max-width: 768px) {
  .about-header h2 {
    font-size: 24px;
  }
  
  .about-header p {
    font-size: 16px;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  
  .stat-number {
    font-size: 24px;
  }
}
</style>