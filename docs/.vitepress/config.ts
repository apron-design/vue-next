import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Apron Design Vue',
  description: '一个现代化的 Vue 3 组件库',
  lang: 'zh-CN',
  
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    
    nav: [
      { text: '指南', link: '/guide/introduction' },
      { text: '组件', link: '/components/button' },
      { 
        text: '1.0.0',
        items: [
          { text: '更新日志', link: '/changelog' },
          { text: 'GitHub', link: 'https://github.com/apron-design/vue' }
        ]
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '介绍', link: '/guide/introduction' },
            { text: '快速开始', link: '/guide/quickstart' },
            { text: '暗黑模式', link: '/guide/dark-mode' },
            { text: '国际化', link: '/guide/i18n' }
          ]
        }
      ],
      '/components/': [
        {
          text: '基础组件',
          items: [
            { text: 'Button 按钮', link: '/components/button' },
            { text: 'Alert 警告', link: '/components/alert' },
            { text: 'Badge 徽标', link: '/components/badge' },
            { text: 'Tag 标签', link: '/components/tag' },
            { text: 'Link 链接', link: '/components/link' },
            { text: 'Divider 分割线', link: '/components/divider' }
          ]
        },
        {
          text: '表单组件',
          items: [
            { text: 'Input 输入框', link: '/components/input' },
            { text: 'InputOtp 验证码', link: '/components/input-otp' },
            { text: 'Checkbox 复选框', link: '/components/checkbox' },
            { text: 'Radio 单选框', link: '/components/radio' },
            { text: 'Switch 开关', link: '/components/switch' },
            { text: 'Select 选择器', link: '/components/select' },
            { text: 'Cascader 级联选择', link: '/components/cascader' },
            { text: 'DatePicker 日期选择', link: '/components/date-picker' },
            { text: 'Rate 评分', link: '/components/rate' },
            { text: 'Form 表单', link: '/components/form' }
          ]
        },
        {
          text: '数据展示',
          items: [
            { text: 'Avatar 头像', link: '/components/avatar' },
            { text: 'Card 卡片', link: '/components/card' },
            { text: 'Collapse 折叠面板', link: '/components/collapse' },
            { text: 'Empty 空状态', link: '/components/empty' },
            { text: 'Timeline 时间线', link: '/components/timeline' },
            { text: 'Image 图片', link: '/components/image' },
            { text: 'Skeleton 骨架屏', link: '/components/skeleton' }
          ]
        },
        {
          text: '反馈组件',
          items: [
            { text: 'Modal 对话框', link: '/components/modal' },
            { text: 'Drawer 抽屉', link: '/components/drawer' },
            { text: 'Toast 轻提示', link: '/components/toast' },
            { text: 'Message 消息', link: '/components/message' },
            { text: 'Tooltip 文字提示', link: '/components/tooltip' },
            { text: 'Popover 气泡卡片', link: '/components/popover' },
            { text: 'Spin 加载', link: '/components/spin' }
          ]
        },
        {
          text: '导航组件',
          items: [
            { text: 'Tabs 标签页', link: '/components/tabs' },
            { text: 'Steps 步骤条', link: '/components/steps' },
            { text: 'Pagination 分页', link: '/components/pagination' }
          ]
        },
        {
          text: '布局组件',
          items: [
            { text: 'Grid 栅格', link: '/components/grid' },
            { text: 'Space 间距', link: '/components/space' }
          ]
        },
        {
          text: '其他',
          items: [
            { text: 'ResponsiveModal 响应式弹窗', link: '/components/responsive-modal' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/apron-design/vue' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 Apron Design Team'
    },

    search: {
      provider: 'local'
    },

    outline: {
      label: '页面导航'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    lastUpdated: {
      text: '最后更新于'
    },

    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
  }
})

