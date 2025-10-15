import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and Key must be set in .env file')
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false
  }
})

// 诗词相关操作
export async function getPoems(page = 1, limit = 10) {
  const { data, error } = await supabase
    .from('poems')
    .select('*, authors(*)')
    .range((page-1)*limit, page*limit-1)
  
  if (error) throw error
  return data
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