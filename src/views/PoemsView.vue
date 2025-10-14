<template>
  <div class="poems">
    <!-- 搜索区域 -->
    <div class="search-section">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="16">
          <el-input
            v-model="searchQuery"
            placeholder="搜索诗词、作者或朝代..."
            size="large"
            clearable
            @input="handleSearch"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </el-col>
        <el-col :xs="24" :sm="8">
          <el-select
            v-model="selectedDynasty"
            placeholder="选择朝代"
            size="large"
            clearable
            @change="handleFilter"
          >
            <el-option label="全部" value="" />
            <el-option label="唐" value="唐" />
            <el-option label="宋" value="宋" />
            <el-option label="元" value="元" />
            <el-option label="明" value="明" />
            <el-option label="清" value="清" />
          </el-select>
        </el-col>
      </el-row>
    </div>

    <!-- 诗词列表 -->
    <div class="poems-list">
      <el-row :gutter="20">
        <el-col :xs="24" :md="12" v-for="poem in filteredPoems" :key="poem.id">
          <el-card class="poem-card" shadow="hover">
            <div class="poem-header">
              <h3>{{ poem.title }}</h3>
              <div class="poem-meta">
                <el-tag size="small">{{ poem.dynasty }}</el-tag>
                <span>{{ poem.author }}</span>
              </div>
            </div>
            <div class="poem-content">
              {{ poem.content }}
            </div>
            <div class="poem-actions">
              <el-button 
                type="text" 
                @click="toggleFavorite(poem)"
                :class="{ 'is-favorite': isFavorite(poem.id) }"
              >
                <el-icon><Star /></el-icon>
                {{ isFavorite(poem.id) ? '已收藏' : '收藏' }}
              </el-button>
              <el-button type="text" @click="sharePoem(poem)">
                <el-icon><Share /></el-icon>
                分享
              </el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 加载更多 -->
    <div class="load-more" v-if="hasMore">
      <el-button @click="loadMore" :loading="loading">
        加载更多
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { usePoemStore } from '@/stores/counter'
import { ElMessage } from 'element-plus'

const poemStore = usePoemStore()

// 响应式数据
const searchQuery = ref('')
const selectedDynasty = ref('')
const loading = ref(false)
const hasMore = ref(true)

// 模拟更多诗词数据
const allPoems = ref([
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
  },
  {
    id: 3,
    title: '登鹳雀楼',
    author: '王之涣',
    dynasty: '唐',
    content: '白日依山尽，黄河入海流。欲穷千里目，更上一层楼。'
  },
  {
    id: 4,
    title: '相思',
    author: '王维',
    dynasty: '唐',
    content: '红豆生南国，春来发几枝。愿君多采撷，此物最相思。'
  },
  {
    id: 5,
    title: '水调歌头',
    author: '苏轼',
    dynasty: '宋',
    content: '明月几时有？把酒问青天。不知天上宫阙，今夕是何年。'
  }
])

// 计算过滤后的诗词
const filteredPoems = computed(() => {
  let result = allPoems.value

  // 按朝代筛选
  if (selectedDynasty.value) {
    result = result.filter(poem => poem.dynasty === selectedDynasty.value)
  }

  // 按搜索关键词筛选
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(poem => 
      poem.title.toLowerCase().includes(query) ||
      poem.author.toLowerCase().includes(query) ||
      poem.content.toLowerCase().includes(query)
    )
  }

  return result
})

// 搜索处理
const handleSearch = () => {
  // 实际项目中可以添加防抖处理
  console.log('搜索:', searchQuery.value)
}

// 筛选处理
const handleFilter = () => {
  console.log('筛选朝代:', selectedDynasty.value)
}

// 检查是否已收藏
const isFavorite = (poemId: number) => {
  return poemStore.favoritePoems.some((poem: { id: number }) => poem.id === poemId)
}

// 切换收藏状态
const toggleFavorite = (poem: any) => {
  if (isFavorite(poem.id)) {
    poemStore.removeFromFavorites(poem.id)
    ElMessage.success('已取消收藏')
  } else {
    poemStore.addToFavorites(poem)
    ElMessage.success('已添加到收藏')
  }
}

// 分享诗词
const sharePoem = (poem: any) => {
  // 实际项目中可以实现真正的分享功能
  ElMessage.info(`分享《${poem.title}》`)
}

// 加载更多
const loadMore = async () => {
  loading.value = true
  // 模拟API调用
  setTimeout(() => {
    loading.value = false
    hasMore.value = false
  }, 1000)
}

onMounted(() => {
  // 初始化数据
  poemStore.getPoems()
})
</script>

<style scoped>
.poems {
  padding: 20px 0;
}

.search-section {
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.poems-list {
  margin-bottom: 30px;
}

.poem-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.poem-header h3 {
  margin: 0;
  font-size: 20px;
  color: #333;
}

.poem-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  font-size: 14px;
}

.poem-content {
  line-height: 1.8;
  color: #555;
  margin-bottom: 20px;
  font-size: 16px;
  min-height: 60px;
}

.poem-actions {
  display: flex;
  gap: 16px;
  border-top: 1px solid #f0f0f0;
  padding-top: 16px;
}

.is-favorite {
  color: #f56c6c;
}

.load-more {
  text-align: center;
  padding: 20px;
}

@media (max-width: 768px) {
  .search-section {
    padding: 16px;
  }
  
  .poem-header {
    flex-direction: column;
    gap: 8px;
  }
  
  .poem-actions {
    justify-content: center;
  }
}
</style>