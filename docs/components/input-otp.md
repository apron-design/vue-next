# InputOtp 验证码输入

用于输入短信验证码、PIN 码等场景。

## 基础用法

```vue
<script setup>
import { ref } from 'vue'
import { InputOtp } from '@apron-design/vue'

const code = ref('')

const handleComplete = (value) => {
  console.log('输入完成:', value)
}
</script>

<template>
  <InputOtp v-model="code" @complete="handleComplete" />
</template>
```

## 自定义长度

通过 `length` 属性设置验证码长度。

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <InputOtp :length="4" />
    <InputOtp :length="6" />
  </div>
</template>
```

## 密码模式

使用 `password` 属性隐藏输入内容。

```vue
<template>
  <InputOtp :length="4" password />
</template>
```

## 禁用状态

```vue
<template>
  <InputOtp disabled model-value="123456" />
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue (v-model) | 绑定值 | `string` | `''` |
| length | 验证码长度 | `number` | `6` |
| disabled | 是否禁用 | `boolean` | `false` |
| password | 是否使用密码模式 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 值变化时触发 | `(value: string) => void` |
| change | 值变化时触发 | `(value: string) => void` |
| complete | 输入完成时触发 | `(value: string) => void` |

