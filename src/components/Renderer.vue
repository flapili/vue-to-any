<script setup lang="ts">
import type { Component, ComponentInstance, VNode } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import defu from 'defu'
import html2canvas, { type Options as Html2canvasOption } from 'html2canvas'
import { v4 as uuidV4 } from 'uuid'
import { markRaw, nextTick, reactive } from 'vue'

defineOptions({
  inheritAttrs: false,
})

interface RenderOptions {
  /**
   * How much ticks to wait before checking if the component was rendered
   * Useful for components that render async
   * @default 1
   */
  nextTicks: number
}

interface Renderable<T> {
  component: T
  props: ComponentProps<T>
  id: string
  instance: ComponentInstance<T> | null
  renderOptions: RenderOptions
  style: Partial<CSSStyleDeclaration>
}

type ReturnTypes = 'b64png' | 'canvas' | 'html'
type ReturnType<T extends ReturnTypes> =
  T extends 'b64png' ? string :
    T extends 'canvas' ? HTMLCanvasElement :
      T extends 'html' ? string :
        never

const localState = reactive<{ [k: string]: Renderable<Component> }>({})

async function render<T extends Component, R extends ReturnTypes = 'b64png'>({
  component,
  props,
  style,
  returnType,
  renderOptions,
  html2canvasOptions,
}: {
  /**
   * The component to render
   * @required
   */
  component: T
  /**
   * The props to pass to the component
   * @required
   */
  props: ComponentProps<T>
  /**
   * The style to apply to the component
   * @default { display: 'none', position: 'fixed' }
   */
  style?: Partial<CSSStyleDeclaration>
  /**
   * @default 'b64png'
   * The return type of the function
   * - 'b64png': Returns a base64 encoded png image
   * - 'canvas': Returns a canvas element
   * - 'html': Returns the html of the component
   */
  returnType?: R
  /**
   * The options for rendering the component
   * @default { nextTicks: 1 }
   */
  renderOptions?: Partial<RenderOptions>
  /**
   * The options for html2canvas
   */
  html2canvasOptions?: Partial<Html2canvasOption>
}): Promise<ReturnType<R>> {
  const options = defu(renderOptions, {
    nextTicks: 1,
  })

  const finalStyle = defu(style, {
    display: 'none',
    position: 'fixed',
  })

  if (options.nextTicks < 1) {
    throw new Error('nextTicks must be greater than 0')
  }

  if (returnType === undefined) {
    returnType = 'b64png' as R
  }

  if (!['b64png', 'canvas'].includes(returnType)) {
    throw new Error('returnType must be either b64png or canvas')
  }

  const id = uuidV4()
  const renderable = {
    component: markRaw(component),
    props,
    id,
    instance: null,
    renderOptions: options,
    style: finalStyle,
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

  if (returnType === 'html')
    return el.outerHTML as ReturnType<R>

  const canvas = await html2canvas(el, {
    ...html2canvasOptions,
    onclone(_document, element) {
      element.style.display = 'block'
    },
  })
  delete localState[id]

  if (returnType === 'canvas')
    return canvas as ReturnType<R>

  else if (returnType === 'b64png')
    return canvas.toDataURL('image/png') as ReturnType<R>

  throw new Error('Invalid returnType')
}

defineExpose({ render })
</script>

<template>
  <template v-for="r in localState" :key="r.id">
    <component
      v-bind="r.props"
      :is="r.component"
      :style="r.style"
      @vue:mounted="(e: VNode) => r.instance = e.component!"
    />
  </template>
</template>
