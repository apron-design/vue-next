# @apron-design/vue

Apron Design - 一个现代化的 Vue 3 组件库，使用 TypeScript 和 SCSS 构建，支持 40+ 组件和暗黑模式。

## 安装

```bash
npm install @apron-design/vue
# 或
yarn add @apron-design/vue
# 或
pnpm add @apron-design/vue
```

## 使用

### 全局注册

```typescript
import { createApp } from 'vue'
import ApronDesign from '@apron-design/vue'
import '@apron-design/vue/styles'

const app = createApp(App)
app.use(ApronDesign)
app.mount('#app')
```

### 按需导入

```vue
<script setup lang="ts">
import { Button, Modal, Toast } from '@apron-design/vue'
import '@apron-design/vue/styles'
</script>

<template>
  <Button variant="primary" @click="handleClick">
    点击我
  </Button>
</template>
```

## 组件列表

### 基础组件
- **Button** - 按钮
- **Alert** - 警告提示
- **Badge** - 徽标
- **Tag** - 标签
- **Link** - 链接
- **Divider** - 分割线

### 表单组件
- **Input** - 输入框
- **Textarea** - 文本域
- **InputOtp** - OTP 验证码输入
- **Checkbox** - 复选框
- **CheckboxGroup** - 复选框组
- **Radio** - 单选框
- **RadioGroup** - 单选框组
- **Switch** - 开关
- **Select** - 下拉选择
- **Cascader** - 级联选择
- **DatePicker** - 日期选择
- **Rate** - 评分
- **Form** - 表单
- **FormItem** - 表单项

### 数据展示
- **Avatar** - 头像
- **AvatarGroup** - 头像组
- **Card** - 卡片
- **Collapse** - 折叠面板
- **Empty** - 空状态
- **Timeline** - 时间线
- **Image** - 图片
- **Skeleton** - 骨架屏

### 反馈组件
- **Modal** - 对话框
- **Drawer** - 抽屉
- **Toast** - 轻提示
- **Message** - 全局消息
- **Tooltip** - 文字提示
- **Popover** - 气泡卡片
- **PopoverConfirm** - 气泡确认框
- **Spin** - 加载中

### 导航组件
- **Tabs** - 标签页
- **Steps** - 步骤条
- **Pagination** - 分页

### 布局组件
- **Row** - 行
- **Col** - 列
- **Space** - 间距

### 其他
- **ResponsiveModal** - 响应式弹窗

## 暗黑模式

在 HTML 根元素上添加 `data-theme="dark"` 属性即可启用暗黑模式：

```html
<html data-theme="dark">
  ...
</html>
```

## TypeScript

该组件库完全使用 TypeScript 编写，提供完整的类型定义。

```typescript
import type { ButtonProps, ButtonVariant } from '@apron-design/vue'
```

## License

MIT

