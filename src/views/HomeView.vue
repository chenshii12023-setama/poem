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
        <el-col :xs="24" :md="8" v-for="poem in recommendedPoems" :key="poem.id">
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
      <el-pagination
        v-model:current-page="currentPage"
        :page-size="pageSize"
        :total="totalPoems"
        layout="prev, pager, next"
        @current-change="handlePageChange"
        class="pagination"
        :hide-on-single-page="true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePoemStore } from '@/stores/counter'
import { ElMessage, ElLoading } from 'element-plus'
import { getPoems, supabase } from '@/utils/db'

interface Author {
  name?: string
  dynasty?: string
}

interface Poem {
  id: number
  title: string
  author: string
  dynasty: string
  content: string
}

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
const recommendedPoems = ref<Poem[]>([])
const loading = ref(false)
const error = ref<Error | null>(null)
const currentPage = ref(1)
const pageSize = 6
const totalPoems = ref(0)

// 跳转到诗词页面
const goToPoems = () => {
  router.push('/poems')
}

// 添加到收藏
const addToFavorites = (poem: any) => {
  poemStore.addToFavorites(poem)
  ElMessage.success('已添加到收藏')
}

interface PoemResponse {
  data: Poem[]
  count: number
}

const allPoems = ref<Poem[]>([])

const fetchPoems = async (page = 1) => {
  loading.value = true
  try {
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1
    
    const { data: poems, error, count } = await supabase
      .from('poems')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to)

    if (!error) {
      recommendedPoems.value = poems.map(p => ({
        id: p.id,
        title: p.title,
        author: p.author || '未知',
        dynasty: p.dynasty || '未知',
        content: p.content.split('。').join('。')
      }))
      totalPoems.value = count || 0
    } else {
      throw error
    }
  } catch (err) {
    error.value = err instanceof Error ? err : new Error(String(err))
    ElMessage.error('获取诗词数据失败')
  } finally {
    loading.value = false
  }
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  fetchPoems(page)
}

onMounted(() => {
  fetchPoems()
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

.pagination {
  margin-top: 20px;
  justify-content: center;
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