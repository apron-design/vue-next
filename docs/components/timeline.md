# Timeline 时间线

垂直展示时间流信息。

## 基础用法

```vue
<script setup>
import { Timeline, TimelineItem } from '@apron-design/vue'
</script>

<template>
  <Timeline>
    <TimelineItem title="创建订单" date="2024-01-01 10:00">
      订单创建成功
    </TimelineItem>
    <TimelineItem title="支付完成" date="2024-01-01 10:05">
      支付金额：¥99.00
    </TimelineItem>
    <TimelineItem title="商品出库" date="2024-01-02 09:00">
      商品已从仓库发出
    </TimelineItem>
    <TimelineItem title="配送中" date="2024-01-03 14:00">
      快递员正在配送
    </TimelineItem>
  </Timeline>
</template>
```

## 不同方向

通过 `side` 设置内容显示在线的位置。

```vue
<template>
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
    <div>
      <h4>left（默认）</h4>
      <Timeline side="left">
        <TimelineItem title="步骤一" />
        <TimelineItem title="步骤二" />
        <TimelineItem title="步骤三" />
      </Timeline>
    </div>
    <div>
      <h4>right</h4>
      <Timeline side="right">
        <TimelineItem title="步骤一" />
        <TimelineItem title="步骤二" />
        <TimelineItem title="步骤三" />
      </Timeline>
    </div>
    <div>
      <h4>both</h4>
      <Timeline side="both">
        <TimelineItem title="步骤一" />
        <TimelineItem title="步骤二" />
        <TimelineItem title="步骤三" />
      </Timeline>
    </div>
  </div>
</template>
```

## 自定义节点颜色

```vue
<template>
  <Timeline>
    <TimelineItem title="创建" dot-color="#22c55e">
      状态：成功
    </TimelineItem>
    <TimelineItem title="处理中" dot-color="#f59e0b">
      状态：进行中
    </TimelineItem>
    <TimelineItem title="失败" dot-color="#ef4444">
      状态：失败
    </TimelineItem>
    <TimelineItem title="待处理">
      状态：等待
    </TimelineItem>
  </Timeline>
</template>
```

## API

### Timeline Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| side | 内容显示位置 | `'left' \| 'right' \| 'both'` | `'left'` |

### TimelineItem Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `string` | - |
| content | 内容 | `string` | - |
| date | 日期/时间 | `string` | - |
| dotColor | 节点颜色 | `string` | - |

### TimelineItem Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 内容，优先级高于 content |

