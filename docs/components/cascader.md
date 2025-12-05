# Cascader 级联选择

级联选择框，用于有清晰层级结构的数据选择。

## 基础用法

```vue
<script setup>
import { ref } from 'vue'
import { Cascader } from '@apron-design/vue'

const value = ref([])

const options = [
  {
    label: '浙江',
    value: 'zhejiang',
    children: [
      {
        label: '杭州',
        value: 'hangzhou',
        children: [
          { label: '西湖区', value: 'xihu' },
          { label: '余杭区', value: 'yuhang' }
        ]
      },
      {
        label: '宁波',
        value: 'ningbo',
        children: [
          { label: '海曙区', value: 'haishu' },
          { label: '江北区', value: 'jiangbei' }
        ]
      }
    ]
  },
  {
    label: '江苏',
    value: 'jiangsu',
    children: [
      {
        label: '南京',
        value: 'nanjing',
        children: [
          { label: '玄武区', value: 'xuanwu' },
          { label: '秦淮区', value: 'qinhuai' }
        ]
      }
    ]
  }
]
</script>

<template>
  <Cascader v-model="value" :options="options" placeholder="请选择地区" />
</template>
```

## 选择即改变

设置 `changeOnSelect` 后，选择任意层级都会触发 change 事件。

```vue
<script setup>
import { ref } from 'vue'

const value = ref([])
</script>

<template>
  <Cascader v-model="value" :options="options" change-on-select />
</template>
```

## 自定义分隔符

通过 `separator` 属性自定义显示的分隔符。

```vue
<template>
  <Cascader v-model="value" :options="options" separator=" > " />
</template>
```

## 禁用选项

选项中设置 `disabled` 可禁用该选项。

```vue
<script setup>
const optionsWithDisabled = [
  {
    label: '选项一',
    value: '1',
    children: [
      { label: '子选项1-1', value: '1-1' },
      { label: '子选项1-2（禁用）', value: '1-2', disabled: true }
    ]
  }
]
</script>

<template>
  <Cascader :options="optionsWithDisabled" />
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue (v-model) | 选中的值数组 | `(string \| number)[]` | `[]` |
| options | 选项数据 | `CascaderOption[]` | `[]` |
| placeholder | 占位文本 | `string` | `'请选择'` |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 是否加载中 | `boolean` | `false` |
| inflow | 内联模式 | `boolean` | `false` |
| separator | 分隔符 | `string` | `' / '` |
| changeOnSelect | 选择任意级别时触发变化 | `boolean` | `false` |

### CascaderOption

| 属性 | 说明 | 类型 | 必填 |
| --- | --- | --- | --- |
| label | 选项显示文本 | `string` | 是 |
| value | 选项值 | `string \| number` | 是 |
| disabled | 是否禁用 | `boolean` | 否 |
| children | 子选项 | `CascaderOption[]` | 否 |

### Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 值变化时触发 | `(value: (string \| number)[]) => void` |
| change | 值变化时触发 | `(value, selectedOptions) => void` |
| openChange | 下拉框展开/收起时触发 | `(open: boolean) => void` |

