import { defineConfig } from 'vitepress'
import { demoblockPlugin, demoblockVitePlugin } from 'vitepress-theme-demoblock'

import { resolve } from 'path'

export default defineConfig({
  base: '/vue-next/',
  vite: {
    server: {
      port: 8001
    },
    resolve: {
      alias: {
        '@apron-design/vue-next': resolve(__dirname, '../../src')
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
            { text: 'Button', link: '/components/button' },
            { text: 'Divider', link: '/components/divider' }
          ]
        }
      ]
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/apron-design/vue-next' }
    ]
  }
})