# Installation

## npm

We recommend using npm or yarn to install, it not only makes development easier, but also allows you to take advantage of the rich ecosystem of JavaScript packages and tooling.

```bash
npm install @apron-design/vue-next
```

```bash
yarn add @apron-design/vue-next
```

```bash
pnpm add @apron-design/vue-next
```

## Import in Browser

Add `script` and `link` tags in your browser and use the global variable `ApronDesignVue`.

```html
<link rel="stylesheet" href="@apron-design/vue-next/dist/style.css" />
<script src="@apron-design/vue-next/dist/index.js"></script>
```

We provide different builds of Ant Design Vue for different usage scenarios. You can find them in the [dist folder](https://unpkg.com/@apron-design/vue-next/dist/) of npm package or CDN.

| Type | Path |
| --- | --- |
| ESM build for modern browsers that support ES Modules | `@apron-design/vue-next/dist/index.js` |
| ESM build for modern browsers that support ES Modules + Tree Shaking | `@apron-design/vue-next/dist/*` |
| CommonJS build for Node.js server-side rendering | `@apron-design/vue-next/dist/index.cjs` |
| UMD build for direct browser usage with `<script>` | `@apron-design/vue-next/dist/index.umd.js` |

> **Warning**: As browsers implement the Custom Elements API differently, @apron-design/vue-next uses two different builds:
> 1. For modern browsers that support native Shadow DOM, use the standard build
> 2. For older browsers, use the legacy build with polyfills

## Usage

### Import All Components

```ts
import { createApp } from 'vue'
import ApronDesignVue from '@apron-design/vue-next'
import '@apron-design/vue-next/dist/style.css'

const app = createApp(App)
app.use(ApronDesignVue)
```

### Import Per Component (Recommended)

```ts
import { createApp } from 'vue'
import { Button, Divider } from '@apron-design/vue-next'
import '@apron-design/vue-next/dist/style.css'

const app = createApp(App)
app.use(Button)
app.use(Divider)
```

### Import On Demand

```ts
import { createApp } from 'vue'
import { Button } from '@apron-design/vue-next/button'
import '@apron-design/vue-next/button/style/css'

const app = createApp(App)
app.component(Button.name, Button)
```