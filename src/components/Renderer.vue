<script setup lang="ts">
import type { Component, ComponentInstance, VNode } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import defu from 'defu'
import html2canvas, { type Options as Html2canvasOption } from 'html2canvas'
import { v4 as uuidV4 } from 'uuid'
import { markRaw, nextTick, reactive } from 'vue'

interface RenderOptions {
  /**
   * How much ticks to wait before checking if the component was rendered
   * Useful for components that render async
   * @default 1
   */
  nextTicks: number
  /**
   * hide rendered component (useful for debug purposes)
   * @default true
   */
  hideComponent: boolean
  /**
   * width of the component to render
   * @default "100vw"
   */
  maxWidth: CSSStyleDeclaration['maxWidth']
  /**
   * height of the component to render
   * @default "100vh"
   */
  maxHeight: CSSStyleDeclaration['maxHeight']

  /**
   * Extra css to apply to the component (via style attribute)
   */
  css: CSSStyleDeclaration

  /**
   * position of the component
   * @default 'fixed'
   */
  position: 'relative' | 'absolute' | 'fixed'
}

interface Renderable<T> {
  component: T
  props: ComponentProps<T>
  id: string
  instance: ComponentInstance<T> | null
  renderOptions: RenderOptions
  finalStyle: CSSStyleDeclaration
}

const localState = reactive<{ [k: string]: Renderable<Component> }>({})

async function render<T extends Component, R extends 'B64Image' | 'canvas' = 'B64Image'>({
  component,
  props,
  returnType,
  renderOptions,
  html2canvasOptions,
}: {
  component: T
  props: ComponentProps<T>
  returnType?: R
  renderOptions?: Partial<RenderOptions>
  html2canvasOptions?: Html2canvasOption
}): Promise<R extends 'B64Image' ? string : HTMLCanvasElement> {
  const options = defu(renderOptions, {
    nextTicks: 1,
    hideComponent: true,
    css: {} as CSSStyleDeclaration,
    position: 'fixed' as const,
    maxWidth: '100vw' as const,
    maxHeight: '100vh' as const,
  })

  if (options.nextTicks < 1) {
    throw new Error('nextTicks must be greater than 0')
  }

  if (returnType === undefined) {
    returnType = 'B64Image' as R
  }

  if (!['B64Image', 'canvas'].includes(returnType)) {
    throw new Error('returnType must be either B64Image or canvas')
  }

  const finalStyle = options.css

  if (options.hideComponent) {
    finalStyle.display = 'none'
  }
  finalStyle.position = options.position
  finalStyle.maxWidth = options.maxWidth
  finalStyle.maxHeight = options.maxHeight

  const id = uuidV4()
  const renderable = {
    component: markRaw(component),
    props,
    id,
    instance: null,
    renderOptions: options,
    finalStyle,
  }
  localState[id] = renderable

  for (let i = 0; i < (options.nextTicks); i++) {
    await nextTick()
  }

  if (localState[id].instance === null) {
    delete localState[id]
    throw new Error(`Component not rendered after ${options.nextTicks} ticks`)
  }

  const el = localState[id].instance.vnode?.el as HTMLElement | undefined

  if (!el) {
    delete localState[id]
    throw new Error('Unable to get html from component')
  }

  const canvas = await html2canvas(el, {
    ...html2canvasOptions,
    onclone(_document, element) {
      element.style.display = renderOptions?.css?.display ?? 'block'
    },
  })
  delete localState[id]

  if (returnType === 'canvas') {
    return canvas as R extends 'B64Image' ? never : HTMLCanvasElement
  }
  return canvas.toDataURL('image/png') as R extends 'B64Image' ? string : never
}

defineExpose({ render })
</script>

<template>
  <template v-for="r in localState" :key="r.id">
    <component :is="r.component" :style="r.finalStyle" @vue:mounted="(e: VNode) => r.instance = e.component!" />
  </template>
</template>
