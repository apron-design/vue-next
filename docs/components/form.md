# Form 表单

表单包含输入框、单选框、复选框、下拉选择等表单元素。

## 基础用法

```vue
<script setup>
import { ref } from 'vue'
import { Form, FormItem, Input, Button } from '@apron-design/vue'

const formData = ref({
  username: '',
  password: ''
})

const handleSubmit = (values) => {
  console.log('提交数据:', values)
}
</script>

<template>
  <Form @finish="handleSubmit" style="max-width: 400px">
    <FormItem label="用户名" name="username" required>
      <Input v-model="formData.username" placeholder="请输入用户名" />
    </FormItem>
    <FormItem label="密码" name="password" required>
      <Input v-model="formData.password" type="password" placeholder="请输入密码" />
    </FormItem>
    <FormItem>
      <Button variant="primary" type="submit">登录</Button>
    </FormItem>
  </Form>
</template>
```

## 表单布局

Form 支持三种布局：`vertical`（默认）、`horizontal` 和 `inline`。

```vue
<script setup>
import { ref } from 'vue'

const layout = ref('vertical')
</script>

<template>
  <div style="margin-bottom: 16px">
    <RadioGroup v-model="layout">
      <Radio value="vertical">垂直</Radio>
      <Radio value="horizontal">水平</Radio>
      <Radio value="inline">行内</Radio>
    </RadioGroup>
  </div>

  <Form :layout="layout" style="max-width: 600px">
    <FormItem label="用户名">
      <Input placeholder="请输入用户名" />
    </FormItem>
    <FormItem label="密码">
      <Input type="password" placeholder="请输入密码" />
    </FormItem>
    <FormItem>
      <Button variant="primary">提交</Button>
    </FormItem>
  </Form>
</template>
```

## 表单验证

通过 `rules` 属性配置验证规则。

```vue
<script setup>
import { ref } from 'vue'

const formRef = ref()
const form = ref({
  email: '',
  age: ''
})

const rules = {
  email: [
    { required: true, message: '请输入邮箱' },
    { pattern: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/, message: '邮箱格式不正确' }
  ],
  age: [
    { required: true, message: '请输入年龄' },
    { min: 1, max: 3, message: '年龄长度在 1 到 3 个字符' }
  ]
}

const handleSubmit = (values) => {
  console.log('验证通过:', values)
}

const handleFailed = (errors) => {
  console.log('验证失败:', errors)
}
</script>

<template>
  <Form 
    ref="formRef"
    @finish="handleSubmit"
    @finish-failed="handleFailed"
    style="max-width: 400px"
  >
    <FormItem label="邮箱" name="email" :rules="rules.email">
      <Input v-model="form.email" placeholder="请输入邮箱" />
    </FormItem>
    <FormItem label="年龄" name="age" :rules="rules.age">
      <Input v-model="form.age" placeholder="请输入年龄" />
    </FormItem>
    <FormItem>
      <Button variant="primary" type="submit">提交</Button>
      <Button @click="formRef?.resetFields()" style="margin-left: 8px">重置</Button>
    </FormItem>
  </Form>
</template>
```

## 浮动标签

使用 `floatingLabel` 模式实现浮动标签效果。

```vue
<template>
  <Form floating-label style="max-width: 400px">
    <FormItem label="用户名" name="username">
      <Input placeholder=" " />
    </FormItem>
    <FormItem label="邮箱" name="email">
      <Input placeholder=" " />
    </FormItem>
  </Form>
</template>
```

## useForm Hook

使用 `useForm` hook 获取表单实例进行编程控制。

```vue
<script setup>
import { useForm, Form, FormItem, Input, Button } from '@apron-design/vue'

const [formRef, form] = useForm()

const setValues = () => {
  form.setFieldsValue({
    name: '张三',
    email: 'zhangsan@example.com'
  })
}

const getValues = () => {
  const values = form.getFieldsValue()
  console.log(values)
}
</script>

<template>
  <Form ref="formRef" style="max-width: 400px">
    <FormItem label="姓名" name="name">
      <Input />
    </FormItem>
    <FormItem label="邮箱" name="email">
      <Input />
    </FormItem>
    <FormItem>
      <Button @click="setValues">设置值</Button>
      <Button @click="getValues" style="margin-left: 8px">获取值</Button>
    </FormItem>
  </Form>
</template>
```

## API

### Form Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| layout | 表单布局 | `'vertical' \| 'horizontal' \| 'inline'` | `'vertical'` |
| floatingLabel | 是否使用浮动标签 | `boolean` | `false` |
| labelWidth | 标签宽度（水平布局） | `string \| number` | - |
| labelAlign | 标签对齐方式 | `'left' \| 'right'` | `'right'` |
| disabled | 是否禁用表单 | `boolean` | `false` |
| initialValues | 初始值 | `Record<string, any>` | `{}` |

### Form Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| finish | 验证通过后触发 | `(values: Record<string, any>) => void` |
| finishFailed | 验证失败时触发 | `(errors: Record<string, string>) => void` |
| valuesChange | 字段值变化时触发 | `(changedValues, allValues) => void` |

### Form Exposes

| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| validate | 验证所有字段 | `() => Promise<boolean>` |
| validateField | 验证指定字段 | `(name: string) => Promise<boolean>` |
| resetFields | 重置所有字段 | `() => void` |
| clearValidate | 清除验证状态 | `(names?: string \| string[]) => void` |
| getFieldValue | 获取字段值 | `(name: string) => any` |
| getFieldsValue | 获取所有字段值 | `() => Record<string, any>` |
| setFieldValue | 设置字段值 | `(name: string, value: any) => void` |
| setFieldsValue | 设置多个字段值 | `(values: Record<string, any>) => void` |

### FormItem Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 字段名 | `string` | - |
| label | 标签文本 | `string` | - |
| required | 是否必填 | `boolean` | `false` |
| rules | 验证规则 | `FormRule[]` | - |
| help | 帮助文本 | `string` | - |
| extra | 额外信息 | `string` | - |

### FormRule

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| required | 是否必填 | `boolean` |
| message | 错误提示 | `string` |
| min | 最小长度 | `number` |
| max | 最大长度 | `number` |
| pattern | 正则校验 | `RegExp` |
| validator | 自定义校验函数 | `(value: any) => boolean \| Promise<boolean>` |

