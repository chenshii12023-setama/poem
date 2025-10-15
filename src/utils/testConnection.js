import { supabase } from './db.js'

async function testTables() {
  console.log('Testing Supabase tables access...')
  
  const tables = ['authors', 'users', 'poems', 'annotations', 'favorites', 'comments']
  
  for (const table of tables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1)
      
      if (error) {
        console.error(`❌ ${table} access failed:`, error.message)
      } else {
        console.log(`✅ ${table} accessible`)
      }
    } catch (err) {
      console.error(`Unexpected error with ${table}:`, err)
    }
  }
}

testTables()