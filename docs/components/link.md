# Link 链接

文字超链接组件。

## 基础用法

链接有两种类型：`primary` 和 `secondary`。

```vue
<script setup>
import { Link } from '@apron-design/vue'
</script>

<template>
  <div class="demo-row">
    <Link href="#">主要链接</Link>
    <Link variant="secondary" href="#">次要链接</Link>
  </div>
</template>
```

## 下划线

通过 `underline` 属性控制下划线的显示方式。

```vue
<template>
  <div class="demo-row">
    <Link underline="always" href="#">始终显示下划线</Link>
    <Link underline="hover" href="#">悬停显示下划线</Link>
    <Link underline="never" href="#">从不显示下划线</Link>
  </div>
</template>
```

## 危险链接

用于危险操作的链接。

```vue
<template>
  <div class="demo-row">
    <Link danger href="#">删除</Link>
    <Link variant="secondary" danger href="#">危险次要链接</Link>
  </div>
</template>
```

## 外部链接

使用 `target="_blank"` 在新窗口打开链接。

```vue
<template>
  <Link href="https://github.com" target="_blank">
    访问 GitHub
  </Link>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| variant | 链接类型 | `'primary' \| 'secondary'` | `'primary'` |
| underline | 下划线显示方式 | `'always' \| 'hover' \| 'never'` | `'hover'` |
| danger | 是否为危险链接 | `boolean` | `false` |
| href | 链接地址 | `string` | - |
| target | 链接打开方式 | `string` | - |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 链接文字 |

