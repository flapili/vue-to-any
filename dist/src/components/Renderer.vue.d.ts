import { Component } from 'vue';
import { ComponentProps } from 'vue-component-type-helpers';
import { Options as Html2canvasOption } from 'html2canvas';
interface RenderOptions {
    /**
     * How much ticks to wait before checking if the component was rendered
     * Useful for components that render async
     * @default 1
     */
    nextTicks: number;
    /**
     * hide rendered component (useful for debug purposes)
     * @default true
     */
    hideComponent: boolean;
    /**
     * width of the component to render
     * @default "100vw"
     */
    maxWidth: CSSStyleDeclaration['maxWidth'];
    /**
     * height of the component to render
     * @default "100vh"
     */
    maxHeight: CSSStyleDeclaration['maxHeight'];
    /**
     * Extra css to apply to the component (via style attribute)
     */
    css: CSSStyleDeclaration;
    /**
     * position of the component
     * @default 'fixed'
     */
    position: 'relative' | 'absolute' | 'fixed';
}
declare function render<T extends Component, R extends 'B64Image' | 'canvas' = 'B64Image'>({ component, props, returnType, renderOptions, html2canvasOptions, }: {
    component: T;
    props: ComponentProps<T>;
    returnType?: R;
    renderOptions?: Partial<RenderOptions>;
    html2canvasOptions?: Html2canvasOption;
}): Promise<R extends 'B64Image' ? string : HTMLCanvasElement>;
declare const _default: import('vue').DefineComponent<{}, {
    render: typeof render;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
