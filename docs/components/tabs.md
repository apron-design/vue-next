# Tabs 标签页

Tabs 组件用于组织和展示不同类别的内容，允许用户在不同的视图之间进行切换。

## 基础用法

Tabs 组件由四个部分组成：
- `Tabs`: 容器组件
- `TabList`: 标签列表容器
- `Tab`: 单个标签项
- `TabPanel`: 标签对应的内容面板

:::demo
```vue
<template>
  <a-tabs default-active-key="1">
    <a-tab-list>
      <a-tab tab-key="1">标签一</a-tab>
      <a-tab tab-key="2">标签二</a-tab>
      <a-tab tab-key="3">标签三</a-tab>
    </a-tab-list>
    <a-tab-panel tab-key="1">
      这是标签一的内容区域。Tab 组件可以用于组织和展示不同类别的信息。
    </a-tab-panel>
    <a-tab-panel tab-key="2">
      这是标签二的内容区域。点击不同的标签可以切换显示不同的内容。
    </a-tab-panel>
    <a-tab-panel tab-key="3">
      这是标签三的内容区域。每个 TabPanel 对应一个 Tab。
    </a-tab-panel>
  </a-tabs>
</template>
```
:::

## 胶囊模式

通过设置 `capsule` 属性，可以启用胶囊样式的标签页，这种样式更加紧凑且具有视觉焦点。

:::demo
```vue
<template>
  <a-tabs default-active-key="1" capsule>
    <a-tab-list>
      <a-tab tab-key="1">标签一</a-tab>
      <a-tab tab-key="2">标签二</a-tab>
      <a-tab tab-key="3">标签三</a-tab>
    </a-tab-list>
    <a-tab-panel tab-key="1">
      胶囊模式的标签一内容。选中的标签有圆角背景。
    </a-tab-panel>
    <a-tab-panel tab-key="2">
      胶囊模式的标签二内容。
    </a-tab-panel>
    <a-tab-panel tab-key="3">
      胶囊模式的标签三内容。
    </a-tab-panel>
  </a-tabs>
</template>
```
:::

## 带额外操作

可以通过 `extra` 属性在标签栏右侧添加额外的操作元素。

:::demo
```vue
<template>
  <a-tabs default-active-key="1" :extra="extraContent">
    <a-tab-list>
      <a-tab tab-key="1">标签一</a-tab>
      <a-tab tab-key="2">标签二</a-tab>
      <a-tab tab-key="3">标签三</a-tab>
    </a-tab-list>
    <a-tab-panel tab-key="1">
      右侧有额外操作按钮的 Tab 组件。
    </a-tab-panel>
    <a-tab-panel tab-key="2">
      标签二内容。
    </a-tab-panel>
    <a-tab-panel tab-key="3">
      标签三内容。
    </a-tab-panel>
  </a-tabs>
</template>

<script setup>
import { h } from 'vue'
import AButton from '../../src/components/Button/Button.vue'

const extraContent = h(AButton, { size: 'sm' }, '操作按钮')
</script>
```
:::

## 禁用状态

通过给 `Tab` 组件设置 `disabled` 属性来禁用某个标签。

:::demo
```vue
<template>
  <a-tabs default-active-key="1">
    <a-tab-list>
      <a-tab tab-key="1">可用</a-tab>
      <a-tab tab-key="2" disabled>禁用</a-tab>
      <a-tab tab-key="3">可用</a-tab>
    </a-tab-list>
    <a-tab-panel tab-key="1">
      标签一内容。标签二被禁用，无法点击。
    </a-tab-panel>
    <a-tab-panel tab-key="2">
      标签二内容（无法访问）。
    </a-tab-panel>
    <a-tab-panel tab-key="3">
      标签三内容。
    </a-tab-panel>
  </a-tabs>
</template>
```
:::

## 使用场景

### 用户资料页

Tabs 组件常用于用户资料页，用来组织不同类型的信息。

:::demo
```vue
<template>
  <a-tabs default-active-key="info">
    <a-tab-list>
      <a-tab tab-key="info">基本信息</a-tab>
      <a-tab tab-key="security">安全设置</a-tab>
      <a-tab tab-key="notification">通知设置</a-tab>
    </a-tab-list>
    <a-tab-panel tab-key="info">
      <div style="display: flex; flex-direction: column; gap: 12px">
        <div><strong>用户名：</strong>admin</div>
        <div><strong>邮箱：</strong>admin@example.com</div>
        <div><strong>注册时间：</strong>2024-01-01</div>
      </div>
    </a-tab-panel>
    <a-tab-panel tab-key="security">
      <div style="display: flex; flex-direction: column; gap: 12px">
        <div><strong>密码：</strong>******** <a-button variant="link" size="sm">修改</a-button></div>
        <div><strong>两步验证：</strong>已开启</div>
      </div>
    </a-tab-panel>
    <a-tab-panel tab-key="notification">
      <div style="display: flex; flex-direction: column; gap: 12px">
        <div><strong>邮件通知：</strong>开启</div>
        <div><strong>短信通知：</strong>关闭</div>
      </div>
    </a-tab-panel>
  </a-tabs>
</template>

<script setup>
import AButton from '../../src/components/Button/Button.vue'
</script>
```
:::

### 筛选标签

在数据列表页面中，Tabs 组件也可以作为筛选条件使用。

:::demo
```vue
<template>
  <a-tabs default-active-key="all" capsule :extra="extraContent">
    <a-tab-list>
      <a-tab tab-key="all">全部</a-tab>
      <a-tab tab-key="pending">待审核 (12)</a-tab>
      <a-tab tab-key="approved">已通过</a-tab>
      <a-tab tab-key="rejected">已拒绝</a-tab>
    </a-tab-list>
    <a-tab-panel tab-key="all">
      显示所有数据...
    </a-tab-panel>
    <a-tab-panel tab-key="pending">
      显示待审核数据...
    </a-tab-panel>
    <a-tab-panel tab-key="approved">
      显示已通过数据...
    </a-tab-panel>
    <a-tab-panel tab-key="rejected">
      显示已拒绝数据...
    </a-tab-panel>
  </a-tabs>
</template>

<script setup>
import { h } from 'vue'

const extraContent = h('span', { 
  style: { color: '#71717a', fontSize: '14px' } 
}, '共 128 条')
</script>
```
:::

## 暗色模式

Tabs 组件支持暗色模式，在暗色主题下会自动应用合适的样式。

:::demo
```vue
<template>
  <div
    data-theme="dark"
    style="
      padding: 32px;
      background-color: #18181b;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      gap: 32px;
    "
  >
    <div>
      <h4 style="margin: 0 0 16px 0; color: #a1a1aa">默认模式</h4>
      <a-tabs default-active-key="1">
        <a-tab-list>
          <a-tab tab-key="1">标签一</a-tab>
          <a-tab tab-key="2">标签二</a-tab>
          <a-tab tab-key="3" disabled>禁用</a-tab>
        </a-tab-list>
        <a-tab-panel tab-key="1">
          <span style="color: #e4e4e7">暗色模式下的标签一内容。</span>
        </a-tab-panel>
        <a-tab-panel tab-key="2">
          <span style="color: #e4e4e7">暗色模式下的标签二内容。</span>
        </a-tab-panel>
      </a-tabs>
    </div>

    <div>
      <h4 style="margin: 0 0 16px 0; color: #a1a1aa">胶囊模式</h4>
      <a-tabs default-active-key="1" capsule>
        <a-tab-list>
          <a-tab tab-key="1">全部</a-tab>
          <a-tab tab-key="2">待处理</a-tab>
          <a-tab tab-key="3">已完成</a-tab>
        </a-tab-list>
        <a-tab-panel tab-key="1">
          <span style="color: #e4e4e7">暗色模式胶囊标签内容。</span>
        </a-tab-panel>
        <a-tab-panel tab-key="2">
          <span style="color: #e4e4e7">待处理内容。</span>
        </a-tab-panel>
        <a-tab-panel tab-key="3">
          <span style="color: #e4e4e7">已完成内容。</span>
        </a-tab-panel>
      </a-tabs>
    </div>
  </div>
</template>
```
:::

## 属性

### Tabs

| 参数名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultActiveKey | 默认选中的 Tab key | `string` | `''` |
| capsule | 是否为胶囊形 | `boolean` | `false` |
| extra | 右侧额外内容 | `any` | `-` |
| className | 自定义类名 | `string` | `-` |

### TabList

| 参数名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| extra | 右侧额外内容（由 Tabs 传入） | `any` | `-` |
| className | 自定义类名 | `string` | `-` |

### Tab

| 参数名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| tabKey | Tab 的唯一标识 | `string` | `-` |
| disabled | 是否禁用 | `boolean` | `false` |
| className | 自定义类名 | `string` | `-` |

### TabPanel

| 参数名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| tabKey | 对应的 Tab key | `string` | `-` |
| className | 自定义类名 | `string` | `-` |

## 事件

### Tabs

| 事件名 | 描述 | 参数 |
| --- | --- | --- |
| update:activeKey | 激活的 Tab 改变时触发 | `(key: string)` |

## 注意事项

1. Tabs 组件由四个部分组成：`Tabs`、`TabList`、`Tab` 和 `TabPanel`
2. 每个 `Tab` 必须有一个唯一的 `tabKey` 属性
3. 每个 `TabPanel` 必须有一个对应的 `tabKey` 属性，与 `Tab` 的 `tabKey` 相匹配
4. 通过 `defaultActiveKey` 属性设置默认激活的 Tab
5. 通过 `capsule` 属性可以启用胶囊样式
6. 通过 `extra` 属性可以在标签栏右侧添加额外内容
7. 通过 `disabled` 属性可以禁用某个 Tab
8. 在暗色模式下，Tabs 组件会自动适配主题颜色
9. Tab 组件支持键盘导航（Tab 键聚焦，回车键或空格键激活）