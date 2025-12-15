---
title: ResponsiveModal 响应式弹窗
group: 反馈
order: 8
---

# ResponsiveModal 响应式弹窗

响应式弹窗组件，在桌面端显示为 Modal，在移动端显示为 Drawer。

## 何时使用

- 需要在不同设备上提供最佳用户体验的弹窗场景
- 移动端希望从屏幕边缘滑出的体验
- 桌面端希望居中显示的传统弹窗体验

## 代码演示

### 基本用法

最基本的响应式弹窗用法，在不同屏幕尺寸下自动切换显示方式。

:::demo
```vue
<template>
  <div>
    <div style="margin-bottom: 16px; color: #666; font-size: 14px;">
      调整浏览器窗口宽度查看效果（断点：1024px）
    </div>
    <ad-button @click="open = true">打开响应式弹窗</ad-button>
    <ResponsiveModal
      v-model:open="open"
      title="响应式弹窗"
      @close="open = false"
      @ok="handleOk"
    >
      <p>在宽屏（≥1024px）下显示为 Modal。</p>
      <p>在窄屏（&lt;1024px）下显示为 Drawer。</p>
    </ResponsiveModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AdResponsiveModal as ResponsiveModal, AdButton } from '@apron-design/vue-next'

const open = ref(false)

const handleOk = () => {
  console.log('确认')
  open.value = false
}
</script>
```
:::

### 自定义断点

可以自定义断点值，控制在什么屏幕尺寸下切换显示方式。

:::demo
```vue
<template>
  <div>
    <div style="margin-bottom: 16px; color: #666; font-size: 14px;">
      断点设置为 768px
    </div>
    <ad-button @click="open = true">打开（768px 断点）</ad-button>
    <ResponsiveModal
      v-model:open="open"
      title="自定义断点"
      :breakpoint="768"
      @close="open = false"
      @ok="open = false"
    >
      <p>断点设置为 768px。</p>
      <p>在宽屏（≥768px）下显示为 Modal。</p>
      <p>在窄屏（&lt;768px）下显示为 Drawer。</p>
    </ResponsiveModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AdResponsiveModal as ResponsiveModal, AdButton } from '@apron-design/vue-next'

const open = ref(false)
</script>
```
:::

### 不同抽屉方向

移动端时可以从不同方向滑出 Drawer。

:::demo
```vue
<template>
  <div>
    <div style="margin-bottom: 16px; color: #666; font-size: 14px;">
      移动端从底部弹出（默认）
    </div>
    <ad-button @click="open = true">底部弹出</ad-button>
    <ResponsiveModal
      v-model:open="open"
      title="底部弹出"
      drawer-placement="bottom"
      :height="300"
      @close="open = false"
      @ok="open = false"
    >
      <p>移动端时从底部弹出。</p>
    </ResponsiveModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AdResponsiveModal as ResponsiveModal, AdButton } from '@apron-design/vue-next'

const open = ref(false)
</script>
```
:::

:::demo
```vue
<template>
  <div>
    <div style="margin-bottom: 16px; color: #666; font-size: 14px;">
      移动端从右侧弹出
    </div>
    <ad-button @click="open = true">右侧弹出</ad-button>
    <ResponsiveModal
      v-model:open="open"
      title="右侧弹出"
      drawer-placement="right"
      @close="open = false"
      @ok="open = false"
    >
      <p>移动端时从右侧弹出。</p>
    </ResponsiveModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AdResponsiveModal as ResponsiveModal, AdButton } from '@apron-design/vue-next'

const open = ref(false)
</script>
```
:::

### 表单示例

在响应式弹窗中使用表单。

:::demo
```vue
<template>
  <div>
    <Button @click="open = true">新建用户</Button>
    <ResponsiveModal
      v-model:open="open"
      title="新建用户"
      :width="500"
      :height="400"
      drawer-placement="bottom"
      @close="open = false"
      @ok="handleSubmit"
      ok-text="创建"
    >
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 500;">
            用户名
          </label>
          <input
            type="text"
            style="
              width: 100%;
              padding: 8px 12px;
              border: 1px solid #e0e0e0;
              border-radius: 8px;
              box-sizing: border-box;
            "
            placeholder="请输入用户名"
            v-model="username"
          />
        </div>
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 500;">
            邮箱
          </label>
          <input
            type="email"
            style="
              width: 100%;
              padding: 8px 12px;
              border: 1px solid #e0e0e0;
              border-radius: 8px;
              box-sizing: border-box;
            "
            placeholder="请输入邮箱"
            v-model="email"
          />
        </div>
      </div>
    </ResponsiveModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AdResponsiveModal as ResponsiveModal, AdButton } from '@apron-design/vue-next'

const open = ref(false)
const username = ref('')
const email = ref('')

const handleSubmit = () => {
  console.log('提交表单:', { username: username.value, email: email.value })
  open.value = false
}
</script>
```
:::

### 确认对话框

用于确认危险操作的响应式对话框。

:::demo
```vue
<template>
  <div>
    <Button @click="open = true">确认删除</Button>
    <ResponsiveModal
      v-model:open="open"
      title="确认删除"
      :width="400"
      :height="200"
      drawer-placement="bottom"
      @close="open = false"
      @ok="handleDelete"
      ok-text="确认删除"
      :ok-button-props="{ danger: true }"
    >
      <p>确定要删除这条记录吗？此操作不可撤销。</p>
    </ResponsiveModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AdResponsiveModal as ResponsiveModal, AdButton } from '@apron-design/vue-next'

const open = ref(false)

const handleDelete = () => {
  console.log('已删除')
  open.value = false
}
</script>
```
:::

### 无底部弹窗

可以隐藏底部操作区域。

:::demo
```vue
<template>
  <div>
    <Button @click="open = true">无底部弹窗</Button>
    <ResponsiveModal
      v-model:open="open"
      title="提示信息"
      :show-footer="false"
      @close="open = false"
    >
      <p>这是一个没有底部的弹窗。</p>
      <p>点击蒙层或关闭按钮可以关闭。</p>
    </ResponsiveModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AdResponsiveModal as ResponsiveModal, AdButton } from '@apron-design/vue-next'

const open = ref(false)
</script>
```
:::

### 自定义底部

通过 `footer` 插槽自定义底部内容。

:::demo
```vue
<template>
  <div>
    <Button @click="open = true">自定义底部</Button>
    <ResponsiveModal
      v-model:open="open"
      title="自定义底部"
      :footer="customFooter"
      @close="open = false"
    >
      <p>这个弹窗有自定义的底部布局。</p>
    </ResponsiveModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AdResponsiveModal as ResponsiveModal, AdButton } from '@apron-design/vue-next'

const open = ref(false)

const customFooter = `
  <div style="display: flex; justify-content: space-between; width: 100%;">
    <Button onclick="console.log('帮助')">帮助</Button>
    <div style="display: flex; gap: 8px;">
      <Button onclick="open = false">取消</Button>
      <Button onclick="open = false">确定</Button>
    </div>
  </div>
`
</script>
```
:::

## API

### ResponsiveModal Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| open | 是否显示弹窗 | boolean | `false` |
| title | 标题 | string | - |
| closable | 是否显示关闭按钮 | boolean | `true` |
| closeByOverlay | 点击蒙层是否可以关闭 | boolean | `true` |
| width | Modal 宽度（PC端） | number \| string | `520` |
| height | Drawer 高度（移动端上下弹出时） | number \| string | `'auto'` |
| footer | 自定义 footer，设置为 null 则不显示 | string \| null | - |
| showFooter | 是否显示 footer | boolean | `true` |
| okText | 确认按钮文字 | string | `'确定'` |
| cancelText | 取消按钮文字 | string | `'取消'` |
| okButtonProps | 确认按钮属性 | Record<string, any> | - |
| cancelButtonProps | 取消按钮属性 | Record<string, any> | - |
| showCancel | 是否显示取消按钮 | boolean | `true` |
| class | 自定义类名 | string | - |
| breakpoint | 响应式断点，小于此值使用 Drawer，大于等于此值使用 Modal | number | `1024` |
| drawerPlacement | 移动端 Drawer 弹出方向 | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` |
| afterOpenChange | 打开/关闭动画完成后的回调 | `(open: boolean) => void` | - |

### ResponsiveModal Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| update:open | 弹窗打开状态改变时触发 | `(open: boolean)` |
| close | 关闭时触发 | - |
| ok | 点击确认按钮时触发 | - |

## 注意事项

1. 组件会根据屏幕宽度自动在 Modal 和 Drawer 之间切换
2. 默认断点为 1024px，可通过 `breakpoint` 属性自定义
3. 移动端时默认从底部弹出 Drawer，可通过 `drawerPlacement` 属性自定义方向
4. 支持 Modal 和 Drawer 的所有功能特性
5. 提供了完整的键盘交互支持