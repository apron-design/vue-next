import DefaultTheme from 'vitepress/theme'
import ApronDesign from '../../../src/index'
import '../../../src/styles/index.less'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 全局注册组件
    app.use(ApronDesign)
  },
}