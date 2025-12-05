# Avatar 头像

用于展示用户头像或图标。

## 基础用法

```vue
<script setup>
import { Avatar } from '@apron-design/vue'
</script>

<template>
  <div class="demo-row">
    <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" />
    <Avatar>U</Avatar>
    <Avatar />
  </div>
</template>
```

## 尺寸

Avatar 有四种尺寸：`mini`、`small`、`middle`（默认）、`large`。

```vue
<template>
  <div class="demo-row">
    <Avatar size="mini" src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" />
    <Avatar size="small" src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" />
    <Avatar size="middle" src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" />
    <Avatar size="large" src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" />
  </div>
</template>
```

## 方形头像

```vue
<template>
  <div class="demo-row">
    <Avatar square src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" />
    <Avatar square>U</Avatar>
  </div>
</template>
```

## 头像组

使用 `AvatarGroup` 展示一组头像。

```vue
<script setup>
import { Avatar, AvatarGroup } from '@apron-design/vue'
</script>

<template>
  <AvatarGroup>
    <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" />
    <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=2" />
    <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=3" />
    <Avatar>+5</Avatar>
  </AvatarGroup>
</template>
```

## API

### Avatar Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| src | 图片地址 | `string` | - |
| alt | 图片描述 | `string` | - |
| size | 尺寸 | `'mini' \| 'small' \| 'middle' \| 'large'` | `'middle'` |
| square | 是否为方形 | `boolean` | `false` |

### Avatar Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义内容（文字或图标） |

