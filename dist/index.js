import { defineComponent as v, reactive as w, openBlock as p, createElementBlock as _, Fragment as y, renderList as B, createBlock as b, resolveDynamicComponent as C, mergeProps as E, markRaw as R, nextTick as T } from "vue";
import H from "defu";
import I from "html2canvas";
import { v4 as S } from "uuid";
const V = /* @__PURE__ */ v({
  inheritAttrs: !1,
  __name: "Renderer",
  setup(W, { expose: h }) {
    const n = w({});
    async function u({
      component: s,
      props: c,
      returnType: e,
      renderOptions: i,
      html2canvasOptions: x
    }) {
      var d;
      const t = H(i, {
        nextTicks: 1,
        hideComponent: !0,
        css: {},
        position: "fixed",
        maxWidth: "100vw",
        maxHeight: "100vh"
      });
      if (t.nextTicks < 1)
        throw new Error("nextTicks must be greater than 0");
      if (e === void 0 && (e = "B64Image"), !["B64Image", "canvas"].includes(e))
        throw new Error("returnType must be either B64Image or canvas");
      const a = t.css;
      t.hideComponent && (a.display = "none"), a.position = t.position, a.maxWidth = t.maxWidth, a.maxHeight = t.maxHeight;
      const o = S(), k = {
        component: R(s),
        props: c,
        id: o,
        instance: null,
        renderOptions: t,
        finalStyle: a
      };
      n[o] = k;
      for (let r = 0; r < t.nextTicks; r++)
        await T();
      if (n[o].instance === null)
        throw delete n[o], new Error(`Component not rendered after ${t.nextTicks} ticks`);
      const m = (d = n[o].instance.vnode) == null ? void 0 : d.el;
      if (!m)
        throw delete n[o], new Error("Unable to get html from component");
      const l = await I(m, {
        ...x,
        onclone(r, g) {
          var f;
          g.style.display = ((f = i == null ? void 0 : i.css) == null ? void 0 : f.display) ?? "block";
        }
      });
      return delete n[o], e === "canvas" ? l : l.toDataURL("image/png");
    }
    return h({ render: u }), (s, c) => (p(!0), _(y, null, B(n, (e) => (p(), b(C(e.component), E({
      key: e.id,
      ref_for: !0
    }, e.props, {
      style: e.finalStyle,
      onVnodeMounted: (i) => e.instance = i.component
    }), null, 16, ["style", "onVnodeMounted"]))), 128));
  }
});
export {
  V as Renderer
};
