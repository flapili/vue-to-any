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

  /**
   * css to apply to the component (via style attribute)
   */
  style: CSSStyleDeclaration
}

interface Renderable<T> {
  component: T
  props: ComponentProps<T>
  id: string
  instance: ComponentInstance<T> | null
  renderOptions: RenderOptions
  finalStyle: CSSStyleDeclaration
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
  returnType,
  renderOptions,
  html2canvasOptions,
}: {
  component: T
  props: ComponentProps<T>
  returnType?: R
  renderOptions?: Partial<RenderOptions>
  html2canvasOptions?: Html2canvasOption
}): Promise<ReturnType<R>> {
  const options = defu(renderOptions, {
    nextTicks: 1,
    style: {} as CSSStyleDeclaration,
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

  if (options.style.display === undefined) {
    options.style.display = 'none'
  }

  options.style = defu(options.style, {
    position: 'fixed',
  })

  const id = uuidV4()
  const renderable = {
    component: markRaw(component),
    props,
    id,
    instance: null,
    renderOptions: options,
    finalStyle: options.style,
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
      element.style.display = renderOptions?.style?.display ?? 'block'
    },
  })
  delete localState[id]

  if (returnType === 'canvas')
    return canvas as ReturnType<R>

  return canvas.toDataURL('image/png') as ReturnType<R>
}

defineExpose({ render })
</script>

<template>
  <template v-for="r in localState" :key="r.id">
    <component
      v-bind="r.props"
      :is="r.component"
      :style="r.finalStyle"
      @vue:mounted="(e: VNode) => r.instance = e.component!"
    />
  </template>
</template>
