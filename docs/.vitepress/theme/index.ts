import DefaultTheme from 'vitepress/theme'
import '@apron-design/vue/styles'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 在这里可以全局注册组件
  },
}