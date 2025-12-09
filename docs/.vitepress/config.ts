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
            { text: 'AdAlert', link: '/components/alert' },
            { text: 'AdAvatar', link: '/components/avatar' },
            { text: 'AdBadge', link: '/components/badge' },
            { text: 'AdButton', link: '/components/button' },
            { text: 'AdCard', link: '/components/card' },
            { text: 'AdCascader', link: '/components/cascader' },
            { text: 'AdCheckbox', link: '/components/checkbox' },
            { text: 'AdCollapse', link: '/components/collapse' },
            { text: 'AdDatePicker', link: '/components/datepicker' },
            { text: 'AdDivider', link: '/components/divider' },
            { text: 'AdDrawer', link: '/components/drawer' },
            { text: 'AdEmpty', link: '/components/empty' },
            { text: 'AdForm', link: '/components/form' },
            { text: 'AdGrid', link: '/components/grid' },
            { text: 'AdImage', link: '/components/image' },
            { text: 'AdInput', link: '/components/input' },
            { text: 'AdInputOtp', link: '/components/inputotp' },
            { text: 'AdLink', link: '/components/link' },
            { text: 'AdMessage', link: '/components/message' },
            { text: 'AdModal', link: '/components/modal' },
            { text: 'AdPagination', link: '/components/pagination' },
            { text: 'AdPopover', link: '/components/popover' },
            { text: 'AdRate', link: '/components/rate' },
            { text: 'AdResponsiveModal', link: '/components/responsive-modal' },
            { text: 'AdSelect', link: '/components/select' },
            { text: 'AdSpin', link: '/components/spin' },
            { text: 'AdSteps', link: '/components/steps' },
            { text: 'AdSwitch', link: '/components/switch' },
            { text: 'AdTabs', link: '/components/tabs' },
            { text: 'AdTimeline', link: '/components/timeline' },
            { text: 'AdToast', link: '/components/toast' },
            { text: 'AdTooltip', link: '/components/tooltip' },
            { text: 'AdRadio', link: '/components/radio' },
            { text: 'AdSkeleton', link: '/components/skeleton' },
            { text: 'AdSpace', link: '/components/space' },
            { text: 'AdTag', link: '/components/tag' }
          ]
        }
      ]
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/apron-design/vue-next' }
    ]
  }
})