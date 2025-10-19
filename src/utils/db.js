import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

// 提供默认值用于演示，实际部署时需要设置环境变量
const demoUrl = 'https://fddcpkytlhkiuynekjrh.supabase.co'
const demoKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkZGNwa3l0bGhraXV5bmVranJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NjgzNTUsImV4cCI6MjA3NjA0NDM1NX0.UcDnwdYTBbQikXP2-xxqf2IVmnCHHQLORH2B44cU1XI'

const finalUrl = supabaseUrl || demoUrl
const finalKey = supabaseKey || demoKey

export const supabase = createClient(finalUrl, finalKey, {
  auth: {
    persistSession: false
  }
})

// 诗词相关操作
export async function getPoems(page = 1, limit = 10) {
  const { data, error, count } = await supabase
    .from('poems')
    .select('*, authors(*)', { count: 'exact' })
    .range((page-1)*limit, page*limit-1)
  
  if (error) throw error
  return { data, count }
}

export async function getPoemById(id) {
  const { data, error } = await supabase
    .from('poems')
    .select('*, authors(*), annotations(*), comments(*, users(*))')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data
}

export async function searchPoems(query) {
  const { data, error } = await supabase
    .from('poems')
    .select('*, authors(*)')
    .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
  
  if (error) throw error
  return data
}

// 作者相关操作
export async function getAuthors() {
  const { data, error } = await supabase
    .from('authors')
    .select('*')
  
  if (error) throw error
  return data
}

// 用户相关操作
export async function createUser(email, password, username) {
  const { data, error } = await supabase
    .from('users')
    .insert([{ email, password_hash: password, username }])
    .select()
    .single()
  
  if (error) throw error
  return data
}

// 评论相关操作
export async function addComment(userId, poemId, content, parentId = null) {
  const { data, error } = await supabase
    .from('comments')
    .insert([{ user_id: userId, poem_id: poemId, content, parent_id: parentId }])
    .select()
    .single()
  
  if (error) throw error
  return data
}

// 收藏相关操作
export async function toggleFavorite(userId, poemId) {
  // 检查是否已收藏
  const { data: existing } = await supabase
    .from('favorites')
    .select()
    .eq('user_id', userId)
    .eq('poem_id', poemId)
  
  if (existing?.length > 0) {
    // 取消收藏
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('poem_id', poemId)
    
    if (error) throw error
    return { action: 'removed' }
  } else {
    // 添加收藏
    const { error } = await supabase
      .from('favorites')
      .insert([{ user_id: userId, poem_id: poemId }])
    
    if (error) throw error
    return { action: 'added' }
  }
}