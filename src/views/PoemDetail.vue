<template>
  <div class="poem-detail" v-if="poem">
    <button class="back-btn" @click="$router.go(-1)">返回</button>
    
    <div class="poem-header">
      <h1>{{ poem.title }}</h1>
      <p class="author">{{ poem.authors?.name }}</p>
    </div>
    
    <div class="poem-content">
      <pre>{{ poem.content }}</pre>
    </div>
    
    <div class="poem-meta">
      <span>{{ poem.dynasty }}·{{ poem.genre }}</span>
      <button 
        class="favorite-btn" 
        @click="toggleFavorite"
      >
        {{ isFavorite ? '已收藏' : '收藏' }}
      </button>
    </div>
    
    <div class="annotations">
      <h3>注释</h3>
      <p v-for="anno in poem.annotations" :key="anno.id">
        {{ anno.content }}
      </p>
    </div>
    
    <div class="comments">
      <h3>评论</h3>
      <div class="comment-form">
        <textarea v-model="newComment" placeholder="写下你的评论..."></textarea>
        <button @click="submitComment">提交</button>
      </div>
      
      <div class="comment-list">
        <div v-for="comment in poem.comments" :key="comment.id" class="comment">
          <div class="user">{{ comment.users?.username || '匿名用户' }}</div>
          <div class="content">{{ comment.content }}</div>
          <div class="time">{{ formatDate(comment.created_at) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let dbUtils = null

async function loadDbUtils() {
  if (!dbUtils) {
    dbUtils = await import('@/utils/db')
  }
  return dbUtils
}

export default {
  data() {
    return {
      poem: null,
      isFavorite: false,
      newComment: ''
    }
  },
  async created() {
    await this.fetchPoem()
  },
  methods: {
    async fetchPoem() {
      this.poem = await getPoemById(this.$route.params.id)
      // TODO: 检查是否已收藏
    },
    async toggleFavorite() {
      // TODO: 获取当前用户ID
      const userId = 'current-user-id'
      await toggleFavorite(userId, this.poem.id)
      this.isFavorite = !this.isFavorite
    },
    async submitComment() {
      if (!this.newComment.trim()) return
      
      // TODO: 获取当前用户ID
      const userId = 'current-user-id'
      await addComment(userId, this.poem.id, this.newComment)
      this.newComment = ''
      await this.fetchPoem() // 刷新评论
    },
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleString()
    }
  }
}
</script>

<style scoped>
.poem-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.back-btn {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  margin-bottom: 20px;
}

.poem-header {
  text-align: center;
  margin-bottom: 30px;
}

.poem-header h1 {
  font-size: 28px;
  margin-bottom: 5px;
}

.author {
  color: #666;
  font-size: 16px;
}

.poem-content {
  margin: 30px 0;
  font-size: 18px;
  line-height: 1.8;
  white-space: pre-wrap;
}

.poem-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  color: #888;
}

.favorite-btn {
  padding: 5px 15px;
  background: #f0f0f0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.annotations {
  margin: 40px 0;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
}

.annotations h3, .comments h3 {
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.comment-form {
  margin: 20px 0;
}

.comment-form textarea {
  width: 100%;
  padding: 10px;
  min-height: 80px;
  margin-bottom: 10px;
}

.comment-form button {
  padding: 8px 16px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.comment {
  margin: 15px 0;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 4px;
}

.comment .user {
  font-weight: bold;
  margin-bottom: 5px;
}

.comment .time {
  font-size: 12px;
  color: #888;
  margin-top: 5px;
}
</style>