# Checkbox 复选框

在一组可选项中进行多项选择。

## 基础用法

```vue
<script setup>
import { ref } from 'vue'
import { Checkbox } from '@apron-design/vue'

const checked = ref(false)
</script>

<template>
  <Checkbox v-model="checked">选项</Checkbox>
</template>
```

## 禁用状态

```vue
<template>
  <div class="demo-row">
    <Checkbox disabled>禁用未选中</Checkbox>
    <Checkbox disabled :model-value="true">禁用已选中</Checkbox>
  </div>
</template>
```

## 半选状态

`indeterminate` 属性用于表示复选框的不确定状态，通常用于全选的场景。

```vue
<script setup>
import { ref, computed } from 'vue'

const checkedList = ref(['A'])
const options = ['A', 'B', 'C']

const checkAll = computed(() => checkedList.value.length === options.length)
const indeterminate = computed(() => 
  checkedList.value.length > 0 && checkedList.value.length < options.length
)

const handleCheckAll = (checked) => {
  checkedList.value = checked ? [...options] : []
}
</script>

<template>
  <div>
    <Checkbox 
      :model-value="checkAll" 
      :indeterminate="indeterminate"
      @update:model-value="handleCheckAll"
    >
      全选
    </Checkbox>
    <div class="demo-row" style="margin-top: 8px">
      <Checkbox 
        v-for="opt in options" 
        :key="opt"
        :model-value="checkedList.includes(opt)"
        @update:model-value="(checked) => {
          if (checked) checkedList.push(opt)
          else checkedList = checkedList.filter(i => i !== opt)
        }"
      >
        {{ opt }}
      </Checkbox>
    </div>
  </div>
</template>
```

## 复选框组

使用 `CheckboxGroup` 组件管理一组复选框。

```vue
<script setup>
import { ref } from 'vue'
import { Checkbox, CheckboxGroup } from '@apron-design/vue'

const selected = ref(['apple'])
</script>

<template>
  <CheckboxGroup v-model="selected">
    <Checkbox value="apple">苹果</Checkbox>
    <Checkbox value="banana">香蕉</Checkbox>
    <Checkbox value="orange">橙子</Checkbox>
  </CheckboxGroup>
  <p>选中: {{ selected.join(', ') }}</p>
</template>
```

## 垂直排列

```vue
<script setup>
import { ref } from 'vue'

const selected = ref([])
</script>

<template>
  <CheckboxGroup v-model="selected" direction="vertical">
    <Checkbox value="1">选项一</Checkbox>
    <Checkbox value="2">选项二</Checkbox>
    <Checkbox value="3">选项三</Checkbox>
  </CheckboxGroup>
</template>
```

## API

### Checkbox Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue (v-model) | 是否选中 | `boolean` | `false` |
| value | 选中时的值（用于 CheckboxGroup） | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| indeterminate | 是否为半选状态 | `boolean` | `false` |
| labelClickable | 点击文字是否触发选择 | `boolean` | `true` |

### Checkbox Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 选中状态变化时触发 | `(checked: boolean) => void` |
| change | 选中状态变化时触发 | `(checked: boolean) => void` |

### CheckboxGroup Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue (v-model) | 选中的值数组 | `string[]` | `[]` |
| disabled | 是否禁用所有选项 | `boolean` | `false` |
| direction | 排列方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| labelClickable | 点击文字是否触发选择 | `boolean` | `true` |

### CheckboxGroup Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 选中值变化时触发 | `(value: string[]) => void` |
| change | 选中值变化时触发 | `(value: string[]) => void` |

