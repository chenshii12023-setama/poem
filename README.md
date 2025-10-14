# 诗词应用 (Poem App)

一个基于Vue 3 + TypeScript的现代化诗词应用，使用Composition API和最新的前端技术栈构建。

## 项目特性

### 技术栈
- **Vue 3** - 使用Composition API和setup语法糖
- **TypeScript** - 提供类型检查，提高代码质量
- **Vue Router** - 路由管理和页面导航
- **Pinia** - 状态管理（Vue 3推荐）
- **Vite** - 现代化构建工具，快速开发体验
- **Element Plus** - 企业级UI组件库
- **ESLint + Prettier** - 代码规范和格式化

### 功能特性
- 📱 响应式设计，支持多设备访问
- 🎨 现代化UI界面
- 🔍 诗词搜索和浏览
- 📚 诗词分类管理
- ❤️ 收藏功能
- 🔐 用户认证系统
- 🌙 深色模式支持

## 项目结构

```
poem-app/
├── public/                 # 静态资源
├── src/
│   ├── assets/            # 资源文件
│   ├── components/        # 公共组件
│   ├── views/            # 页面组件
│   ├── router/           # 路由配置
│   ├── stores/           # Pinia状态管理
│   ├── utils/            # 工具函数
│   ├── types/            # TypeScript类型定义
│   ├── App.vue           # 根组件
│   └── main.ts           # 入口文件
├── package.json          # 项目依赖
├── vite.config.ts        # Vite配置
├── tsconfig.json         # TypeScript配置
└── README.md            # 项目说明
```

## 快速开始

### 环境要求
- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 代码检查
```bash
npm run lint
```

### 代码格式化
```bash
npm run format
```

## 开发规范

### 组件开发
- 使用Vue 3的Composition API
- 优先使用setup语法糖
- 组件命名采用PascalCase
- 文件命名采用kebab-case

### 代码风格
- 使用TypeScript进行类型检查
- 遵循ESLint规则
- 使用Prettier进行代码格式化
- 编写详细的代码注释

### 状态管理
- 使用Pinia进行状态管理
- 按功能模块组织store
- 合理使用响应式API（ref、reactive）

### 路由管理
- 使用Vue Router进行页面导航
- 实现路由守卫和权限控制
- 支持路由懒加载

## 项目目标

本项目旨在创建一个现代化的诗词应用，为用户提供：

1. **诗词浏览** - 展示经典诗词作品
2. **搜索功能** - 快速查找感兴趣的诗词
3. **分类管理** - 按朝代、作者、主题分类
4. **个人收藏** - 收藏喜爱的诗词
5. **用户系统** - 个人账户和偏好设置

## 开发计划

### 第一阶段 - 基础功能
- [x] 项目初始化和环境配置
- [ ] 基础页面结构搭建
- [ ] 路由配置和导航
- [ ] 基础组件开发

### 第二阶段 - 核心功能
- [ ] 诗词数据管理
- [ ] 搜索功能实现
- [ ] 分类和筛选
- [ ] 响应式布局优化

### 第三阶段 - 高级功能
- [ ] 用户认证系统
- [ ] 收藏和个人中心
- [ ] 深色模式
- [ ] 性能优化

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

---

*本项目遵循Vue.js最佳实践，致力于提供优质的代码质量和用户体验。*