# Modal 对话框

模态对话框，用于需要用户处理事务，又不希望跳转页面的场景。

## 基础用法

```vue
<script setup>
import { ref } from 'vue'
import { Modal, Button } from '@apron-design/vue'

const open = ref(false)
</script>

<template>
  <Button @click="open = true">打开对话框</Button>
  
  <Modal v-model:open="open" title="基础对话框">
    <p>这是一段内容...</p>
    <p>这是一段内容...</p>
  </Modal>
</template>
```

## 异步关闭

点击确定后异步关闭对话框。

```vue
<script setup>
import { ref } from 'vue'

const open = ref(false)
const loading = ref(false)

const handleOk = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    open.value = false
  }, 2000)
}
</script>

<template>
  <Button @click="open = true">异步关闭</Button>
  
  <Modal 
    v-model:open="open" 
    title="异步关闭"
    :ok-button-props="{ loading }"
    @ok="handleOk"
  >
    <p>点击确定后等待 2 秒关闭</p>
  </Modal>
</template>
```

## 自定义页脚

```vue
<script setup>
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <Button @click="open = true">自定义页脚</Button>
  
  <Modal v-model:open="open" title="自定义页脚">
    <p>自定义页脚内容</p>
    <template #footer>
      <Button @click="open = false">我知道了</Button>
    </template>
  </Modal>
</template>
```

## 无页脚

设置 `showCancel` 为 false 且不传 `okText` 可隐藏页脚。

```vue
<script setup>
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <Button @click="open = true">无页脚</Button>
  
  <Modal v-model:open="open" title="无页脚对话框" :show-cancel="false" ok-text="">
    <template #footer><span></span></template>
    <p>这个对话框没有页脚按钮</p>
  </Modal>
</template>
```

## 居中显示

```vue
<script setup>
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <Button @click="open = true">居中显示</Button>
  
  <Modal v-model:open="open" title="居中对话框" centered>
    <p>垂直居中的对话框</p>
  </Modal>
</template>
```

## 自定义宽度

```vue
<script setup>
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <Button @click="open = true">宽对话框</Button>
  
  <Modal v-model:open="open" title="宽对话框" :width="800">
    <p>这是一个比较宽的对话框</p>
  </Modal>
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
| width | 宽度 | `string \| number` | `480` |
| centered | 是否居中显示 | `boolean` | `false` |
| okText | 确认按钮文字 | `string` | `'确定'` |
| cancelText | 取消按钮文字 | `string` | `'取消'` |
| okButtonProps | 确认按钮属性 | `ButtonProps` | - |
| cancelButtonProps | 取消按钮属性 | `ButtonProps` | - |
| showCancel | 是否显示取消按钮 | `boolean` | `true` |

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

