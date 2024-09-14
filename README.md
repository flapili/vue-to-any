# Vue To Any

## Overview

Vue To Any is a simple Vue.js component that allows you to render components as image, PDF (coming soon) or canvas.

## Installation

```bash
npm install vue-to-any
```

## Usage

The `Renderer` component have no props, only a `render` method.

For Api reference, take a look at [dist](./dist/index.d.ts) build.

## Example

Full example with Nuxt (work exactly the same with Vue 3 except for auto imports functions)

`components/A.vue`
```html
<script setup lang="ts">
const props = defineProps<{ msg: string }>()
</script>

<template>
  <div>
    A {{ props.msg }}
  </div>
</template>
```

`components/B.vue`
```html
<template>
  <div>
    B
  </div>
</template>
```

`App.vue`
```html
<script setup lang="ts">
import { A, B } from '#components'
import { Renderer } from 'vue-to-any'

const renderer = useTemplateRef('renderer')

async function addRender() {
  const a = await renderer.value!.render({
    component: A,
    props: {
      msg: 'Hello World',
    },
  })
  console.log(a)

  const b = await renderer.value!.render({
    component: B,
    props: {},
    returnType: 'canvas',
  })
  console.log(b)
}
</script>

<template>
  <div>
    <Renderer ref="renderer" />
    <button @click="addRender">
      Render
    </button>
  </div>
</template>
```

## Contributing

Feel free to contribute to the project, I will be happy to review your PR.

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`.
3. Make your changes and commit them: `git commit -m 'feat: add an awesome feature'`. (please follow conventional commits)
4. Push to your fork: `git push origin feature/your-feature`.
5. Create the pull request.

post-scriptum:
- I personally use nix to manage my development environment, feel free to use anything you want.
- That is my first open-source project, I will be happy to receive feedbacks.

## License
MIT
