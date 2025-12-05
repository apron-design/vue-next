# 快速开始

本节将介绍如何在项目中使用 Apron Design Vue 组件库。

## 安装

::: code-group

```bash [npm]
npm install @apron-design/vue
```

```bash [yarn]
yarn add @apron-design/vue
```

```bash [pnpm]
pnpm add @apron-design/vue
```

:::

## 完整引入

如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。

```ts
// main.ts
import { createApp } from 'vue'
import ApronDesign from '@apron-design/vue'
import '@apron-design/vue/styles'
import App from './App.vue'

const app = createApp(App)
app.use(ApronDesign)
app.mount('#app')
```

## 按需引入

按需引入可以有效减少打包体积。

```vue
<script setup lang="ts">
import { Button, Modal, Toast } from '@apron-design/vue'
import '@apron-design/vue/styles'
</script>

<template>
  <Button variant="primary" @click="handleClick">
    点击我
  </Button>
</template>
```

## Volar 支持

如果你使用 Volar，可以在 `tsconfig.json` 中添加类型声明以获得更好的类型提示：

```json
{
  "compilerOptions": {
    "types": ["@apron-design/vue/global"]
  }
}
```

## 开始使用

现在你可以启动项目了：

::: code-group

```bash [npm]
npm run dev
```

```bash [yarn]
yarn dev
```

```bash [pnpm]
pnpm dev
```

:::

访问 `/` 查看效果。

## 第一个组件

让我们创建一个简单的页面：

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Button, Modal, Toast } from '@apron-design/vue'

const modalOpen = ref(false)

const showToast = () => {
  Toast.success('操作成功！')
}

const handleOk = () => {
  modalOpen.value = false
  showToast()
}
</script>

<template>
  <div class="demo">
    <Button variant="primary" @click="modalOpen = true">
      打开对话框
    </Button>

    <Modal
      v-model:open="modalOpen"
      title="欢迎使用"
      @ok="handleOk"
    >
      <p>感谢你选择 Apron Design Vue！</p>
    </Modal>
  </div>
</template>

<style scoped>
.demo {
  padding: 24px;
}
</style>
```

## 下一步

- 查看 [组件文档](/components/button) 了解所有可用组件
- 了解如何配置 [暗黑模式](/guide/dark-mode)
- 探索 [国际化](/guide/i18n) 方案

