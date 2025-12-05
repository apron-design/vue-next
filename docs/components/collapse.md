# Collapse 折叠面板

可以折叠/展开的内容区域。

## 基础用法

```vue
<script setup>
import { ref } from 'vue'
import { Collapse, CollapseItem } from '@apron-design/vue'

const activeKeys = ref(['1'])
</script>

<template>
  <Collapse v-model="activeKeys">
    <CollapseItem item-key="1" title="标题一">
      <p>这是第一个面板的内容</p>
    </CollapseItem>
    <CollapseItem item-key="2" title="标题二">
      <p>这是第二个面板的内容</p>
    </CollapseItem>
    <CollapseItem item-key="3" title="标题三">
      <p>这是第三个面板的内容</p>
    </CollapseItem>
  </Collapse>
</template>
```

## 手风琴模式

设置 `accordion` 后，每次只能展开一个面板。

```vue
<script setup>
import { ref } from 'vue'

const activeKey = ref(['1'])
</script>

<template>
  <Collapse v-model="activeKey" accordion>
    <CollapseItem item-key="1" title="标题一">
      <p>这是第一个面板的内容</p>
    </CollapseItem>
    <CollapseItem item-key="2" title="标题二">
      <p>这是第二个面板的内容</p>
    </CollapseItem>
    <CollapseItem item-key="3" title="标题三">
      <p>这是第三个面板的内容</p>
    </CollapseItem>
  </Collapse>
</template>
```

## 禁用面板

```vue
<template>
  <Collapse>
    <CollapseItem item-key="1" title="可展开">
      <p>这个面板可以展开</p>
    </CollapseItem>
    <CollapseItem item-key="2" title="禁用的面板" disabled>
      <p>这个面板被禁用了</p>
    </CollapseItem>
  </Collapse>
</template>
```

## API

### Collapse Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue (v-model) | 当前展开的面板 | `string[]` | `[]` |
| defaultActiveKeys | 默认展开的面板 | `string[]` | `[]` |
| accordion | 是否为手风琴模式 | `boolean` | `false` |

### Collapse Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 展开面板变化时触发 | `(keys: string[]) => void` |
| change | 展开面板变化时触发 | `(keys: string[]) => void` |

### CollapseItem Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| itemKey | 唯一标识 | `string` | - |
| title | 标题 | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |

### CollapseItem Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 面板内容 |
| title | 自定义标题 |

