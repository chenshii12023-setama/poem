import { supabase } from '../utils/db'

export async function getPoems() {
  const { data, error } = await supabase
    .from('poems')
    .select(`
      id,
      title,
      content,
      dynasty,
      genre,
      theme,
      authors(name)
    `)
    .order('id', { ascending: true })

  if (error) throw error
  return data
}

export async function searchPoems(query) {
  const { data, error } = await supabase
    .from('poems')
    .select(`
      id,
      title,
      content,
      dynasty,
      genre,
      theme,
      authors(name)
    `)
    .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
    .order('id', { ascending: true })

  if (error) throw error
  return data
}