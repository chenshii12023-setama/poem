<template>
  <div class="ai-chat-bot">
    <div class="chat-header">
      <h3>AI诗词助手</h3>
      <button class="toggle-btn" @click="toggleChat">
        {{ isOpen ? '收起' : '展开' }}
      </button>
    </div>

    <div v-if="isOpen" class="chat-container">
      <div class="messages-container" ref="messagesContainer">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="['message', message.type]"
        >
          <div class="avatar">
            <span v-if="message.type === 'user'">👤</span>
            <span v-else>🤖</span>
          </div>
          <div class="content">
            <div class="text">{{ message.text }}</div>
            <div class="time">{{ formatTime(message.timestamp) }}</div>
          </div>
        </div>
      </div>

      <div class="input-container">
        <textarea
          v-model="inputMessage"
          placeholder="请输入您的问题..."
          @keydown.enter.prevent="sendMessage"
          rows="2"
        ></textarea>
        <button
          @click="sendMessage"
          :disabled="!inputMessage.trim() || isLoading"
          class="send-btn"
        >
          {{ isLoading ? '发送中...' : '发送' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AIChatBot',
  props: {
    poem: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      isOpen: true,
      messages: [],
      inputMessage: '',
      isLoading: false
    }
  },
  mounted() {
    if (this.poem) {
      this.addAIMessage(`您好！我是诗词AI助手，可以帮您分析《${this.poem.title}》这首诗词。您可以问我关于诗词的意境、创作背景、艺术特色等问题。`)
    } else {
      this.addAIMessage('您好！我是诗词AI助手，可以帮您赏析诗词、解答疑问。')
    }
  },
  methods: {
    toggleChat() {
      this.isOpen = !this.isOpen
    },

    async sendMessage() {
      if (!this.inputMessage.trim() || this.isLoading) return

      const userMessage = this.inputMessage.trim()
      this.addUserMessage(userMessage)
      this.inputMessage = ''
      this.isLoading = true

      try {
        await this.simulateAIResponse(userMessage)
      } catch (error) {
        console.error('AI回复出错:', error)
        this.addAIMessage('抱歉，我暂时无法回答这个问题。请稍后再试。')
      } finally {
        this.isLoading = false
      }
    },

    /** ✅ 最终修正版：支持 n8n 文本/JSON 返回 */
    async simulateAIResponse(userMessage) {
      try {
        const response = await fetch('http://localhost:5678/webhook-test/analyze-poem', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            question: userMessage,
            poem: this.poem ? {
              title: this.poem.title,
              author: this.poem.authors?.name,
              content: this.poem.content,
              dynasty: this.poem.dynasty,
              genre: this.poem.genre
            } : null,
            timestamp: new Date().toISOString()
          })
        });

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`HTTP ${response.status}: ${errText}`);
        }

        // 🔹读取文本形式，兼容 n8n 纯文本输出
        const rawText = await response.text();
        let aiResponse = '';

        // 🔹先尝试 JSON 解析，否则直接显示文本
        try {
          const json = JSON.parse(rawText);
          aiResponse =
            json.ai_response ||
            json.reply ||
            json.answer ||
            json.text ||
            json.output ||
            JSON.stringify(json);
        } catch {
          aiResponse = rawText;
        }

        // 🔹去掉多余空格和换行
        aiResponse = aiResponse.replace(/^\s+|\s+$/g, '');

        // 🔹检测 n8n 模板错误
        if (aiResponse.includes('{{ $json')) {
          aiResponse = '⚠️ 请检查 n8n 中 “Respond to Webhook” 节点的输出配置。';
        }

        // 🔹添加 AI 消息
        this.addAIMessage(aiResponse || 'AI暂无回复，请稍后再试。');
      } catch (error) {
        console.error('调用 n8n 工作流出错:', error);
        this.addAIMessage('⚠️ 无法连接到 n8n，请确保 http://localhost:5678 正在运行。');
      }
    },

    addUserMessage(text) {
      this.messages.push({
        type: 'user',
        text,
        timestamp: new Date()
      })
      this.scrollToBottom()
    },

    addAIMessage(text) {
      this.messages.push({
        type: 'ai',
        text,
        timestamp: new Date()
      })
      this.scrollToBottom()
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messagesContainer
        if (container) container.scrollTop = container.scrollHeight
      })
    },

    formatTime(timestamp) {
      return new Date(timestamp).toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }
}
</script>

<style scoped>
/* 样式保持不变 */
.ai-chat-bot {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
}
.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px 12px 0 0;
}
.chat-header h3 {
  margin: 0;
  font-size: 16px;
}
.toggle-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}
.chat-container {
  height: 400px;
  display: flex;
  flex-direction: column;
}
.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 15px;
  background: #fafafa;
}
.message {
  display: flex;
  margin-bottom: 15px;
  animation: fadeIn 0.3s ease;
}
.message.user {
  flex-direction: row-reverse;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  margin: 0 10px;
  background: #f0f0f0;
}
.message.user .avatar {
  background: #667eea;
  color: white;
}
.message.ai .avatar {
  background: #764ba2;
  color: white;
}
.content {
  max-width: 70%;
  background: white;
  padding: 12px 15px;
  border-radius: 18px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.message.user .content {
  background: #667eea;
  color: white;
}
.message.ai .content {
  background: #f0f0f0;
  color: #333;
}
.text {
  line-height: 1.4;
  word-wrap: break-word;
}
.time {
  font-size: 11px;
  opacity: 0.7;
  margin-top: 5px;
}
.input-container {
  display: flex;
  padding: 15px;
  border-top: 1px solid #e0e0e0;
  background: white;
  border-radius: 0 0 12px 12px;
}
.input-container textarea {
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 10px 15px;
  resize: none;
  font-family: inherit;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;
}
.input-container textarea:focus {
  border-color: #667eea;
}
.send-btn {
  margin-left: 10px;
  padding: 0 20px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s;
}
.send-btn:hover:not(:disabled) {
  background: #5a6fd8;
}
.send-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
@media (max-width: 768px) {
  .chat-container { height: 300px; }
  .content { max-width: 85%; }
  .input-container { flex-direction: column; gap: 10px; }
  .send-btn { margin-left: 0; align-self: flex-end; }
}
</style>
