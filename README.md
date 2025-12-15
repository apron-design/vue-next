# Apron Design Vue

A modern, intelligent Vue 3 component library built with TypeScript and Less. Featuring 40+ components with dark mode support.

## Features

- 🌈 Enterprise-class UI designed for web applications
- 📦 A set of high-quality Vue components out of the box
- 🛡 Written in TypeScript with predictable static types
- ⚙️ Whole package of design resources and development tools
- 🎨 Powerful theme customization in every detail
- 🌍 Internationalization support for dozens of languages

## Installation

```bash
npm install @apron-design/vue-next
```

```bash
yarn add @apron-design/vue-next
```

```bash
pnpm add @apron-design/vue-next
```

## Usage

### Import All Components

```ts
import { createApp } from 'vue'
import ApronDesignVue from '@apron-design/vue-next'
import '@apron-design/vue-next/styles'

const app = createApp(App)
app.use(ApronDesignVue)
```

### Import Per Component (Recommended)

```vue
<script setup lang="ts">
import { AdButton, AdDivider } from '@apron-design/vue-next'
import '@apron-design/vue-next/styles'
</script>

<template>
  <div>
    <ad-button variant="primary">Click Me</ad-button>
    <ad-divider />
  </div>
</template>
```

## Documentation

Visit our [documentation site](https://apron-design.github.io/vue-next/) for detailed usage instructions and examples.

## License

MIT © Offontime Inc.