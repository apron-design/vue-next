---
title: ResponsiveModal 响应式弹窗
group: 反馈组件
order: 3
---

# ResponsiveModal 响应式弹窗

响应式弹窗根据屏幕尺寸自动切换显示模式，在宽屏下显示为 Modal，在窄屏下显示为 Drawer。

## 何时使用

- 需要在不同设备上提供一致的用户体验时
- 希望在移动端使用抽屉式弹窗，在桌面端使用模态弹窗时
- 构建响应式应用时需要适配不同屏幕尺寸的弹窗组件时

## 示例

### 基础用法

最基本的响应式弹窗使用方式，根据屏幕宽度自动切换显示模式。

:::demo
```vue
<template>
  <div>
    <div style="margin-bottom: 16px; color: #666; font-size: 14px;">
      调整浏览器窗口宽度查看效果（断点：1024px）
    </div>
    <ad-button @click="basicOpen = true">打开响应式弹窗</ad-button>
    <ad-responsive-modal
      v-model:open="basicOpen"
      title="响应式弹窗"
      @close="basicOpen = false"
      @ok="handleBasicOk"
    >
      <p>在宽屏（≥1024px）下显示为 Modal。</p>
      <p>在窄屏（&lt;1024px）下显示为 Drawer。</p>
    </ad-responsive-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AdResponsiveModal, AdButton } from '@apron-design/vue-next'

const basicOpen = ref(false)

const handleBasicOk = () => {
  console.log('确认')
  basicOpen.value = false
}
</script>
```
:::

### 自定义断点

通过 `breakpoint` 属性自定义响应式断点。

:::demo
```vue
<template>
  <div>
    <div style="margin-bottom: 16px; color: #666; font-size: 14px;">
      断点设置为 768px
    </div>
    <ad-button @click="customBreakpointOpen = true">打开（768px 断点）</ad-button>
    <ad-responsive-modal
      v-model:open="customBreakpointOpen"
      title="自定义断点"
      :breakpoint="768"
      @close="customBreakpointOpen = false"
      @ok="customBreakpointOpen = false"
    >
      <p>断点设置为 768px。</p>
      <p>在宽屏（≥768px）下显示为 Modal。</p>
      <p>在窄屏（&lt;768px）下显示为 Drawer。</p>
    </ad-responsive-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AdResponsiveModal, AdButton } from '@apron-design/vue-next'

const customBreakpointOpen = ref(false)
</script>
```
:::

### 不同抽屉弹出方向

在移动端可以设置不同的抽屉弹出方向。

#### 从底部弹出（默认）

:::demo
```vue
<template>
  <div>
    <div style="margin-bottom: 16px; color: #666; font-size: 14px;">
      移动端从底部弹出（默认）
    </div>
    <ad-button @click="bottomOpen = true">底部弹出</ad-button>
    <ad-responsive-modal
      v-model:open="bottomOpen"
      title="底部弹出"
      drawer-placement="bottom"
      :height="300"
      @close="bottomOpen = false"
      @ok="bottomOpen = false"
    >
      <p>移动端时从底部弹出。</p>
    </ad-responsive-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AdResponsiveModal, AdButton } from '@apron-design/vue-next'

const bottomOpen = ref(false)
</script>
```
:::

#### 从右侧弹出

:::demo
```vue
<template>
  <div>
    <div style="margin-bottom: 16px; color: #666; font-size: 14px;">
      移动端从右侧弹出
    </div>
    <ad-button @click="rightOpen = true">右侧弹出</ad-button>
    <ad-responsive-modal
      v-model:open="rightOpen"
      title="右侧弹出"
      drawer-placement="right"
      @close="rightOpen = false"
      @ok="rightOpen = false"
    >
      <p>移动端时从右侧弹出。</p>
    </ad-responsive-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AdResponsiveModal, AdButton } from '@apron-design/vue-next'

const rightOpen = ref(false)
</script>
```
:::

### 表单示例

响应式弹窗常用于表单场景。

:::demo
```vue
<template>
  <div>
    <ad-button @click="formOpen = true">新建用户</ad-button>
    <ad-responsive-modal
      v-model:open="formOpen"
      title="新建用户"
      :width="500"
      :height="400"
      drawer-placement="bottom"
      @close="formOpen = false"
      @ok="handleFormSubmit"
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
    </ad-responsive-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AdResponsiveModal, AdButton } from '@apron-design/vue-next'

const formOpen = ref(false)
const username = ref('')
const email = ref('')

const handleFormSubmit = () => {
  console.log('提交表单:', { username: username.value, email: email.value })
  formOpen.value = false
}
</script>
```
:::

### 确认对话框

用于确认危险操作的对话框，通常会将确认按钮设置为危险样式。

:::demo
```vue
<template>
  <div>
    <ad-button @click="confirmOpen = true">确认删除</ad-button>
    <ad-responsive-modal
      v-model:open="confirmOpen"
      title="确认删除"
      :width="400"
      :height="200"
      drawer-placement="bottom"
      @close="confirmOpen = false"
      @ok="handleConfirmOk"
      ok-text="确认删除"
      :ok-button-props="{ danger: true }"
    >
      <p>确定要删除这条记录吗？此操作不可撤销。</p>
    </ad-responsive-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AdResponsiveModal, AdButton } from '@apron-design/vue-next'

const confirmOpen = ref(false)

const handleConfirmOk = () => {
  console.log('已删除')
  confirmOpen.value = false
}
</script>
```
:::

### 无底部弹窗

通过 `showFooter` 属性隐藏底部操作区域。

:::demo
```vue
<template>
  <div>
    <ad-button @click="withoutFooterOpen = true">无底部弹窗</ad-button>
    <ad-responsive-modal
      v-model:open="withoutFooterOpen"
      title="提示信息"
      :show-footer="false"
      @close="withoutFooterOpen = false"
    >
      <p>这是一个没有底部的弹窗。</p>
      <p>点击蒙层或关闭按钮可以关闭。</p>
    </ad-responsive-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AdResponsiveModal, AdButton } from '@apron-design/vue-next'

const withoutFooterOpen = ref(false)
</script>
```
:::

### 自定义底部

通过 `footer` 插槽自定义底部内容。

:::demo
```vue
<template>
  <div>
    <ad-button @click="customFooterOpen = true">自定义底部</ad-button>
    <ad-responsive-modal
      v-model:open="customFooterOpen"
      title="自定义底部"
      @close="customFooterOpen = false"
    >
      <template #footer>
        <div style="display: flex; justify-content: space-between; width: 100%;">
          <ad-button @click="console.log('帮助')">帮助</ad-button>
          <div style="display: flex; gap: 8px;">
            <ad-button @click="customFooterOpen = false">取消</ad-button>
            <ad-button @click="customFooterOpen = false">确定</ad-button>
          </div>
        </div>
      </template>
      <p>这个弹窗有自定义的底部布局。</p>
    </ad-responsive-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AdResponsiveModal, AdButton } from '@apron-design/vue-next'

const customFooterOpen = ref(false)
</script>
```
:::

## API

### ResponsiveModal Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| open / v-model:open | 是否显示 | `boolean` | `false` |
| title | 标题 | `string \| VNode \| (() => VNode)` | - |
| closable | 是否显示关闭按钮 | `boolean` | `true` |
| closeByOverlay | 点击蒙层是否可以关闭 | `boolean` | `true` |
| width | Modal 宽度（PC端） | `number \| string` | `520` |
| height | Drawer 高度（移动端上下弹出时） | `number \| string` | `'auto'` |
| footer | 自定义 footer，设置为 null 则不显示 | `VNode \| (() => VNode) \| null` | - |
| showFooter | 是否显示 footer | `boolean` | `true` |
| okText | 确认按钮文字 | `string` | `'确定'` |
| cancelText | 取消按钮文字 | `string` | `'取消'` |
| okButtonProps | 确认按钮属性 | `Record<string, any>` | - |
| cancelButtonProps | 取消按钮属性 | `Record<string, any>` | - |
| showCancel | 是否显示取消按钮 | `boolean` | `true` |
| class | 自定义类名 | `string` | - |
| breakpoint | 响应式断点，小于此值使用 Drawer，大于等于此值使用 Modal | `number` | `1024` |
| drawerPlacement | 移动端 Drawer 弹出方向 | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` |

### ResponsiveModal Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:open | 弹窗打开状态改变时触发 | `(open: boolean)` |
| close | 关闭时触发 | - |
| ok | 点击确认按钮时触发 | - |
| afterOpenChange | 打开/关闭动画完成后的回调 | `(open: boolean)` |

### ResponsiveModal Slots

| 名称 | 说明 |
| --- | --- |
| default | 弹窗内容 |
| footer | 自定义底部内容 |

## 注意事项

1. 响应式弹窗会根据屏幕宽度自动切换显示模式：
   - 宽屏（≥ breakpoint）：显示为 Modal
   - 窄屏（< breakpoint）：显示为 Drawer
2. 默认断点为 1024px，可通过 `breakpoint` 属性自定义
3. 在移动端，可以通过 `drawerPlacement` 属性设置抽屉的弹出方向
4. 在移动端，可以通过 `height` 属性设置抽屉的高度
5. 在桌面端，可以通过 `width` 属性设置模态框的宽度
6. 其他属性与 Modal 和 Drawer 组件保持一致
7. 组件会监听窗口大小变化，自动切换显示模式
8. 在 SSR 环境中，组件会根据初始窗口大小决定首次渲染的模式
9. 使用 `v-model:open` 进行双向绑定是最推荐的方式
