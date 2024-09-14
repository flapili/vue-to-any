import defu from 'defu';
import html2canvas from 'html2canvas';
import { v4 as uuidV4 } from 'uuid';
import { markRaw, nextTick, reactive } from 'vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const localState = reactive({});
async function render({ component, props, returnType, renderOptions, html2canvasOptions, }) {
    const options = defu(renderOptions, {
        nextTicks: 1,
        hideComponent: true,
        css: {},
        position: 'fixed',
        maxWidth: '100vw',
        maxHeight: '100vh',
    });
    if (options.nextTicks < 1) {
        throw new Error('nextTicks must be greater than 0');
    }
    if (returnType === undefined) {
        returnType = 'B64Image';
    }
    if (!['B64Image', 'canvas'].includes(returnType)) {
        throw new Error('returnType must be either B64Image or canvas');
    }
    const finalStyle = options.css;
    if (options.hideComponent) {
        finalStyle.display = 'none';
    }
    finalStyle.position = options.position;
    finalStyle.maxWidth = options.maxWidth;
    finalStyle.maxHeight = options.maxHeight;
    const id = uuidV4();
    const renderable = {
        component: markRaw(component),
        props,
        id,
        instance: null,
        renderOptions: options,
        finalStyle,
    };
    localState[id] = renderable;
    for (let i = 0; i < (options.nextTicks); i++) {
        await nextTick();
    }
    if (localState[id].instance === null) {
        delete localState[id];
        throw new Error(`Component not rendered after ${options.nextTicks} ticks`);
    }
    const el = localState[id].instance.vnode?.el;
    if (!el) {
        delete localState[id];
        throw new Error('Unable to get html from component');
    }
    const canvas = await html2canvas(el, {
        ...html2canvasOptions,
        onclone(_document, element) {
            element.style.display = renderOptions?.css?.display ?? 'block';
        },
    });
    delete localState[id];
    if (returnType === 'canvas') {
        return canvas;
    }
    return canvas.toDataURL('image/png');
}
const __VLS_exposed = { render };
defineExpose({ render });
const __VLS_fnComponent = (await import('vue')).defineComponent({});
;
let __VLS_functionalComponentProps;
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_localComponents = {
        ...{},
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_components;
    const __VLS_localDirectives = {
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_directives;
    let __VLS_styleScopedClasses;
    let __VLS_resolvedLocalAndGlobalComponents;
    for (const [r] of __VLS_getVForSourceType((__VLS_ctx.localState))) {
        const __VLS_0 = ((r.component));
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{ 'onVue:mounted': {} }, ...{ style: ((r.finalStyle)) }, }));
        const __VLS_2 = __VLS_1({ ...{ 'onVue:mounted': {} }, ...{ style: ((r.finalStyle)) }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        let __VLS_6;
        const __VLS_7 = {
            'onVue:mounted': ((e) => r.instance = e.component)
        };
        let __VLS_3;
        let __VLS_4;
        const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    }
    var __VLS_slots;
    var __VLS_inheritedAttrs;
    const __VLS_refs = {};
    var $refs;
    return {
        slots: __VLS_slots,
        refs: $refs,
        attrs: {},
    };
}
;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            localState: localState,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {
            ...__VLS_exposed,
        };
    },
});
;
