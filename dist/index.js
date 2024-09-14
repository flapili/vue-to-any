import { defineComponent as w, reactive as g, openBlock as p, createElementBlock as y, Fragment as _, renderList as B, createBlock as b, resolveDynamicComponent as C, normalizeStyle as E, markRaw as R, nextTick as S } from "vue";
import T from "defu";
import H from "html2canvas";
import { v4 as I } from "uuid";
const V = /* @__PURE__ */ w({
  __name: "Renderer",
  setup(W, { expose: h }) {
    const t = g({});
    async function u({
      component: r,
      props: s,
      returnType: e,
      renderOptions: a,
      html2canvasOptions: x
    }) {
      var d;
      const n = T(a, {
        nextTicks: 1,
        hideComponent: !0,
        css: {},
        position: "fixed",
        maxWidth: "100vw",
        maxHeight: "100vh"
      });
      if (n.nextTicks < 1)
        throw new Error("nextTicks must be greater than 0");
      if (e === void 0 && (e = "B64Image"), !["B64Image", "canvas"].includes(e))
        throw new Error("returnType must be either B64Image or canvas");
      const i = n.css;
      n.hideComponent && (i.display = "none"), i.position = n.position, i.maxWidth = n.maxWidth, i.maxHeight = n.maxHeight;
      const o = I(), k = {
        component: R(r),
        props: s,
        id: o,
        instance: null,
        renderOptions: n,
        finalStyle: i
      };
      t[o] = k;
      for (let c = 0; c < n.nextTicks; c++)
        await S();
      if (t[o].instance === null)
        throw delete t[o], new Error(`Component not rendered after ${n.nextTicks} ticks`);
      const l = (d = t[o].instance.vnode) == null ? void 0 : d.el;
      if (!l)
        throw delete t[o], new Error("Unable to get html from component");
      const m = await H(l, {
        ...x,
        onclone(c, v) {
          var f;
          v.style.display = ((f = a == null ? void 0 : a.css) == null ? void 0 : f.display) ?? "block";
        }
      });
      return delete t[o], e === "canvas" ? m : m.toDataURL("image/png");
    }
    return h({ render: u }), (r, s) => (p(!0), y(_, null, B(t, (e) => (p(), b(C(e.component), {
      key: e.id,
      style: E(e.finalStyle),
      onVnodeMounted: (a) => e.instance = a.component
    }, null, 8, ["style", "onVnodeMounted"]))), 128));
  }
});
export {
  V as Renderer
};
