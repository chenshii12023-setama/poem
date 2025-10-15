import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and Key must be set in .env file')
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false
  }
})

// 示例数据库操作函数
export async function getPoems() {
  const { data, error } = await supabase
    .from('poems')
    .select('*')
  
  if (error) throw error
  return data
}

export async function getPoemById(id) {
  const { data, error } = await supabase
    .from('poems')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data
}