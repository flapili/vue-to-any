import { defineComponent as w, reactive as x, openBlock as d, createElementBlock as _, Fragment as g, renderList as B, createBlock as b, resolveDynamicComponent as E, mergeProps as R, markRaw as T, nextTick as C } from "vue";
import p from "defu";
import I from "html2canvas";
import { v4 as L } from "uuid";
const A = /* @__PURE__ */ w({
  inheritAttrs: !1,
  __name: "Renderer",
  setup(M, { expose: u }) {
    const n = x({});
    async function y({
      component: l,
      props: i,
      returnType: e,
      renderOptions: r,
      html2canvasOptions: k
    }) {
      var m;
      const t = p(r, {
        nextTicks: 1,
        style: {}
      });
      if (t.nextTicks < 1)
        throw new Error("nextTicks must be greater than 0");
      if (e === void 0 && (e = "B64Image"), !["B64Image", "canvas"].includes(e))
        throw new Error("returnType must be either B64Image or canvas");
      t.style.display === void 0 && (t.style.display = "none"), t.style = p(t.style, {
        position: "fixed"
      });
      const o = L(), h = {
        component: T(l),
        props: i,
        id: o,
        instance: null,
        renderOptions: t,
        finalStyle: t.style
      };
      n[o] = h;
      for (let s = 0; s < t.nextTicks; s++)
        await C();
      if (n[o].instance === null)
        throw delete n[o], new Error(`Component not rendered after ${t.nextTicks} ticks`);
      const a = (m = n[o].instance.vnode) == null ? void 0 : m.el;
      if (!a)
        throw delete n[o], new Error("Unable to get html from component");
      if (e === "html")
        return a.outerHTML;
      const c = await I(a, {
        ...k,
        onclone(s, v) {
          var f;
          v.style.display = ((f = r == null ? void 0 : r.style) == null ? void 0 : f.display) ?? "block";
        }
      });
      return delete n[o], e === "canvas" ? c : c.toDataURL("image/png");
    }
    return u({ render: y }), (l, i) => (d(!0), _(g, null, B(n, (e) => (d(), b(E(e.component), R({
      key: e.id,
      ref_for: !0
    }, e.props, {
      style: e.finalStyle,
      onVnodeMounted: (r) => e.instance = r.component
    }), null, 16, ["style", "onVnodeMounted"]))), 128));
  }
});
export {
  A as Renderer
};
