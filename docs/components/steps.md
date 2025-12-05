# Steps 步骤条

引导用户按照流程完成任务的导航条。

## 基础用法

```vue
<script setup>
import { Steps } from '@apron-design/vue'

const items = [
  { title: '步骤一', subtitle: '描述信息' },
  { title: '步骤二', subtitle: '描述信息' },
  { title: '步骤三', subtitle: '描述信息' },
  { title: '步骤四', subtitle: '描述信息' }
]
</script>

<template>
  <Steps :items="items" :current="1" />
</template>
```

## 不同状态

```vue
<script setup>
const items = [
  { title: '已完成', status: 'completed' },
  { title: '进行中', status: 'current' },
  { title: '错误', status: 'error' },
  { title: '待处理', status: 'pending' }
]
</script>

<template>
  <Steps :items="items" />
</template>
```

## 标签位置

通过 `labelPlacement` 设置标签位置。

```vue
<script setup>
const items = [
  { title: '步骤一' },
  { title: '步骤二' },
  { title: '步骤三' }
]
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 32px;">
    <div>
      <p>top</p>
      <Steps :items="items" :current="1" label-placement="top" />
    </div>
    <div>
      <p>bottom（默认）</p>
      <Steps :items="items" :current="1" label-placement="bottom" />
    </div>
    <div>
      <p>both（交替）</p>
      <Steps :items="items" :current="1" label-placement="both" />
    </div>
  </div>
</template>
```

## 交互式步骤条

```vue
<script setup>
import { ref } from 'vue'
import { Steps, Button } from '@apron-design/vue'

const current = ref(0)
const items = [
  { title: '基本信息' },
  { title: '详细信息' },
  { title: '确认提交' },
  { title: '完成' }
]

const prev = () => {
  if (current.value > 0) current.value--
}

const next = () => {
  if (current.value < items.length - 1) current.value++
}
</script>

<template>
  <Steps :items="items" :current="current" />
  <div style="margin-top: 24px; display: flex; gap: 8px;">
    <Button :disabled="current === 0" @click="prev">上一步</Button>
    <Button variant="primary" :disabled="current === items.length - 1" @click="next">
      下一步
    </Button>
  </div>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 步骤配置 | `StepItem[]` | `[]` |
| current | 当前步骤（从 0 开始） | `number` | `0` |
| labelPlacement | 标签位置 | `'top' \| 'bottom' \| 'both'` | `'bottom'` |

### StepItem

| 属性 | 说明 | 类型 | 必填 |
| --- | --- | --- | --- |
| title | 标题 | `string` | 是 |
| subtitle | 副标题/描述 | `string` | 否 |
| status | 状态（会覆盖自动计算的状态） | `'completed' \| 'current' \| 'pending' \| 'error'` | 否 |

