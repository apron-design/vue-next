import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './custom.css'

// Import component library styles
import '../../../src/styles/index.scss'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // Register components globally if needed
  }
} satisfies Theme

