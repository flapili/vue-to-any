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
     * css to apply to the component (via style attribute)
     */
    style: CSSStyleDeclaration;
}
type ReturnTypes = 'b64png' | 'canvas' | 'html';
type ReturnType<T extends ReturnTypes> = T extends 'b64png' ? string : T extends 'canvas' ? HTMLCanvasElement : T extends 'html' ? string : never;
declare function render<T extends Component, R extends ReturnTypes = 'b64png'>({ component, props, returnType, renderOptions, html2canvasOptions, }: {
    component: T;
    props: ComponentProps<T>;
    returnType?: R;
    renderOptions?: Partial<RenderOptions>;
    html2canvasOptions?: Html2canvasOption;
}): Promise<ReturnType<R>>;
declare const _default: import('vue').DefineComponent<{}, {
    render: typeof render;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
