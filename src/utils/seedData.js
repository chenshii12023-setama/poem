import { supabase } from './db.js'

// 示例作者数据
const sampleAuthors = [
  {
    name: '李白',
    intro: '唐代伟大的浪漫主义诗人，被后人誉为"诗仙"。',
    birth_year: 701,
    death_year: 762
  },
  {
    name: '杜甫',
    intro: '唐代伟大的现实主义诗人，被后人誉为"诗圣"。',
    birth_year: 712,
    death_year: 770
  }
]

// 示例诗词数据
const samplePoems = [
  {
    title: '静夜思',
    content: '床前明月光，疑是地上霜。举头望明月，低头思故乡。',
    dynasty: '唐',
    genre: '五言绝句',
    theme: '思乡'
  },
  {
    title: '春望',
    content: '国破山河在，城春草木深。感时花溅泪，恨别鸟惊心。',
    dynasty: '唐',
    genre: '五言律诗',
    theme: '爱国'
  }
]

// 插入示例数据
async function seedDatabase() {
  console.log('开始插入示例数据...')
  
  // 插入作者
  const { data: authors } = await supabase
    .from('authors')
    .insert(sampleAuthors)
    .select()
  
  console.log('已插入作者:', authors.map(a => a.name))
  
  // 为诗词添加作者ID
  const poemsWithAuthors = samplePoems.map((poem, i) => ({
    ...poem,
    author_id: authors[i].id
  }))
  
  // 插入诗词
  const { data: poems } = await supabase
    .from('poems')
    .insert(poemsWithAuthors)
    .select()
  
  console.log('已插入诗词:', poems.map(p => p.title))
  
  // 插入注释
  const annotations = [
    {
      poem_id: poems[0].id,
      content: '此诗描写了秋日夜晚，旅居在外的诗人于屋内抬头望月而思念家乡的感受。'
    },
    {
      poem_id: poems[1].id,
      content: '此诗作于唐肃宗至德二年（757年）春，当时安史之乱已经持续了一年多。'
    }
  ]
  
  await supabase
    .from('annotations')
    .insert(annotations)
  
  console.log('示例数据插入完成！')
}

seedDatabase().catch(console.error)