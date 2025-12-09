import { App } from 'vue'
// 导入实际 UI 组件 - 直接从 .vue 文件导入
import Button from '../../../src/components/Button/Button.vue'
import Divider from '../../../src/components/Divider/Divider.vue'
import Alert from '../../../src/components/Alert/Alert.vue'
// 导入 demoblock 内部组件
import Demo from 'vitepress-theme-demoblock/dist/client/components/Demo.vue'
import DemoBlock from 'vitepress-theme-demoblock/dist/client/components/DemoBlock.vue'

export function useComponents(app: App) {
  // 注册实际的 UI 组件
  app.component('Button', Button)
  app.component('Divider', Divider)
  app.component('Alert', Alert)
  
  // 注册 demoblock 内部组件
  app.component('Demo', Demo)
  app.component('DemoBlock', DemoBlock)
}