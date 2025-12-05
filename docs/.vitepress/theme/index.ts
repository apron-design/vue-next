import DefaultTheme from 'vitepress/theme'
import ApronDesign from '../../../src/index'
import '../../../src/styles/index.less'
import './custom.css'
import ApronDesignDemoBlock from '../components/ApronDesignDemoBlock.vue'

export default {
  extends: DefaultTheme,
  components: {
    ApronDesignDemoBlock
  },
  enhanceApp({ app }) {
    // 全局注册组件
    app.use(ApronDesign)
  },
}