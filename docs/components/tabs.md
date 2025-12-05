# Tabs 标签页

选项卡切换组件。

## 基础用法

```vue
<script setup>
import { ref } from 'vue'
import { Tabs, TabList, Tab, TabPanel } from '@apron-design/vue'

const activeKey = ref('1')
</script>

<template>
  <Tabs v-model="activeKey">
    <TabList>
      <Tab tab-key="1">标签一</Tab>
      <Tab tab-key="2">标签二</Tab>
      <Tab tab-key="3">标签三</Tab>
    </TabList>
    <TabPanel tab-key="1">
      <p>内容一</p>
    </TabPanel>
    <TabPanel tab-key="2">
      <p>内容二</p>
    </TabPanel>
    <TabPanel tab-key="3">
      <p>内容三</p>
    </TabPanel>
  </Tabs>
</template>
```

## 胶囊样式

设置 `capsule` 使用胶囊样式。

```vue
<script setup>
import { ref } from 'vue'

const activeKey = ref('1')
</script>

<template>
  <Tabs v-model="activeKey" capsule>
    <TabList>
      <Tab tab-key="1">全部</Tab>
      <Tab tab-key="2">进行中</Tab>
      <Tab tab-key="3">已完成</Tab>
    </TabList>
    <TabPanel tab-key="1">
      <p>全部内容</p>
    </TabPanel>
    <TabPanel tab-key="2">
      <p>进行中内容</p>
    </TabPanel>
    <TabPanel tab-key="3">
      <p>已完成内容</p>
    </TabPanel>
  </Tabs>
</template>
```

## 禁用标签

```vue
<template>
  <Tabs default-active-key="1">
    <TabList>
      <Tab tab-key="1">可用</Tab>
      <Tab tab-key="2" disabled>禁用</Tab>
      <Tab tab-key="3">可用</Tab>
    </TabList>
    <TabPanel tab-key="1">内容一</TabPanel>
    <TabPanel tab-key="2">内容二</TabPanel>
    <TabPanel tab-key="3">内容三</TabPanel>
  </Tabs>
</template>
```

## 附加内容

在 TabList 中添加额外内容。

```vue
<script setup>
import { Tabs, TabList, Tab, TabPanel, Button } from '@apron-design/vue'
</script>

<template>
  <Tabs default-active-key="1">
    <TabList>
      <Tab tab-key="1">标签一</Tab>
      <Tab tab-key="2">标签二</Tab>
      <template #extra>
        <Button size="small">操作</Button>
      </template>
    </TabList>
    <TabPanel tab-key="1">内容一</TabPanel>
    <TabPanel tab-key="2">内容二</TabPanel>
  </Tabs>
</template>
```

## API

### Tabs Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue (v-model) | 当前激活的标签 | `string` | - |
| defaultActiveKey | 默认激活的标签 | `string` | - |
| capsule | 是否为胶囊样式 | `boolean` | `false` |

### Tabs Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 激活标签变化时触发 | `(key: string) => void` |
| change | 激活标签变化时触发 | `(key: string) => void` |

### TabList Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| extra | 附加内容 | `string` | - |

### TabList Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 标签列表 |
| extra | 附加内容 |

### Tab Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| tabKey | 唯一标识 | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |

### Tab Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 标签内容 |

### TabPanel Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| tabKey | 对应的标签 key | `string` | - |

### TabPanel Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 面板内容 |

