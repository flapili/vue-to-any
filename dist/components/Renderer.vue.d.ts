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
}
type ReturnTypes = 'b64png' | 'canvas' | 'html';
type ReturnType<T extends ReturnTypes> = T extends 'b64png' ? string : T extends 'canvas' ? HTMLCanvasElement : T extends 'html' ? string : never;
declare function render<T extends Component, R extends ReturnTypes = 'b64png'>({ component, props, style, returnType, renderOptions, html2canvasOptions, }: {
    /**
     * The component to render
     * @required
     */
    component: T;
    /**
     * The props to pass to the component
     * @required
     */
    props: ComponentProps<T>;
    /**
     * The style to apply to the component
     * @default { display: 'none', position: 'fixed' }
     */
    style?: Partial<CSSStyleDeclaration>;
    /**
     * @default 'b64png'
     * The return type of the function
     * - 'b64png': Returns a base64 encoded png image
     * - 'canvas': Returns a canvas element
     * - 'html': Returns the html of the component
     */
    returnType?: R;
    /**
     * The options for rendering the component
     * @default { nextTicks: 1 }
     */
    renderOptions?: Partial<RenderOptions>;
    /**
     * The options for html2canvas
     */
    html2canvasOptions?: Partial<Html2canvasOption>;
}): Promise<ReturnType<R>>;
declare const _default: import('vue').DefineComponent<{}, {
    render: typeof render;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
