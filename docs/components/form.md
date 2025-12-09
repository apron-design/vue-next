# Form 表单

高性能表单控件，自带数据域管理。包含数据录入、校验以及对应样式。

## 基础用法

最基础的表单使用方式。

:::demo 基础表单包含各种表单项和验证规则。
```vue
<template>
  <Form :model="formState" :rules="rules" @finish="onFinish" @finishFailed="onFinishFailed">
    <FormItem label="用户名" name="username">
      <Input v-model:value="formState.username" />
    </FormItem>
    
    <FormItem label="密码" name="password">
      <Input v-model:value="formState.password" type="password" />
    </FormItem>
    
    <FormItem>
      <Button type="primary" html-type="submit">登录</Button>
    </FormItem>
  </Form>
</template>

<script setup>
import { reactive } from 'vue'

const formState = reactive({
  username: '',
  password: '',
})

const rules = {
  username: [
    { required: true, message: '请输入用户名!' },
    { min: 3, message: '用户名至少3个字符!' }
  ],
  password: [
    { required: true, message: '请输入密码!' },
    { min: 6, message: '密码至少6个字符!' }
  ]
}

const onFinish = (values) => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo)
}
</script>
```
:::

## 表单布局

表单有三种布局方式：垂直、水平和内联。

:::demo 通过 layout 属性设置表单布局。
```vue
<template>
  <div>
    <RadioGroup v-model:value="layout" style="margin-bottom: 16px;">
      <Radio value="vertical">垂直布局</Radio>
      <Radio value="horizontal">水平布局</Radio>
      <Radio value="inline">内联布局</Radio>
    </RadioGroup>
    
    <Form :layout="layout" :model="formState">
      <FormItem label="姓名" name="name">
        <Input v-model:value="formState.name" />
      </FormItem>
      
      <FormItem label="邮箱" name="email">
        <Input v-model:value="formState.email" />
      </FormItem>
      
      <FormItem label="年龄" name="age">
        <Input v-model:value="formState.age" type="number" />
      </FormItem>
      
      <FormItem>
        <Button type="primary" html-type="submit">提交</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const layout = ref('vertical')
const formState = reactive({
  name: '',
  email: '',
  age: undefined,
})
</script>
```
:::

## 表单方法

通过 form 实例可以调用表单的各种方法。

:::demo 使用 form 实例调用表单方法。
```vue
<template>
  <div>
    <Form ref="formRef" :model="formState" :rules="rules">
      <FormItem label="用户名" name="username">
        <Input v-model:value="formState.username" />
      </FormItem>
      
      <FormItem label="邮箱" name="email">
        <Input v-model:value="formState.email" />
      </FormItem>
    </Form>
    
    <div style="margin-top: 16px;">
      <Button @click="validateFields">验证表单</Button>
      <Button @click="resetFields" style="margin-left: 8px;">重置表单</Button>
      <Button @click="setFieldsValue" style="margin-left: 8px;">设置表单值</Button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const formRef = ref()
const formState = reactive({
  username: '',
  email: '',
})

const rules = {
  username: [{ required: true, message: '请输入用户名!' }],
  email: [
    { required: true, message: '请输入邮箱!' },
    { type: 'email', message: '请输入有效的邮箱地址!' }
  ]
}

const validateFields = () => {
  formRef.value?.validateFields()
    .then(values => {
      console.log('Validate Success:', values)
    })
    .catch(errorInfo => {
      console.log('Validate Failed:', errorInfo)
    })
}

const resetFields = () => {
  formRef.value?.resetFields()
}

const setFieldsValue = () => {
  formRef.value?.setFieldsValue({
    username: '张三',
    email: 'zhangsan@example.com'
  })
}
</script>
```
:::

## 动态增减表单项

动态增加或减少表单项。

:::demo 动态增减表单项。
```vue
<template>
  <Form :model="formState" :rules="rules">
    <FormItem label="姓名" name="name">
      <Input v-model:value="formState.name" />
    </FormItem>
    
    <FormItem 
      v-for="(item, index) in formState.items" 
      :key="item.id"
      :label="`项目 ${index + 1}`"
      :name="['items', index, 'value']"
    >
      <div style="display: flex; gap: 8px;">
        <Input v-model:value="item.value" />
        <Button @click="removeItem(index)">删除</Button>
      </div>
    </FormItem>
    
    <FormItem>
      <Button @click="addItem">添加项目</Button>
      <Button type="primary" html-type="submit" style="margin-left: 8px;">提交</Button>
    </FormItem>
  </Form>
</template>

<script setup>
import { ref, reactive } from 'vue'

let itemId = 0

const formState = reactive({
  name: '',
  items: [{ id: itemId++, value: '' }]
})

const rules = {
  name: [{ required: true, message: '请输入姓名!' }],
  items: {
    value: [{ required: true, message: '请输入项目值!' }]
  }
}

const addItem = () => {
  formState.items.push({ id: itemId++, value: '' })
}

const removeItem = (index) => {
  formState.items.splice(index, 1)
}
</script>
```
:::

## API

### Form Props

| 参数名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model | 表单数据对象 | `object` | `-` |
| rules | 表单验证规则 | `object` | `-` |
| layout | 表单布局 | `'vertical' \| 'horizontal' \| 'inline'` | `'vertical'` |
| labelCol | label 标签布局 | `object` | `-` |
| wrapperCol | 需要为输入控件设置布局样式时，使用该属性 | `object` | `-` |
| colon | 配置 Form.Item 的 colon 的默认值。表示是否显示 label 后面的冒号 | `boolean` | `true` |
| labelAlign | label 标签的文本对齐方式 | `'left' \| 'right'` | `'right'` |
| disabled | 设置表单组件禁用 | `boolean` | `false` |

### Form Events

| 事件名 | 描述 | 参数 |
| --- | --- | --- |
| finish | 提交表单且数据验证成功后回调事件 | `Function(values)` |
| finishFailed | 提交表单且数据验证失败后回调事件 | `Function({ values, errorFields, outOfDate })` |
| valuesChange | 字段值更新时触发回调事件 | `Function(changedValues, allValues)` |

### Form Methods

| 方法名 | 描述 | 参数 |
| --- | --- | --- |
| validateFields | 触发表单验证 | `Function(nameList?: NamePath[])` |
| validateField | 验证单个字段 | `Function(name: NamePath)` |
| resetFields | 重置表单 | `Function(fields?: NamePath[])` |
| setFieldsValue | 设置表单的值 | `Function(values)` |
| getFieldsValue | 获取表单的值 | `Function()` |
| getFieldError | 获取某个字段的错误信息 | `Function(name: NamePath)` |
| getFieldsError | 获取一组字段的错误信息 | `Function(nameList?: NamePath[])` |
| isFieldTouched | 判断某个字段是否被用户操作过 | `Function(name: NamePath)` |
| isFieldsTouched | 判断字段是否被用户操作过 | `Function(nameList?: NamePath[], allTouched?: boolean)` |
| scrollToField | 滚动到对应字段位置 | `Function(name: NamePath, options: [[scrollIntoView]](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView)'s option)` |

### Form.Item Props

| 参数名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 字段名，支持数组 | `string \| number \| (string \| number)[]` | `-` |
| label | label 标签的文本 | `string \| slot` | `-` |
| rules | 校验规则 | `object \| array` | `-` |
| help | 提示信息，如不设置，则会根据校验规则自动生成 | `string \| slot` | `-` |
| extra | 额外的提示信息，和 help 类似，当需要错误信息和提示文案同时出现时，可以使用这个 | `string \| slot` | `-` |
| required | 是否必填，如不设置，则会根据校验规则自动生成 | `boolean` | `false` |
| colon | 配合 label 属性使用，表示是否显示 label 后面的冒号 | `boolean` | `true` |
| labelCol | label 标签布局 | `object` | `-` |
| wrapperCol | 需要为输入控件设置布局样式时，使用该属性 | `object` | `-` |
| hasFeedback | 配合 validateStatus 属性使用，展示校验状态图标 | `boolean` | `false` |
| validateStatus | 校验状态 | `'success' \| 'warning' \| 'error' \| 'validating'` | `-` |