import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Apron Design Vue',
  description: 'A modern, intelligent Vue 3 component library built with TypeScript and Less',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/introduction' },
      { text: '组件', link: '/components/button' },
      { text: '更新日志', link: '/changelog.md' },
    ],
    sidebar: {
      '/guide/': [
        { text: '介绍', link: '/guide/introduction' },
        { text: '快速开始', link: '/guide/quickstart' },
        { text: '暗黑模式', link: '/guide/dark-mode' },
        { text: '国际化', link: '/guide/i18n' },
      ],
      '/components/': [
        { text: '基础组件', items: [
          { text: 'Button 按钮', link: '/components/button' },
          { text: 'Link 链接', link: '/components/link' },
          { text: 'Badge 徽章', link: '/components/badge' },
          { text: 'Tag 标签', link: '/components/tag' },
          { text: 'Avatar 头像', link: '/components/avatar' },
        ]},
        { text: '表单组件', items: [
          { text: 'Input 输入框', link: '/components/input' },
          { text: 'InputOtp 验证码', link: '/components/input-otp' },
          { text: 'Select 选择器', link: '/components/select' },
          { text: 'Checkbox 复选框', link: '/components/checkbox' },
          { text: 'Radio 单选框', link: '/components/radio' },
          { text: 'Switch 开关', link: '/components/switch' },
          { text: 'Rate 评分', link: '/components/rate' },
          { text: 'Form 表单', link: '/components/form' },
        ]},
        { text: '数据展示', items: [
          { text: 'Card 卡片', link: '/components/card' },
          { text: 'Image 图片', link: '/components/image' },
          { text: 'Grid 网格', link: '/components/grid' },
          { text: 'Space 间距', link: '/components/space' },
          { text: 'Divider 分割线', link: '/components/divider' },
          { text: 'Empty 空状态', link: '/components/empty' },
          { text: 'Skeleton 骨架屏', link: '/components/skeleton' },
          { text: 'Timeline 时间线', link: '/components/timeline' },
        ]},
        { text: '反馈组件', items: [
          { text: 'Modal 模态框', link: '/components/modal' },
          { text: 'Drawer 抽屉', link: '/components/drawer' },
          { text: 'ResponsiveModal 响应式模态框', link: '/components/responsive-modal' },
          { text: 'Message 消息提示', link: '/components/message' },
          { text: 'Toast 轻提示', link: '/components/toast' },
          { text: 'Alert 警告', link: '/components/alert' },
          { text: 'Spin 加载', link: '/components/spin' },
        ]},
        { text: '导航组件', items: [
          { text: 'Tabs 标签页', link: '/components/tabs' },
          { text: 'Steps 步骤条', link: '/components/steps' },
          { text: 'Pagination 分页', link: '/components/pagination' },
          { text: 'Collapse 折叠面板', link: '/components/collapse' },
        ]},
        { text: '工具组件', items: [
          { text: 'Popover 弹出框', link: '/components/popover' },
          { text: 'Tooltip 提示', link: '/components/tooltip' },
          { text: 'Cascader 级联选择', link: '/components/cascader' },
          { text: 'DatePicker 日期选择', link: '/components/date-picker' },
        ]},
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/apron-design/vue' },
    ],
  },
  vite: {
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
  },
})