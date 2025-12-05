# Drawer 抽屉

屏幕边缘滑出的浮层面板。

## 基础用法

```vue
<script setup>
import { ref } from 'vue'
import { Drawer, Button } from '@apron-design/vue'

const open = ref(false)
</script>

<template>
  <Button @click="open = true">打开抽屉</Button>
  
  <Drawer v-model:open="open" title="基础抽屉">
    <p>这是抽屉的内容...</p>
  </Drawer>
</template>
```

## 不同方向

抽屉可以从 `top`、`right`、`bottom`、`left` 四个方向滑出。

```vue
<script setup>
import { ref } from 'vue'

const open = ref(false)
const placement = ref('right')

const showDrawer = (p) => {
  placement.value = p
  open.value = true
}
</script>

<template>
  <div class="demo-row">
    <Button @click="showDrawer('top')">上</Button>
    <Button @click="showDrawer('right')">右</Button>
    <Button @click="showDrawer('bottom')">下</Button>
    <Button @click="showDrawer('left')">左</Button>
  </div>
  
  <Drawer v-model:open="open" :placement="placement" title="抽屉标题">
    <p>从 {{ placement }} 方向滑出的抽屉</p>
  </Drawer>
</template>
```

## 自定义尺寸

通过 `width`（左右方向）或 `height`（上下方向）设置抽屉尺寸。

```vue
<script setup>
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <Button @click="open = true">大抽屉</Button>
  
  <Drawer v-model:open="open" title="大抽屉" :width="600">
    <p>宽度为 600px 的抽屉</p>
  </Drawer>
</template>
```

## 移动端模式

设置 `isMobile` 可启用移动端优化样式。

```vue
<script setup>
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <Button @click="open = true">移动端抽屉</Button>
  
  <Drawer 
    v-model:open="open" 
    title="移动端抽屉" 
    placement="bottom"
    height="auto"
    is-mobile
  >
    <p>这是一个适配移动端的底部抽屉</p>
    <p>标题会居中显示，关闭按钮在右侧</p>
  </Drawer>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| open (v-model) | 是否显示 | `boolean` | `false` |
| title | 标题 | `string` | - |
| placement | 抽屉方向 | `'top' \| 'right' \| 'bottom' \| 'left'` | `'right'` |
| closable | 是否显示关闭按钮 | `boolean` | `true` |
| closeByOverlay | 点击遮罩是否关闭 | `boolean` | `true` |
| width | 宽度（左右方向） | `string \| number` | `378` |
| height | 高度（上下方向） | `string \| number` | `378` |
| okText | 确认按钮文字 | `string` | `'确定'` |
| cancelText | 取消按钮文字 | `string` | `'取消'` |
| okButtonProps | 确认按钮属性 | `ButtonProps` | - |
| cancelButtonProps | 取消按钮属性 | `ButtonProps` | - |
| showCancel | 是否显示取消按钮 | `boolean` | `true` |
| isMobile | 是否为移动端模式 | `boolean` | `false` |

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

