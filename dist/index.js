import { defineComponent as x, reactive as _, openBlock as d, createElementBlock as b, Fragment as y, renderList as E, createBlock as R, resolveDynamicComponent as T, mergeProps as B, markRaw as C, nextTick as L } from "vue";
import p from "defu";
import M from "html2canvas";
import { v4 as D } from "uuid";
const H = /* @__PURE__ */ x({
  inheritAttrs: !1,
  __name: "Renderer",
  setup(S, { expose: f }) {
    const n = _({});
    async function u({
      component: c,
      props: a,
      style: t,
      returnType: e,
      renderOptions: k,
      html2canvasOptions: w
    }) {
      var m;
      const r = p(k, {
        nextTicks: 1
      }), h = p(t, {
        display: "none",
        position: "fixed"
      });
      if (r.nextTicks < 1)
        throw new Error("nextTicks must be greater than 0");
      if (e === void 0 && (e = "b64png"), !["b64png", "canvas"].includes(e))
        throw new Error("returnType must be either b64png or canvas");
      const o = D(), v = {
        component: C(c),
        props: a,
        id: o,
        instance: null,
        renderOptions: r,
        style: h
      };
      n[o] = v;
      for (let s = 0; s < r.nextTicks; s++)
        await L();
      if (n[o].instance === null)
        throw delete n[o], new Error(`Component not rendered after ${r.nextTicks} ticks`);
      const i = (m = n[o].instance.vnode) == null ? void 0 : m.el;
      if (!i)
        throw delete n[o], new Error("Unable to get html from component");
      if (e === "html")
        return i.outerHTML;
      const l = await M(i, {
        ...w,
        onclone(s, g) {
          g.style.display = "block";
        }
      });
      if (delete n[o], e === "canvas")
        return l;
      if (e === "b64png")
        return l.toDataURL("image/png");
      throw new Error("Invalid returnType");
    }
    return f({ render: u }), (c, a) => (d(!0), b(y, null, E(n, (t) => (d(), R(T(t.component), B({
      key: t.id,
      ref_for: !0
    }, t.props, {
      style: t.style,
      onVnodeMounted: (e) => t.instance = e.component
    }), null, 16, ["style", "onVnodeMounted"]))), 128));
  }
});
export {
  H as Renderer
};
