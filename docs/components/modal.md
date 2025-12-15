# Modal 对话框

模态对话框用于显示重要的信息或请求用户输入。它会中断用户的当前操作，直到用户与对话框进行交互。

## 何时使用

- 需要用户确认某些操作时
- 显示重要信息时
- 收集用户输入时
- 展示详细内容时

## 示例

### 基础用法

最简单的对话框，包含标题、内容和默认的操作按钮。

:::demo
```vue
<template>
  <div>
    <ad-button @click="basicOpen = true">打开对话框</ad-button>
    <Modal
      v-model:open="basicOpen"
      title="基础对话框"
      @close="basicOpen = false"
      @ok="handleBasicOk"
    >
      <p>这是对话框的内容。</p>
      <p>点击蒙层或按 ESC 键可以关闭对话框。</p>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AdModal as Modal, AdButton } from '@apron-design/vue-next'

const basicOpen = ref(false)

const handleBasicOk = () => {
  console.log('确认')
  basicOpen.value = false
}
</script>
```
:::

### 无标题对话框

可以通过省略 `title` 属性来创建无标题的对话框。

:::demo
```vue
<template>
  <div>
    <ad-button @click="withoutTitleOpen = true">无标题对话框</ad-button>
    <Modal
      v-model:open="withoutTitleOpen"
      @close="withoutTitleOpen = false"
      @ok="withoutTitleOpen = false"
      :show-cancel="false"
      ok-text="关闭"
    >
      <p>这是一个没有标题的对话框。</p>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AdModal as Modal, AdButton } from '@apron-design/vue-next'

const withoutTitleOpen = ref(false)
</script>
```
:::

### 无底部对话框

通过设置 `showFooter` 为 `false` 来隐藏底部操作区域。

:::demo
```vue
<template>
  <div>
    <ad-button @click="withoutFooterOpen = true">无底部对话框</ad-button>
    <Modal
      v-model:open="withoutFooterOpen"
      title="无底部对话框"
      @close="withoutFooterOpen = false"
      :show-footer="false"
    >
      <p>这是一个没有底部的对话框。</p>
      <p>你可以通过关闭按钮或点击蒙层来关闭它。</p>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AdModal as Modal, AdButton } from '@apron-design/vue-next'

const withoutFooterOpen = ref(false)
</script>
```
:::

### 禁止点击蒙层关闭

通过设置 `closeByOverlay` 为 `false` 来禁止用户通过点击蒙层关闭对话框。

:::demo
```vue
<template>
  <div>
    <ad-button @click="noCloseByOverlayOpen = true">禁止点击蒙层关闭</ad-button>
    <Modal
      v-model:open="noCloseByOverlayOpen"
      title="禁止点击蒙层关闭"
      :close-by-overlay="false"
      @close="noCloseByOverlayOpen = false"
      @ok="noCloseByOverlayOpen = false"
      :show-cancel="false"
      ok-text="知道了"
    >
      <p>这个对话框不能通过点击蒙层来关闭。</p>
      <p>请点击按钮或关闭图标来关闭。</p>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AdModal as Modal, AdButton } from '@apron-design/vue-next'

const noCloseByOverlayOpen = ref(false)
</script>
```
:::

### 不可关闭对话框

通过设置 `closable` 和 `closeByOverlay` 为 `false` 来创建不可关闭的对话框。

:::demo
```vue
<template>
  <div>
    <ad-button @click="notClosableOpen = true">不可关闭对话框</ad-button>
    <Modal
      v-model:open="notClosableOpen"
      title="重要提示"
      :closable="false"
      :close-by-overlay="false"
      @close="notClosableOpen = false"
    >
      <template #footer>
        <ad-button @click="notClosableOpen = false">我已阅读并同意</ad-button>
      </template>
      <p>这是一条重要信息，你必须阅读后才能关闭。</p>
      <p>没有关闭按钮，也不能点击蒙层关闭。</p>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AdModal as Modal, AdButton } from '@apron-design/vue-next'

const notClosableOpen = ref(false)
</script>
```
:::

### 自定义宽度

通过 `width` 属性来自定义对话框的宽度。

:::demo
```vue
<template>
  <div>
    <ad-button @click="customWidthOpen = true">自定义宽度（800px）</ad-button>
    <Modal
      v-model:open="customWidthOpen"
      title="宽对话框"
      :width="800"
      @close="customWidthOpen = false"
    >
      <template #footer>
        <ad-button @click="customWidthOpen = false">关闭</ad-button>
      </template>
      <p>这是一个宽度为 800px 的对话框。</p>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AdModal as Modal, AdButton } from '@apron-design/vue-next'

const customWidthOpen = ref(false)
</script>
```
:::

### 长内容对话框

当内容较长时，对话框会自动显示滚动条。

:::demo
```vue
<template>
  <div>
    <ad-button @click="longContentOpen = true">长内容对话框</ad-button>
    <Modal
      v-model:open="longContentOpen"
      title="长内容对话框"
      @close="longContentOpen = false"
    >
      <template #footer>
        <ad-button @click="longContentOpen = false">关闭</ad-button>
      </template>
      <div v-for="i in 20" :key="i">
        <p>这是第 {{ i }} 段内容。Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AdModal as Modal, AdButton } from '@apron-design/vue-next'

const longContentOpen = ref(false)
</script>
```
:::

### 确认对话框

用于确认危险操作的对话框，通常会将确认按钮设置为危险样式。

:::demo
```vue
<template>
  <div>
    <ad-button @click="confirmOpen = true">确认对话框</ad-button>
    <Modal
      v-model:open="confirmOpen"
      title="确认删除"
      :width="400"
      @close="confirmOpen = false"
      @ok="handleConfirmOk"
      ok-text="确认删除"
      :ok-button-props="{ danger: true }"
    >
      <p>确定要删除这条记录吗？此操作不可撤销。</p>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AdModal as Modal, AdButton } from '@apron-design/vue-next'

const confirmOpen = ref(false)

const handleConfirmOk = () => {
  console.log('Confirmed!')
  confirmOpen.value = false
}
</script>
```
:::

### 自定义按钮文字和变种

可以通过 `okText`、`cancelText` 和按钮属性来自定义按钮的文字和样式。

:::demo
```vue
<template>
  <div>
    <ad-button @click="customButtonsOpen = true">自定义按钮</ad-button>
    <Modal
      v-model:open="customButtonsOpen"
      title="自定义按钮文字和变种"
      @close="customButtonsOpen = false"
      @ok="handleCustomButtonsOk"
      ok-text="提交"
      cancel-text="返回"
      :ok-button-props="{ variant: 'secondary' }"
      :cancel-button-props="{ variant: 'text' }"
    >
      <p>确认按钮使用 secondary 变种，取消按钮使用 text 变种。</p>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AdModal as Modal, AdButton } from '@apron-design/vue-next'

const customButtonsOpen = ref(false)

const handleCustomButtonsOk = () => {
  console.log('提交')
  customButtonsOpen.value = false
}
</script>
```
:::

### 只有确认按钮

通过设置 `showCancel` 为 `false` 来只显示确认按钮。

:::demo
```vue
<template>
  <div>
    <ad-button @click="withoutCancelOpen = true">只有确认按钮</ad-button>
    <Modal
      v-model:open="withoutCancelOpen"
      title="提示"
      @close="withoutCancelOpen = false"
      @ok="withoutCancelOpen = false"
      :show-cancel="false"
      ok-text="知道了"
    >
      <p>这个对话框只有一个确认按钮。</p>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AdModal as Modal, AdButton } from '@apron-design/vue-next'

const withoutCancelOpen = ref(false)
</script>
```
:::

### 表单对话框

在对话框中嵌入表单以收集用户输入。

:::demo
```vue
<template>
  <div>
    <ad-button @click="formOpen = true">表单对话框</ad-button>
    <Modal
      v-model:open="formOpen"
      title="新建用户"
      @close="formOpen = false"
    >
      <template #footer>
        <ad-button @click="formOpen = false">取消</ad-button>
        <ad-button @click="handleFormSubmit">提交</ad-button>
      </template>
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
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AdModal as Modal, AdButton } from '@apron-design/vue-next'

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

### 自定义底部

通过 `footer` 插槽来自定义底部内容。

:::demo
```vue
<template>
  <div>
    <ad-button @click="customFooterOpen = true">自定义底部</ad-button>
    <Modal
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
      <p>这个对话框有自定义的底部布局。</p>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AdModal as Modal, AdButton } from '@apron-design/vue-next'

const customFooterOpen = ref(false)
</script>
```
:::

## API

### Modal Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| open | 是否显示对话框 | boolean | `false` |
| title | 标题 | string | - |
| closable | 是否显示关闭按钮 | boolean | `true` |
| closeByOverlay | 点击蒙层是否可以关闭 | boolean | `true` |
| width | 对话框宽度 | number \| string | `520` |
| footer | 自定义 footer，设置为 null 则不显示 | undefined \| null | - |
| showFooter | 是否显示 footer | boolean | `true` |
| okText | 确认按钮文字 | string | `'确定'` |
| cancelText | 取消按钮文字 | string | `'取消'` |
| okButtonProps | 确认按钮属性 | Record<string, any> | - |
| cancelButtonProps | 取消按钮属性 | Record<string, any> | - |
| showCancel | 是否显示取消按钮 | boolean | `true` |
| class | 自定义类名 | string | - |
| centered | 是否居中显示 | boolean | `true` |

### Modal Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| update:open | 对话框打开状态改变时触发 | `(open: boolean)` |
| close | 关闭时触发 | - |
| ok | 点击确认按钮时触发 | - |
| afterOpenChange | 打开/关闭动画完成后的回调 | `(open: boolean)` |

### Modal Slots

| 名称 | 说明 |
| --- | --- |
| default | 对话框内容 |
| footer | 自定义底部内容 |

## 注意事项

1. 对话框打开时会阻止页面滚动
2. 按 ESC 键可以关闭对话框（除非设置了 `closable={false}`）
3. 点击蒙层可以关闭对话框（除非设置了 `closeByOverlay={false}`）
4. 对话框会在页面 body 上创建 Portal，确保层级高于其他元素