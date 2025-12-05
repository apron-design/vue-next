# ResponsiveModal 响应式弹窗

根据屏幕宽度自动切换显示为 Modal 或 Drawer 的响应式弹窗组件。

## 基础用法

在桌面端显示为居中的 Modal，在移动端显示为底部滑出的 Drawer。

```vue
<script setup>
import { ref } from 'vue'
import { ResponsiveModal, Button } from '@apron-design/vue'

const open = ref(false)
</script>

<template>
  <Button @click="open = true">打开响应式弹窗</Button>
  
  <ResponsiveModal v-model:open="open" title="响应式弹窗">
    <p>调整浏览器窗口大小，查看不同显示效果。</p>
    <p>在宽度小于 768px 时会显示为底部抽屉。</p>
  </ResponsiveModal>
</template>
```

## 自定义断点

通过 `breakpoint` 属性设置切换断点。

```vue
<script setup>
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <Button @click="open = true">自定义断点</Button>
  
  <ResponsiveModal 
    v-model:open="open" 
    title="自定义断点"
    :breakpoint="1024"
  >
    <p>当屏幕宽度小于 1024px 时显示为抽屉。</p>
  </ResponsiveModal>
</template>
```

## 自定义宽度

```vue
<script setup>
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <Button @click="open = true">宽弹窗</Button>
  
  <ResponsiveModal 
    v-model:open="open" 
    title="宽弹窗"
    :width="800"
  >
    <p>这是一个宽度为 800px 的弹窗。</p>
  </ResponsiveModal>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| open (v-model) | 是否显示 | `boolean` | `false` |
| title | 标题 | `string` | - |
| closable | 是否显示关闭按钮 | `boolean` | `true` |
| closeByOverlay | 点击遮罩是否关闭 | `boolean` | `true` |
| width | 宽度（桌面端 Modal） | `string \| number` | `480` |
| okText | 确认按钮文字 | `string` | `'确定'` |
| cancelText | 取消按钮文字 | `string` | `'取消'` |
| okButtonProps | 确认按钮属性 | `ButtonProps` | - |
| cancelButtonProps | 取消按钮属性 | `ButtonProps` | - |
| showCancel | 是否显示取消按钮 | `boolean` | `true` |
| breakpoint | 切换断点（px） | `number` | `768` |

### Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| update:open | 显示状态变化时触发 | `(open: boolean) => void` |
| close | 关闭时触发 | `() => void` |
| ok | 点击确定时触发 | `() => void` |
| cancel | 点击取消时触发 | `() => void` |
| afterOpenChange | 打开/关闭动画结束后触发 | `(open: boolean) => void` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 内容 |
| header | 自定义标题区域 |
| footer | 自定义页脚区域 |

