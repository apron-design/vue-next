---
title: Input 输入框
group: 数据录入
order: 1
---

# Input 输入框

通过鼠标或键盘输入内容，是最基础的表单域包装。

## 何时使用

- 需要用户输入表单域内容时
- 提供组合型输入框，比如带前后置内容的输入框
- 需要带清除功能的输入框时

## 代码演示

### 基础用法

最简单的用法，适用于大部分业务场景。

:::demo
```vue
<template>
  <ad-input placeholder="Please enter..." />
</template>

<script setup lang="ts">
import { AdInput } from '@apron-design/vue-next'
</script>
```
:::

### 不同状态

展示输入框的不同状态：空状态、有内容、禁用等。

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <h4>空状态（无焦点）</h4>
      <ad-input placeholder="Please enter..." />
    </div>
    <div>
      <h4>有内容</h4>
      <ad-input :default-value="'Hello World'" />
    </div>
    <div>
      <h4>禁用</h4>
      <ad-input disabled placeholder="Disabled" />
    </div>
    <div>
      <h4>禁用（有内容）</h4>
      <ad-input disabled :default-value="'Disabled with value'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { AdInput } from '@apron-design/vue-next'
</script>
```
:::

### 可清除输入框

带清除图标的输入框，点击图标清除内容。

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <ad-input
      v-model:value="value"
      clearable
      @clear="handleClear"
      placeholder="输入内容后显示清除按钮"
    />
    <p style="margin: 0; color: #666; font-size: 14px;">
      当前值: {{ value || '(空)' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AdInput } from '@apron-design/vue-next'

const value = ref('可清除的内容')

const handleClear = () => {
  value.value = ''
}
</script>
```
:::

### 密码输入框

用于输入密码，可切换明文/密文显示。

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <h4>密码输入框（点击眼睛图标切换显示）</h4>
      <ad-input type="password" :default-value="'password123'" />
    </div>
    <div>
      <h4>密码输入框 + 可清除</h4>
      <ad-input type="password" :default-value="'password123'" clearable />
    </div>
  </div>
</template>

<script setup lang="ts">
import { AdInput } from '@apron-design/vue-next'
</script>
```
:::

### 前置/后置内容

用于配置一些固定组合，如域名、货币单位等。

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <h4>前置文字 (65px)</h4>
      <ad-input prepend="https://" placeholder="example.com" />
    </div>
    <div>
      <h4>后置文字 (50px)</h4>
      <ad-input append=".com" placeholder="domain" />
    </div>
    <div>
      <h4>前置 + 后置</h4>
      <ad-input prepend="$" append="USD" placeholder="0.00" />
    </div>
    <div>
      <h4>前置自定义内容</h4>
      <ad-input placeholder="Search...">
        <template #prepend>
          <span style="padding: 0 8px; display: flex; align-items: center;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </span>
        </template>
      </ad-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AdInput } from '@apron-design/vue-next'
</script>
```
:::

### 组合使用

将各种功能组合使用。

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <ad-input
      prepend="$"
      append="USD"
      clearable
      :default-value="'100.00'"
    />
  </div>
</template>

<script setup lang="ts">
import { AdInput } from '@apron-design/vue-next'
</script>
```
:::

### Textarea 文本域

用于多行文本输入。

:::demo
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <h4>默认 (3行)</h4>
      <ad-textarea placeholder="Please enter..." />
    </div>
    <div>
      <h4>有内容</h4>
      <ad-textarea :default-value="'This is a textarea with some content. It supports multiple lines of text.'" />
    </div>
    <div>
      <h4>5 行</h4>
      <ad-textarea :rows="5" placeholder="5 rows textarea..." />
    </div>
    <div>
      <h4>可清除（右下角）</h4>
      <ad-textarea clearable :default-value="'Clearable textarea content'" />
    </div>
    <div>
      <h4>字数限制（右下角显示计数）</h4>
      <ad-textarea :max="200" :default-value="'This is some text content.'" placeholder="最多输入200字..." />
    </div>
    <div>
      <h4>字数限制 + 可清除</h4>
      <ad-textarea :max="100" clearable :default-value="'Combined features'" />
    </div>
    <div>
      <h4>禁用</h4>
      <ad-textarea disabled :default-value="'Disabled textarea'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { AdTextarea } from '@apron-design/vue-next'
</script>
```
:::

## API

### Input

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 输入框类型 | `'text' \| 'password' \| 'email' \| 'number' \| 'tel' \| 'url' \| 'search'` | `'text'` |
| clearable | 是否显示清除按钮 | `boolean` | `false` |
| onClear | 清除时的回调 | `() => void` | - |
| prepend | 输入框前置内容（内部） | `string \| VNode` | - |
| append | 输入框后置内容（内部） | `string \| VNode` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| value | 输入框内容（受控） | `string` | - |
| defaultValue | 输入框默认内容 | `string` | - |
| onChange | 输入框内容变化时的回调 | `(event: Event) => void` | - |
| onFocus | 输入框获得焦点时的回调 | `(event: FocusEvent) => void` | - |
| onBlur | 输入框失去焦点时的回调 | `(event: FocusEvent) => void` | - |
| class | 自定义类名 | `string` | - |

### Input Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:value | 值改变时触发（v-model:value） | `(value: string \| number)` |
| change | 输入框内容变化时触发 | `(event: Event)` |
| focus | 输入框获得焦点时触发 | `(event: FocusEvent)` |
| blur | 输入框失去焦点时触发 | `(event: FocusEvent)` |
| clear | 清除时触发 | `() => void` |

### Input Slots

| 名称 | 说明 |
| --- | --- |
| prepend | 前置内容 |
| append | 后置内容 |

### Textarea

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| rows | 默认行数 | `number` | `3` |
| clearable | 是否显示清除按钮 | `boolean` | `false` |
| onClear | 清除时的回调 | `() => void` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| max | 最大字数限制，设置后显示字数计数 | `number` | - |
| value | 输入框内容（受控） | `string` | - |
| defaultValue | 输入框默认内容 | `string` | - |
| onChange | 输入框内容变化时的回调 | `(event: Event) => void` | - |
| onFocus | 输入框获得焦点时的回调 | `(event: FocusEvent) => void` | - |
| onBlur | 输入框失去焦点时的回调 | `(event: FocusEvent) => void` | - |
| class | 自定义类名 | `string` | - |

### Textarea Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:value | 值改变时触发（v-model:value） | `(value: string)` |
| change | 输入框内容变化时触发 | `(event: Event)` |
| focus | 输入框获得焦点时触发 | `(event: FocusEvent)` |
| blur | 输入框失去焦点时触发 | `(event: FocusEvent)` |
| clear | 清除时触发 | `() => void` |
