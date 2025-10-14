import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Poem } from '../types/poem.d.ts'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

// 诗词相关的store
export const usePoemStore = defineStore('poem', () => {
  const poems = ref<Poem[]>([])
  const favoritePoems = ref<Poem[]>([])
  
  // 获取诗词列表
  const getPoems = () => {
    // 这里可以调用API获取数据
    poems.value = [
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
    ]
  }
  
  // 添加到收藏
  const addToFavorites = (poem: Poem) => {
    if (!favoritePoems.value.find((p: { id: any }) => p.id === poem.id)) {
      favoritePoems.value.push(poem)
    }
  }
  
  // 从收藏中移除
  const removeFromFavorites = (poemId: number) => {
    const index = favoritePoems.value.findIndex((p: { id: number }) => p.id === poemId)
    if (index > -1) {
      favoritePoems.value.splice(index, 1)
    }
  }

  return { 
    poems, 
    favoritePoems, 
    getPoems, 
    addToFavorites, 
    removeFromFavorites 
  }
})