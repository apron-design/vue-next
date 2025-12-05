# 暗黑模式

Apron Design Vue 内置了完整的暗黑模式支持，你可以轻松地在亮色和暗色主题之间切换。

## 基础用法

只需在 HTML 根元素上添加 `data-theme="dark"` 属性即可启用暗黑模式：

```html
<html data-theme="dark">
  <!-- 你的应用内容 -->
</html>
```

## 动态切换

你可以通过 JavaScript 动态切换主题：

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { Button, Switch } from '@apron-design/vue'

const isDark = ref(false)

watchEffect(() => {
  document.documentElement.setAttribute(
    'data-theme',
    isDark.value ? 'dark' : 'light'
  )
})
</script>

<template>
  <div class="theme-switch">
    <span>暗黑模式</span>
    <Switch v-model="isDark" />
  </div>
</template>
```

## 跟随系统

你也可以让主题跟随用户的系统设置：

```ts
// 检测系统主题偏好
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')

// 设置初始主题
document.documentElement.setAttribute(
  'data-theme',
  prefersDark.matches ? 'dark' : 'light'
)

// 监听系统主题变化
prefersDark.addEventListener('change', (e) => {
  document.documentElement.setAttribute(
    'data-theme',
    e.matches ? 'dark' : 'light'
  )
})
```

## 结合 VueUse

如果你使用 [VueUse](https://vueuse.org/)，可以使用 `useDark` 和 `useToggle` 来简化主题切换：

```vue
<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark({
  attribute: 'data-theme',
  valueDark: 'dark',
  valueLight: 'light',
})

const toggleDark = useToggle(isDark)
</script>

<template>
  <button @click="toggleDark()">
    {{ isDark ? '🌙' : '☀️' }}
  </button>
</template>
```

## 自定义主题色

你可以通过覆盖 CSS 变量来自定义主题色：

```css
:root {
  /* 亮色主题 */
  --apron-color-primary: #393939;
  --apron-color-primary-hover: #2b2b2b;
  --apron-color-primary-active: #1d1d1d;
}

[data-theme='dark'] {
  /* 暗色主题 */
  --apron-color-primary: #fafafa;
  --apron-color-primary-hover: #e4e4e7;
  --apron-color-primary-active: #d4d4d8;
}
```

## CSS 变量列表

以下是主要的 CSS 变量：

| 变量名 | 说明 | 亮色默认值 | 暗色默认值 |
| --- | --- | --- | --- |
| `--apron-color-primary` | 主色 | `#393939` | `#fafafa` |
| `--apron-color-text` | 文本色 | `#18181b` | `#fafafa` |
| `--apron-color-text-secondary` | 次要文本色 | `#71717a` | `#a1a1aa` |
| `--apron-color-bg` | 背景色 | `#ffffff` | `#18181b` |
| `--apron-color-bg-secondary` | 次要背景色 | `#f4f4f5` | `#27272a` |
| `--apron-color-border` | 边框色 | `#e4e4e7` | `#3f3f46` |
| `--apron-color-success` | 成功色 | `#22c55e` | `#22c55e` |
| `--apron-color-warning` | 警告色 | `#f59e0b` | `#f59e0b` |
| `--apron-color-error` | 错误色 | `#ef4444` | `#ef4444` |

