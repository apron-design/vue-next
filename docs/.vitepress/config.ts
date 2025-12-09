import { defineConfig } from 'vitepress'
import { demoblockPlugin } from 'vitepress-theme-demoblock'
import { demoblockVitePlugin } from 'vitepress-theme-demoblock'
import { resolve } from 'path'

export default defineConfig({
  base: '/vue-next/',
  vite: {
    // @ts-ignore - demoblockVitePlugin type compatibility
    plugins: [demoblockVitePlugin()],
    server: {
      port: 8001
    },
    resolve: {
      alias: {
        '@apron-design/vue-next': resolve(__dirname, '../../src/index.ts'),
        '@apron-design/vue-next/': resolve(__dirname, '../../src/')
      }
    }
  },
  markdown: {
    config: (md) => {
      md.use(demoblockPlugin)
    }
  },
  title: 'Apron Design Vue',
  description: 'A modern, intelligent Vue 3 component library built with TypeScript and Less.',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'Components', link: '/components/alert' }
    ],
    
    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Getting Started', link: '/guide/' },
            { text: 'Installation', link: '/guide/installation' }
          ]
        }
      ],
      '/components/': [
        {
          text: 'Components',
          items: [
            { text: 'Alert', link: '/components/alert' },
            { text: 'Avatar', link: '/components/avatar' },
            { text: 'Badge', link: '/components/badge' },
            { text: 'Button', link: '/components/button' },
            { text: 'Card', link: '/components/card' },
            { text: 'Cascader', link: '/components/cascader' },
            { text: 'Checkbox', link: '/components/checkbox' },
            { text: 'Collapse', link: '/components/collapse' },
            { text: 'DatePicker', link: '/components/datepicker' },
            { text: 'Divider', link: '/components/divider' },
            { text: 'Drawer', link: '/components/drawer' },
            { text: 'Empty', link: '/components/empty' },
            { text: 'Form', link: '/components/form' },
            { text: 'Grid', link: '/components/grid' },
            { text: 'Image', link: '/components/image' },
            { text: 'Input', link: '/components/input' },
            { text: 'InputOtp', link: '/components/inputotp' },
            { text: 'Link', link: '/components/link' },
            { text: 'Message', link: '/components/message' },
            { text: 'Modal', link: '/components/modal' },
            { text: 'Pagination', link: '/components/pagination' },
            { text: 'Popover', link: '/components/popover' },
            { text: 'Rate', link: '/components/rate' },
            { text: 'ResponsiveModal', link: '/components/responsive-modal' },
            { text: 'Select', link: '/components/select' },
            { text: 'Spin', link: '/components/spin' },
            { text: 'Steps', link: '/components/steps' },
            { text: 'Switch', link: '/components/switch' },
            { text: 'Tabs', link: '/components/tabs' },
            { text: 'Timeline', link: '/components/timeline' },
            { text: 'Toast', link: '/components/toast' },
            { text: 'Tooltip', link: '/components/tooltip' },
            { text: 'Radio', link: '/components/radio' },
            { text: 'Skeleton', link: '/components/skeleton' },
            { text: 'Space', link: '/components/space' },
            { text: 'Tag', link: '/components/tag' }
          ]
        }
      ]
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/apron-design/vue-next' }
    ]
  }
})