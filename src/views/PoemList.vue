<template>
  <div class="poem-list">
    <h1>诗词赏析</h1>
    
    <!-- AI对话机器人组件 -->
    <AIChatBot />
    
    <div class="search-box">
      <input 
        v-model="searchQuery" 
        placeholder="搜索诗词或作者..."
        @input="searchPoems"
      />
    </div>
    
    <div class="poem-grid">
      <div 
        v-for="poem in poems" 
        :key="poem.id" 
        class="poem-card"
        @click="viewPoemDetail(poem.id)"
      >
        <h3>{{ poem.title }}</h3>
        <p class="author">{{ poem.authors?.name }}</p>
        <p class="content">{{ poem.content.substring(0, 20) }}...</p>
        <div class="meta">
          <span>{{ poem.dynasty }}·{{ poem.genre }}</span>
        </div>
      </div>
    </div>
    
    <div class="pagination">
      <button @click="prevPage" :disabled="page === 1">上一页</button>
      <span>第 {{ page }} 页</span>
      <button @click="nextPage" :disabled="page >= Math.ceil(totalCount / limit)">下一页</button>
    </div>
  </div>
</template>

<script>
import { createClient } from '@supabase/supabase-js'
import { ElMessage } from 'element-plus'
import AIChatBot from '@/components/AIChatBot.vue'

const supabaseUrl = 'https://fddcpkytlhkiuynekjrh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkZGNwa3l0bGhraXV5bmVranJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NjgzNTUsImV4cCI6MjA3NjA0NDM1NX0.UcDnwdYTBbQikXP2-xxqf2IVmnCHHQLORH2B44cU1XI'
const supabase = createClient(supabaseUrl, supabaseKey)

export default {
  components: {
    AIChatBot
  },
  data() {
    return {
      poems: [],
      page: 1,
      limit: 9,
      totalCount: 0,
      searchQuery: ''
    }
  },
  async created() {
    await this.fetchPoems()
  },
  methods: {
    async fetchPoems() {
      try {
        const from = (this.page - 1) * this.limit
        const to = from + this.limit - 1
        
        const { data, error, count } = await supabase
          .from('poems')
          .select('*', { count: 'exact' })
          .order('created_at', { ascending: false })
          .range(from, to)

        if (error) throw error
        
        this.poems = data || []
        this.totalCount = count || 0
        
      } catch (err) {
        console.error('获取诗词失败:', err)
        ElMessage.error('获取诗词数据失败，请稍后重试')
        this.poems = []
      }
    },
    async searchPoems() {
      if (this.searchQuery.trim()) {
        this.poems = await searchPoems(this.searchQuery)
      } else {
        await this.fetchPoems()
      }
    },
    viewPoemDetail(id) {
      this.$router.push(`/poems/${id}`)
    },
    async nextPage() {
      this.page++
      await this.fetchPoems()
    },
    async prevPage() {
      if (this.page > 1) {
        this.page--
        await this.fetchPoems()
      }
    }
  }
}
</script>

<style scoped>
.poem-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.search-box {
  margin: 20px 0;
}

.search-box input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
}

.poem-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.poem-card {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s;
}

.poem-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.poem-card h3 {
  margin: 0 0 10px;
  color: #333;
}

.poem-card .author {
  color: #666;
  font-size: 14px;
  margin: 5px 0;
}

.poem-card .content {
  color: #444;
  line-height: 1.6;
}

.poem-card .meta {
  margin-top: 10px;
  font-size: 12px;
  color: #888;
}

.pagination {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.pagination button {
  padding: 8px 16px;
  background: #f0f0f0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>