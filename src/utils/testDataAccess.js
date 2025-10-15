import { getPoems, getPoemById, searchPoems } from './db.js'

async function testDataAccess() {
  console.log('测试诗词数据访问...')
  
  try {
    // 测试获取诗词列表
    console.log('\n1. 获取诗词列表:')
    const poems = await getPoems()
    console.log(`获取到 ${poems.length} 首诗词:`)
    poems.forEach(p => console.log(`- ${p.title} (${p.authors.name})`))
    
    // 测试获取单首诗词详情
    console.log('\n2. 获取单首诗词详情:')
    const poem = await getPoemById(poems[0].id)
    console.log(`《${poem.title}》详情:`)
    console.log(`作者: ${poem.authors.name}`)
    console.log(`内容: ${poem.content}`)
    console.log(`注释: ${poem.annotations[0]?.content || '无'}`)
    
    // 测试搜索功能
    console.log('\n3. 测试搜索功能:')
    const results = await searchPoems('明月')
    console.log(`搜索"明月"找到 ${results.length} 首诗词:`)
    results.forEach(r => console.log(`- ${r.title}`))
    
  } catch (err) {
    console.error('测试失败:', err)
  }
}

testDataAccess()