# Drawer 抽屉

屏幕边缘滑出的浮层面板。

## 基础用法

从右侧滑出的抽屉。

:::demo 基础抽屉用法。
```vue
<template>
  <div>
    <Button @click="open = true">打开抽屉</Button>
    <Drawer v-model:open="open" title="基础抽屉">
      <p>这是抽屉的内容区域。</p>
      <p>你可以在这里放置任何内容。</p>
    </Drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const open = ref(false)
</script>
```
:::

## 不同方向

支持从上、右、下、左四个方向滑出。

:::demo 设置 placement 属性可以改变抽屉出现的方向。
```vue
<template>
  <div style="display: flex; gap: 16px;">
    <Button @click="openTop = true">上侧滑出</Button>
    <Button @click="openRight = true">右侧滑出</Button>
    <Button @click="openBottom = true">下侧滑出</Button>
    <Button @click="openLeft = true">左侧滑出</Button>
    
    <Drawer v-model:open="openTop" title="上侧滑出" placement="top">
      <p>从顶部滑出的抽屉内容</p>
    </Drawer>
    
    <Drawer v-model:open="openRight" title="右侧滑出" placement="right">
      <p>从右侧滑出的抽屉内容</p>
    </Drawer>
    
    <Drawer v-model:open="openBottom" title="下侧滑出" placement="bottom">
      <p>从底部滑出的抽屉内容</p>
    </Drawer>
    
    <Drawer v-model:open="openLeft" title="左侧滑出" placement="left">
      <p>从左侧滑出的抽屉内容</p>
    </Drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const openTop = ref(false)
const openRight = ref(false)
const openBottom = ref(false)
const openLeft = ref(false)
</script>
```
:::

## 自定义尺寸

可以设置抽屉的宽度和高度。

:::demo 通过 width 和 height 属性设置抽屉尺寸。
```vue
<template>
  <div style="display: flex; gap: 16px;">
    <Button @click="openNarrow = true">窄抽屉</Button>
    <Button @click="openWide = true">宽抽屉</Button>
    <Button @click="openShort = true">矮抽屉</Button>
    <Button @click="openTall = true">高抽屉</Button>
    
    <Drawer v-model:open="openNarrow" title="窄抽屉" :width="300">
      <p>这是一个较窄的抽屉。</p>
    </Drawer>
    
    <Drawer v-model:open="openWide" title="宽抽屉" :width="600">
      <p>这是一个较宽的抽屉。</p>
    </Drawer>
    
    <Drawer v-model:open="openShort" title="矮抽屉" placement="top" :height="200">
      <p>这是一个较矮的抽屉。</p>
    </Drawer>
    
    <Drawer v-model:open="openTall" title="高抽屉" placement="top" :height="500">
      <p>这是一个较高的抽屉。</p>
    </Drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const openNarrow = ref(false)
const openWide = ref(false)
const openShort = ref(false)
const openTall = ref(false)
</script>
```
:::

## 自定义页脚

可以通过 footer 插槽自定义页脚内容。

:::demo 使用 footer 插槽自定义页脚。
```vue
<template>
  <div>
    <Button @click="openCustom = true">自定义页脚</Button>
    <Drawer 
      v-model:open="openCustom" 
      title="自定义页脚"
      :showFooter="true"
    >
      <p>这是抽屉的内容区域。</p>
      
      <template #footer>
        <div style="display: flex; justify-content: space-between; width: 100%;">
          <Button variant="default">次要操作</Button>
          <div>
            <Button variant="default" @click="openCustom = false">取消</Button>
            <Button variant="primary" style="margin-left: 12px;">确认</Button>
          </div>
        </div>
      </template>
    </Drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const openCustom = ref(false)
</script>
```
:::

## 无页脚

可以通过 showFooter 属性隐藏页脚。

:::demo 设置 showFooter 为 false 隐藏页脚。
```vue
<template>
  <div>
    <Button @click="openNoFooter = true">无页脚抽屉</Button>
    <Drawer 
      v-model:open="openNoFooter" 
      title="无页脚抽屉"
      :showFooter="false"
    >
      <p>这个抽屉没有页脚。</p>
      <p>内容可以延伸到整个抽屉高度。</p>
    </Drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const openNoFooter = ref(false)
</script>
```
:::

## API

### Drawer Props

| 参数名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| open (v-model) | 是否显示抽屉 | `boolean` | `false` |
| title | 标题 | `string` | `-` |
| placement | 抽屉方向 | `'top' \| 'right' \| 'bottom' \| 'left'` | `'right'` |
| closable | 是否显示关闭按钮 | `boolean` | `true` |
| closeByOverlay | 点击蒙层是否可以关闭 | `boolean` | `true` |
| width | 抽屉宽度（左右方向时有效） | `number \| string` | `378` |
| height | 抽屉高度（上下方向时有效） | `number \| string` | `378` |
| footer | 自定义 footer，设置为 null 则不显示 | `unknown \| null` | `-` |
| showFooter | 是否显示 footer | `boolean` | `true` |
| okText | 确认按钮文字 | `string` | `'确定'` |
| cancelText | 取消按钮文字 | `string` | `'取消'` |
| okButtonProps | 确认按钮属性 | `Partial<ButtonProps>` | `-` |
| cancelButtonProps | 取消按钮属性 | `Partial<ButtonProps>` | `-` |
| showCancel | 是否显示取消按钮 | `boolean` | `true` |
| isMobile | 是否为移动端模式 | `boolean` | `false` |
| class | 自定义类名 | `string` | `-` |

### Drawer Events

| 事件名 | 描述 | 参数 |
| --- | --- | --- |
| update:open | 抽屉打开状态改变时触发 | `(open: boolean)` |
| close | 关闭抽屉时触发 | `-` |
| ok | 点击确认按钮时触发 | `-` |
| afterOpenChange | 打开/关闭动画完成后的回调 | `(open: boolean)` |

### Drawer Slots

| 名称 | 描述 |
| --- | --- |
| default | 抽屉内容 |
| footer | 自定义页脚内容 |