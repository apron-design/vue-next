import { defineComponent as O, computed as f, createElementBlock as r, openBlock as o, normalizeClass as D, createElementVNode as u, renderSlot as w, createTextVNode as I, toDisplayString as T, useAttrs as R, ref as x, mergeProps as B, unref as M, useSlots as ie, createCommentVNode as C, createBlock as H, resolveDynamicComponent as Z, Fragment as W, renderList as Y, normalizeStyle as fe, watch as z, onMounted as U, onBeforeUnmount as J, createVNode as G, Transition as q, withCtx as E, inject as X, withModifiers as Te, provide as te, Teleport as Q, reactive as ue, nextTick as ve, createApp as be, h as se, createSlots as xe, createStaticVNode as De, withDirectives as ze, vShow as Ge } from "vue";
const We = ["innerHTML"], qe = { class: "apron-alert__message" }, Ne = /* @__PURE__ */ O({
  __name: "Alert",
  props: {
    type: { default: "info" },
    message: {}
  },
  setup(e) {
    const a = e, t = f(() => [
      "apron-alert",
      `apron-alert--${a.type}`
    ]), n = {
      info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 16v-4"/>
    <path d="M12 8h.01"/>
  </svg>`,
      success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>`,
      warning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>`,
      error: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="15" y1="9" x2="9" y2="15"/>
    <line x1="9" y1="9" x2="15" y2="15"/>
  </svg>`
    };
    return (p, l) => (o(), r("div", {
      class: D(t.value),
      role: "alert"
    }, [
      u("span", {
        class: "apron-alert__icon",
        innerHTML: n[e.type]
      }, null, 8, We),
      u("span", qe, [
        w(p.$slots, "default", {}, () => [
          I(T(e.message), 1)
        ])
      ])
    ], 2));
  }
}), Ye = ["src", "alt"], Ue = {
  key: 1,
  class: "apron-avatar__content"
}, Je = /* @__PURE__ */ O({
  __name: "Avatar",
  props: {
    src: {},
    alt: {},
    size: { default: "middle" },
    square: { type: Boolean, default: !1 }
  },
  setup(e) {
    const a = e, t = R(), n = x(!1), p = f(() => [
      "apron-avatar",
      `apron-avatar--${a.size}`,
      {
        "apron-avatar--square": a.square
      }
    ]), l = f(() => a.src && !n.value), s = () => {
      n.value = !0;
    };
    return (i, c) => (o(), r("span", B({ class: p.value }, M(t)), [
      l.value ? (o(), r("img", {
        key: 0,
        src: e.src,
        alt: e.alt,
        class: "apron-avatar__image",
        onError: s
      }, null, 40, Ye)) : (o(), r("span", Ue, [
        w(i.$slots, "default", {}, () => [
          c[0] || (c[0] = u("svg", {
            viewBox: "0 0 24 24",
            fill: "currentColor"
          }, [
            u("path", { d: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" })
          ], -1))
        ])
      ]))
    ], 16));
  }
}), Xe = /* @__PURE__ */ O({
  __name: "AvatarGroup",
  props: {
    max: {}
  },
  setup(e) {
    const a = R(), t = f(() => [
      "apron-avatar-group"
    ]);
    return (n, p) => (o(), r("div", B({ class: t.value }, M(a)), [
      w(n.$slots, "default")
    ], 16));
  }
}), Qe = {
  key: 0,
  class: "apron-badge__indicator"
}, Ze = {
  key: 0,
  class: "apron-badge__dot"
}, et = {
  key: 2,
  class: "apron-badge__content"
}, tt = /* @__PURE__ */ O({
  __name: "Badge",
  props: {
    dot: { type: Boolean, default: !1 },
    count: {},
    overflowCount: { default: 99 },
    content: {}
  },
  setup(e) {
    const a = e, t = ie(), n = f(() => a.count === void 0 ? null : a.count > a.overflowCount ? `${a.overflowCount}+` : String(a.count)), p = f(() => [
      "apron-badge",
      {
        "apron-badge--dot": a.dot,
        "apron-badge--standalone": !t.default
      }
    ]), l = f(() => a.dot || a.count !== void 0 || a.content || t.content);
    return (s, i) => (o(), r("span", {
      class: D(p.value)
    }, [
      w(s.$slots, "default"),
      l.value ? (o(), r("sup", Qe, [
        e.dot ? (o(), r("span", Ze)) : e.count !== void 0 ? (o(), r("span", {
          key: 1,
          class: D(["apron-badge__count", { "apron-badge__count--multi": n.value && n.value.length > 1 }])
        }, T(n.value), 3)) : (o(), r("span", et, [
          w(s.$slots, "content", {}, () => [
            I(T(e.content), 1)
          ])
        ]))
      ])) : C("", !0)
    ], 2));
  }
}), at = ["type", "disabled"], nt = {
  key: 0,
  class: "apron-button__spinner"
}, ot = { class: "apron-button__content" }, ee = /* @__PURE__ */ O({
  __name: "Button",
  props: {
    variant: { default: "default" },
    size: { default: "middle" },
    dashed: { type: Boolean, default: !1 },
    danger: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    block: { type: Boolean, default: !1 },
    iconLeft: {},
    iconRight: {},
    disableRipple: { type: Boolean, default: !1 },
    type: { default: "button" }
  },
  emits: ["click"],
  setup(e, { emit: a }) {
    const t = e, n = a, p = R(), l = x([]);
    let s = 0;
    const i = f(() => [
      "apron-button",
      `apron-button--${t.variant}`,
      `apron-button--${t.size}`,
      {
        "apron-button--dashed": t.dashed,
        "apron-button--danger": t.danger,
        "apron-button--loading": t.loading,
        "apron-button--block": t.block,
        "apron-button--disabled": t.disabled || t.loading
      }
    ]), c = f(() => t.disabled || t.loading), d = (k) => {
      if (!c.value) {
        if (!t.disableRipple && t.variant !== "text" && t.variant !== "link") {
          const b = k.currentTarget.getBoundingClientRect(), v = Math.max(b.width, b.height) * 2, m = k.clientX - b.left - v / 2, h = k.clientY - b.top - v / 2, g = s++;
          l.value.push({ id: g, x: m, y: h, size: v }), setTimeout(() => {
            l.value = l.value.filter((_) => _.id !== g);
          }, 600);
        }
        n("click", k);
      }
    };
    return (k, y) => (o(), r("button", B({
      class: i.value,
      type: e.type,
      disabled: c.value
    }, M(p), { onClick: d }), [
      e.loading ? (o(), r("span", nt, [...y[0] || (y[0] = [
        u("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, [
          u("circle", {
            cx: "12",
            cy: "12",
            r: "10",
            stroke: "currentColor",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-dasharray": "31.4 31.4"
          })
        ], -1)
      ])])) : e.iconLeft ? (o(), H(Z(e.iconLeft), {
        key: 1,
        class: "apron-button__icon apron-button__icon--left"
      })) : C("", !0),
      u("span", ot, [
        w(k.$slots, "default")
      ]),
      e.iconRight && !e.loading ? (o(), H(Z(e.iconRight), {
        key: 2,
        class: "apron-button__icon apron-button__icon--right"
      })) : C("", !0),
      (o(!0), r(W, null, Y(l.value, (b) => (o(), r("span", {
        key: b.id,
        class: "apron-button__ripple",
        style: fe({
          left: `${b.x}px`,
          top: `${b.y}px`,
          width: `${b.size}px`,
          height: `${b.size}px`
        })
      }, null, 4))), 128))
    ], 16, at));
  }
}), lt = /* @__PURE__ */ O({
  __name: "Card",
  props: {
    bordered: { type: Boolean, default: !0 }
  },
  setup(e) {
    const a = e, t = R(), n = f(() => [
      "apron-card",
      {
        "apron-card--bordered": a.bordered
      }
    ]);
    return (p, l) => (o(), r("div", B({ class: n.value }, M(t)), [
      w(p.$slots, "default")
    ], 16));
  }
}), st = { class: "apron-card__title" }, rt = {
  key: 0,
  class: "apron-card__extra"
}, it = /* @__PURE__ */ O({
  __name: "CardHeader",
  props: {
    title: {},
    extra: {}
  },
  setup(e) {
    const a = R();
    return (t, n) => (o(), r("div", B({ class: "apron-card__header" }, M(a)), [
      u("div", st, [
        w(t.$slots, "title", {}, () => [
          I(T(e.title), 1)
        ])
      ]),
      e.extra || t.$slots.extra ? (o(), r("div", rt, [
        w(t.$slots, "extra", {}, () => [
          I(T(e.extra), 1)
        ])
      ])) : C("", !0)
    ], 16));
  }
}), ct = /* @__PURE__ */ O({
  __name: "CardBody",
  setup(e) {
    const a = R();
    return (t, n) => (o(), r("div", B({ class: "apron-card__body" }, M(a)), [
      w(t.$slots, "default")
    ], 16));
  }
}), ut = /* @__PURE__ */ O({
  __name: "CardFooter",
  setup(e) {
    const a = R();
    return (t, n) => (o(), r("div", B({ class: "apron-card__footer" }, M(a)), [
      w(t.$slots, "default")
    ], 16));
  }
}), dt = {
  key: 0,
  class: "apron-cascader__value"
}, pt = {
  key: 1,
  class: "apron-cascader__placeholder"
}, ft = { class: "apron-cascader__suffix" }, vt = {
  key: 0,
  class: "apron-cascader__loading"
}, ht = {
  key: 1,
  class: "apron-cascader__arrow",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, mt = {
  key: 0,
  class: "apron-cascader__dropdown"
}, gt = { class: "apron-cascader__columns" }, yt = ["onClick"], _t = {
  key: 0,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, kt = /* @__PURE__ */ O({
  __name: "Cascader",
  props: {
    modelValue: {},
    options: { default: () => [] },
    placeholder: { default: "请选择" },
    disabled: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    inflow: { type: Boolean, default: !1 },
    separator: { default: " / " },
    changeOnSelect: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "change", "openChange"],
  setup(e, { emit: a }) {
    const t = e, n = a, p = R(), l = x(null), s = x(!1), i = x([...t.modelValue ?? []]), c = x([]);
    z(() => t.modelValue, (V) => {
      i.value = [...V ?? []], c.value = [...V ?? []];
    });
    const d = (V, P) => {
      const $ = [V];
      let S = V;
      for (const A of P) {
        const N = S.find((oe) => oe.value === A);
        if (N?.children)
          $.push(N.children), S = N.children;
        else
          break;
      }
      return $;
    }, k = f(() => d(t.options, c.value)), y = f(() => {
      const V = [];
      let P = t.options;
      for (const $ of i.value) {
        const S = P.find((A) => A.value === $);
        S && (V.push(S), P = S.children ?? []);
      }
      return V;
    }), b = f(() => y.value.map((V) => V.label).join(t.separator)), v = f(() => [
      "apron-cascader",
      {
        "apron-cascader--open": s.value,
        "apron-cascader--disabled": t.disabled,
        "apron-cascader--loading": t.loading,
        "apron-cascader--inflow": t.inflow,
        "apron-cascader--has-value": i.value.length > 0
      }
    ]), m = () => {
      t.disabled || t.loading || (s.value = !s.value, n("openChange", s.value), s.value && (c.value = [...i.value]));
    }, h = () => {
      s.value && (s.value = !1, n("openChange", !1));
    }, g = (V, P) => {
      if (V.disabled) return;
      const $ = [...c.value.slice(0, P), V.value];
      if (c.value = $, !V.children || V.children.length === 0 || t.changeOnSelect) {
        i.value = $, n("update:modelValue", $);
        const S = _($);
        n("change", $, S), (!V.children || V.children.length === 0) && h();
      }
    }, _ = (V) => {
      const P = [];
      let $ = t.options;
      for (const S of V) {
        const A = $.find((N) => N.value === S);
        A && (P.push(A), $ = A.children ?? []);
      }
      return P;
    }, j = (V) => {
      l.value && !l.value.contains(V.target) && h();
    };
    return U(() => {
      document.addEventListener("click", j);
    }), J(() => {
      document.removeEventListener("click", j);
    }), (V, P) => (o(), r("div", B({
      ref_key: "cascaderRef",
      ref: l,
      class: v.value
    }, M(p)), [
      u("div", {
        class: "apron-cascader__trigger",
        onClick: m,
        tabindex: "0"
      }, [
        b.value ? (o(), r("span", dt, T(b.value), 1)) : (o(), r("span", pt, T(e.placeholder), 1)),
        u("span", ft, [
          e.loading ? (o(), r("span", vt, [...P[0] || (P[0] = [
            u("svg", {
              viewBox: "0 0 24 24",
              fill: "none"
            }, [
              u("circle", {
                cx: "12",
                cy: "12",
                r: "10",
                stroke: "currentColor",
                "stroke-width": "2",
                "stroke-linecap": "round",
                "stroke-dasharray": "31.4 31.4"
              })
            ], -1)
          ])])) : (o(), r("svg", ht, [...P[1] || (P[1] = [
            u("polyline", { points: "6 9 12 15 18 9" }, null, -1)
          ])]))
        ])
      ]),
      G(q, { name: "apron-cascader-dropdown" }, {
        default: E(() => [
          s.value ? (o(), r("div", mt, [
            u("div", gt, [
              (o(!0), r(W, null, Y(k.value, ($, S) => (o(), r("div", {
                key: S,
                class: "apron-cascader__column"
              }, [
                (o(!0), r(W, null, Y($, (A) => (o(), r("div", {
                  key: A.value,
                  class: D(["apron-cascader__option", {
                    "apron-cascader__option--expanded": c.value[S] === A.value,
                    "apron-cascader__option--selected": i.value[S] === A.value,
                    "apron-cascader__option--disabled": A.disabled
                  }]),
                  onClick: (N) => g(A, S)
                }, [
                  u("span", null, T(A.label), 1),
                  A.children?.length ? (o(), r("svg", _t, [...P[2] || (P[2] = [
                    u("polyline", { points: "9 18 15 12 9 6" }, null, -1)
                  ])])) : C("", !0)
                ], 10, yt))), 128))
              ]))), 128))
            ])
          ])) : C("", !0)
        ]),
        _: 1
      })
    ], 16));
  }
}), bt = { class: "apron-checkbox__input" }, wt = ["checked", "disabled", "value"], $t = { class: "apron-checkbox__box" }, Ct = {
  key: 0,
  class: "apron-checkbox__indeterminate",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "3"
}, xt = {
  key: 1,
  class: "apron-checkbox__check",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "3"
}, Le = Symbol("checkboxGroup"), Bt = /* @__PURE__ */ O({
  __name: "Checkbox",
  props: {
    modelValue: { type: Boolean },
    value: {},
    disabled: { type: Boolean, default: !1 },
    indeterminate: { type: Boolean, default: !1 },
    labelClickable: { type: Boolean, default: !0 }
  },
  emits: ["update:modelValue", "change"],
  setup(e, { emit: a }) {
    const t = e, n = a, p = R(), l = X(Le, null), s = x(t.modelValue ?? !1);
    z(() => t.modelValue, (v) => {
      s.value = v ?? !1;
    });
    const i = f(() => l && t.value !== void 0 ? l.value.includes(t.value) : s.value), c = f(() => t.disabled || l?.disabled), d = f(() => l?.labelClickable ?? t.labelClickable), k = f(() => [
      "apron-checkbox",
      {
        "apron-checkbox--checked": i.value,
        "apron-checkbox--disabled": c.value,
        "apron-checkbox--indeterminate": t.indeterminate,
        "apron-checkbox--label-clickable": d.value
      }
    ]), y = (v) => {
      if (c.value) return;
      const h = v.target.checked;
      l && t.value !== void 0 ? l.onChange(t.value, h) : (s.value = h, n("update:modelValue", h), n("change", h));
    }, b = () => {
      if (c.value || !d.value) return;
      const v = !i.value;
      l && t.value !== void 0 ? l.onChange(t.value, v) : (s.value = v, n("update:modelValue", v), n("change", v));
    };
    return (v, m) => (o(), r("label", B({ class: k.value }, M(p)), [
      u("span", bt, [
        u("input", {
          type: "checkbox",
          class: "apron-checkbox__native",
          checked: i.value,
          disabled: c.value,
          value: e.value,
          onChange: y
        }, null, 40, wt),
        u("span", $t, [
          e.indeterminate ? (o(), r("svg", Ct, [...m[0] || (m[0] = [
            u("line", {
              x1: "5",
              y1: "12",
              x2: "19",
              y2: "12"
            }, null, -1)
          ])])) : (o(), r("svg", xt, [...m[1] || (m[1] = [
            u("polyline", { points: "20 6 9 17 4 12" }, null, -1)
          ])]))
        ])
      ]),
      v.$slots.default ? (o(), r("span", {
        key: 0,
        class: "apron-checkbox__label",
        onClick: Te(b, ["prevent"])
      }, [
        w(v.$slots, "default")
      ])) : C("", !0)
    ], 16));
  }
}), Vt = /* @__PURE__ */ O({
  __name: "CheckboxGroup",
  props: {
    modelValue: { default: () => [] },
    options: {},
    disabled: { type: Boolean, default: !1 },
    direction: { default: "horizontal" },
    labelClickable: { type: Boolean, default: !0 }
  },
  emits: ["update:modelValue", "change"],
  setup(e, { emit: a }) {
    const t = e, n = a, p = R(), l = x([...t.modelValue]);
    z(() => t.modelValue, (d) => {
      l.value = [...d ?? []];
    }), te(Le, {
      get value() {
        return l.value;
      },
      get disabled() {
        return t.disabled;
      },
      get labelClickable() {
        return t.labelClickable;
      },
      onChange: (d, k) => {
        const y = [...l.value];
        if (k)
          y.includes(d) || y.push(d);
        else {
          const b = y.indexOf(d);
          b !== -1 && y.splice(b, 1);
        }
        l.value = y, n("update:modelValue", y), n("change", y);
      }
    });
    const c = f(() => [
      "apron-checkbox-group",
      `apron-checkbox-group--${t.direction}`
    ]);
    return (d, k) => (o(), r("div", B({
      class: c.value,
      role: "group"
    }, M(p)), [
      w(d.$slots, "default")
    ], 16));
  }
}), Me = Symbol("collapseContext"), Tt = /* @__PURE__ */ O({
  __name: "Collapse",
  props: {
    modelValue: {},
    defaultActiveKeys: { default: () => [] },
    accordion: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "change"],
  setup(e, { emit: a }) {
    const t = e, n = a, p = R(), l = x([...t.modelValue ?? t.defaultActiveKeys]);
    z(() => t.modelValue, (d) => {
      d !== void 0 && (l.value = [...d]);
    }), te(Me, {
      get activeKeys() {
        return l.value;
      },
      toggleItem: (d) => {
        let k;
        t.accordion ? k = l.value.includes(d) ? [] : [d] : l.value.includes(d) ? k = l.value.filter((y) => y !== d) : k = [...l.value, d], l.value = k, n("update:modelValue", k), n("change", k);
      }
    });
    const c = f(() => [
      "apron-collapse",
      {
        "apron-collapse--accordion": t.accordion
      }
    ]);
    return (d, k) => (o(), r("div", B({ class: c.value }, M(p)), [
      w(d.$slots, "default")
    ], 16));
  }
}), Lt = { class: "apron-collapse-item__title" }, Mt = { class: "apron-collapse-item__content" }, Ot = { class: "apron-collapse-item__body" }, Rt = /* @__PURE__ */ O({
  __name: "CollapseItem",
  props: {
    itemKey: {},
    title: {},
    disabled: { type: Boolean, default: !1 }
  },
  setup(e) {
    const a = e, t = R(), n = X(Me, null), p = f(() => n?.activeKeys.includes(a.itemKey) ?? !1), l = f(() => [
      "apron-collapse-item",
      {
        "apron-collapse-item--active": p.value,
        "apron-collapse-item--disabled": a.disabled
      }
    ]), s = () => {
      a.disabled || n?.toggleItem(a.itemKey);
    };
    return (i, c) => (o(), r("div", B({ class: l.value }, M(t)), [
      u("div", {
        class: "apron-collapse-item__header",
        onClick: s
      }, [
        c[0] || (c[0] = u("svg", {
          class: "apron-collapse-item__arrow",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, [
          u("polyline", { points: "9 18 15 12 9 6" })
        ], -1)),
        u("span", Lt, [
          w(i.$slots, "title", {}, () => [
            I(T(e.title), 1)
          ])
        ])
      ]),
      u("div", Mt, [
        u("div", Ot, [
          w(i.$slots, "default")
        ])
      ])
    ], 16));
  }
}), Pt = {
  key: 0,
  class: "apron-datepicker__value"
}, St = {
  key: 1,
  class: "apron-datepicker__placeholder"
}, At = { class: "apron-datepicker__suffix" }, jt = {
  key: 0,
  class: "apron-datepicker__loading"
}, Ft = {
  key: 1,
  class: "apron-datepicker__arrow",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Et = {
  key: 0,
  class: "apron-datepicker__dropdown"
}, It = { class: "apron-datepicker__tabs" }, Kt = { class: "apron-datepicker__panel" }, Ht = {
  key: 0,
  class: "apron-datepicker__options"
}, Dt = ["onClick"], zt = {
  key: 1,
  class: "apron-datepicker__options apron-datepicker__options--grid"
}, Gt = ["onClick"], Wt = {
  key: 2,
  class: "apron-datepicker__options apron-datepicker__options--grid"
}, qt = ["onClick"], Nt = /* @__PURE__ */ O({
  __name: "DatePicker",
  props: {
    modelValue: {},
    disabled: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    inflow: { type: Boolean, default: !1 },
    yearStart: { default: 1900 },
    yearEnd: { default: 2100 },
    yearLabel: { default: "年" },
    monthLabel: { default: "月" },
    dayLabel: { default: "日" },
    monthLabels: { default: () => ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"] }
  },
  emits: ["update:modelValue", "change", "openChange"],
  setup(e, { emit: a }) {
    const t = e, n = a, p = R(), l = x(null), s = x(!1), i = x("year"), c = x({ ...t.modelValue ?? {} });
    z(() => t.modelValue, ($) => {
      c.value = { ...$ ?? {} };
    });
    const d = f(() => {
      const $ = [];
      for (let S = t.yearStart; S <= t.yearEnd; S++)
        $.push(S);
      return $;
    }), k = f(() => t.monthLabels.map(($, S) => ({
      label: $,
      value: S + 1
    }))), y = f(() => {
      const $ = c.value.year || (/* @__PURE__ */ new Date()).getFullYear(), S = c.value.month || 1, A = new Date($, S, 0).getDate();
      return Array.from({ length: A }, (N, oe) => oe + 1);
    }), b = f(() => {
      const $ = [];
      return c.value.year && $.push(`${c.value.year}${t.yearLabel}`), c.value.month && $.push(`${c.value.month}${t.monthLabel}`), c.value.day && $.push(`${c.value.day}${t.dayLabel}`), $.join("");
    }), v = f(() => [
      "apron-datepicker",
      {
        "apron-datepicker--open": s.value,
        "apron-datepicker--disabled": t.disabled,
        "apron-datepicker--loading": t.loading,
        "apron-datepicker--inflow": t.inflow,
        "apron-datepicker--has-value": b.value.length > 0
      }
    ]), m = () => {
      t.disabled || t.loading || (s.value = !s.value, n("openChange", s.value));
    }, h = () => {
      s.value && (s.value = !1, n("openChange", !1));
    }, g = ($) => {
      c.value.year = $, i.value = "month", V();
    }, _ = ($) => {
      c.value.month = $, i.value = "day", V();
    }, j = ($) => {
      c.value.day = $, V(), h();
    }, V = () => {
      const $ = { ...c.value };
      n("update:modelValue", $), n("change", $);
    }, P = ($) => {
      l.value && !l.value.contains($.target) && h();
    };
    return U(() => {
      document.addEventListener("click", P);
    }), J(() => {
      document.removeEventListener("click", P);
    }), ($, S) => (o(), r("div", B({
      ref_key: "pickerRef",
      ref: l,
      class: v.value
    }, M(p)), [
      u("div", {
        class: "apron-datepicker__trigger",
        onClick: m,
        tabindex: "0"
      }, [
        b.value ? (o(), r("span", Pt, T(b.value), 1)) : (o(), r("span", St, " 请选择日期 ")),
        u("span", At, [
          e.loading ? (o(), r("span", jt, [...S[3] || (S[3] = [
            u("svg", {
              viewBox: "0 0 24 24",
              fill: "none"
            }, [
              u("circle", {
                cx: "12",
                cy: "12",
                r: "10",
                stroke: "currentColor",
                "stroke-width": "2",
                "stroke-linecap": "round",
                "stroke-dasharray": "31.4 31.4"
              })
            ], -1)
          ])])) : (o(), r("svg", Ft, [...S[4] || (S[4] = [
            u("polyline", { points: "6 9 12 15 18 9" }, null, -1)
          ])]))
        ])
      ]),
      G(q, { name: "apron-datepicker-dropdown" }, {
        default: E(() => [
          s.value ? (o(), r("div", Et, [
            u("div", It, [
              u("button", {
                type: "button",
                class: D(["apron-datepicker__tab", { "apron-datepicker__tab--active": i.value === "year" }]),
                onClick: S[0] || (S[0] = (A) => i.value = "year")
              }, T(e.yearLabel), 3),
              u("button", {
                type: "button",
                class: D(["apron-datepicker__tab", { "apron-datepicker__tab--active": i.value === "month" }]),
                onClick: S[1] || (S[1] = (A) => i.value = "month")
              }, T(e.monthLabel), 3),
              u("button", {
                type: "button",
                class: D(["apron-datepicker__tab", { "apron-datepicker__tab--active": i.value === "day" }]),
                onClick: S[2] || (S[2] = (A) => i.value = "day")
              }, T(e.dayLabel), 3)
            ]),
            u("div", Kt, [
              i.value === "year" ? (o(), r("div", Ht, [
                (o(!0), r(W, null, Y(d.value, (A) => (o(), r("button", {
                  key: A,
                  type: "button",
                  class: D(["apron-datepicker__option", { "apron-datepicker__option--selected": c.value.year === A }]),
                  onClick: (N) => g(A)
                }, T(A), 11, Dt))), 128))
              ])) : i.value === "month" ? (o(), r("div", zt, [
                (o(!0), r(W, null, Y(k.value, (A) => (o(), r("button", {
                  key: A.value,
                  type: "button",
                  class: D(["apron-datepicker__option", { "apron-datepicker__option--selected": c.value.month === A.value }]),
                  onClick: (N) => _(A.value)
                }, T(A.label), 11, Gt))), 128))
              ])) : (o(), r("div", Wt, [
                (o(!0), r(W, null, Y(y.value, (A) => (o(), r("button", {
                  key: A,
                  type: "button",
                  class: D(["apron-datepicker__option", { "apron-datepicker__option--selected": c.value.day === A }]),
                  onClick: (N) => j(A)
                }, T(A), 11, qt))), 128))
              ]))
            ])
          ])) : C("", !0)
        ]),
        _: 1
      })
    ], 16));
  }
}), Yt = { class: "apron-divider__text" }, Ut = {
  key: 1,
  class: "apron-divider__line"
}, Jt = /* @__PURE__ */ O({
  __name: "Divider",
  props: {
    dashed: { type: Boolean, default: !1 },
    align: { default: "center" }
  },
  setup(e) {
    const a = e, t = R(), n = ie(), p = f(() => !!n.default), l = f(() => [
      "apron-divider",
      {
        "apron-divider--dashed": a.dashed,
        "apron-divider--with-text": p.value,
        [`apron-divider--${a.align}`]: p.value
      }
    ]);
    return (s, i) => (o(), r("div", B({
      class: l.value,
      role: "separator"
    }, M(t)), [
      p.value ? (o(), r(W, { key: 0 }, [
        i[0] || (i[0] = u("span", { class: "apron-divider__line apron-divider__line--left" }, null, -1)),
        u("span", Yt, [
          w(s.$slots, "default")
        ]),
        i[1] || (i[1] = u("span", { class: "apron-divider__line apron-divider__line--right" }, null, -1))
      ], 64)) : (o(), r("span", Ut))
    ], 16));
  }
}), Xt = {
  key: 0,
  class: "apron-drawer-root"
}, Qt = {
  key: 0,
  class: "apron-drawer__header"
}, Zt = { class: "apron-drawer__title" }, ea = { class: "apron-drawer__body" }, ta = {
  key: 1,
  class: "apron-drawer__footer"
}, Oe = /* @__PURE__ */ O({
  __name: "Drawer",
  props: {
    open: { type: Boolean, default: !1 },
    title: {},
    placement: { default: "right" },
    closable: { type: Boolean, default: !0 },
    closeByOverlay: { type: Boolean, default: !0 },
    width: { default: 378 },
    height: { default: 378 },
    okText: { default: "确定" },
    cancelText: { default: "取消" },
    okButtonProps: {},
    cancelButtonProps: {},
    showCancel: { type: Boolean, default: !0 },
    isMobile: { type: Boolean, default: !1 }
  },
  emits: ["update:open", "close", "ok", "cancel", "afterOpenChange"],
  setup(e, { emit: a }) {
    const t = e, n = a, p = R(), l = x(!1), s = x(!1);
    z(() => t.open, (g) => {
      g ? (l.value = !0, s.value = !0, document.body.style.overflow = "hidden") : s.value = !0;
    });
    const i = () => {
      n("update:open", !1), n("close");
    }, c = () => {
      t.closeByOverlay && i();
    }, d = () => {
      n("ok");
    }, k = () => {
      n("cancel"), i();
    }, y = () => {
      l.value = !1, s.value = !1, document.body.style.overflow = "", n("afterOpenChange", !1);
    }, b = () => {
      s.value = !1, n("afterOpenChange", !0);
    }, v = f(() => t.placement === "left" || t.placement === "right"), m = f(() => v.value ? { width: typeof t.width == "number" ? `${t.width}px` : t.width } : { height: typeof t.height == "number" ? `${t.height}px` : t.height }), h = f(() => [
      "apron-drawer",
      `apron-drawer--${t.placement}`,
      {
        "apron-drawer--mobile": t.isMobile
      }
    ]);
    return U(() => {
      t.open && (l.value = !0, document.body.style.overflow = "hidden");
    }), J(() => {
      document.body.style.overflow = "";
    }), (g, _) => (o(), H(Q, { to: "body" }, [
      l.value ? (o(), r("div", Xt, [
        G(q, { name: "apron-drawer-overlay" }, {
          default: E(() => [
            e.open ? (o(), r("div", {
              key: 0,
              class: "apron-drawer__overlay",
              onClick: c
            })) : C("", !0)
          ]),
          _: 1
        }),
        G(q, {
          name: `apron-drawer-${e.placement}`,
          onAfterEnter: b,
          onAfterLeave: y
        }, {
          default: E(() => [
            e.open ? (o(), r("div", B({
              key: 0,
              class: h.value,
              style: m.value
            }, M(p)), [
              e.title || e.closable || g.$slots.header ? (o(), r("div", Qt, [
                u("div", Zt, [
                  w(g.$slots, "header", {}, () => [
                    I(T(e.title), 1)
                  ])
                ]),
                e.closable ? (o(), r("button", {
                  key: 0,
                  type: "button",
                  class: "apron-drawer__close",
                  onClick: i,
                  "aria-label": "Close"
                }, [..._[0] || (_[0] = [
                  u("svg", {
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  }, [
                    u("line", {
                      x1: "18",
                      y1: "6",
                      x2: "6",
                      y2: "18"
                    }),
                    u("line", {
                      x1: "6",
                      y1: "6",
                      x2: "18",
                      y2: "18"
                    })
                  ], -1)
                ])])) : C("", !0)
              ])) : C("", !0),
              u("div", ea, [
                w(g.$slots, "default")
              ]),
              g.$slots.footer || e.showCancel || e.okText ? (o(), r("div", ta, [
                w(g.$slots, "footer", {}, () => [
                  e.showCancel ? (o(), H(ee, B({ key: 0 }, e.cancelButtonProps, { onClick: k }), {
                    default: E(() => [
                      I(T(e.cancelText), 1)
                    ]),
                    _: 1
                  }, 16)) : C("", !0),
                  G(ee, B({ variant: "primary" }, e.okButtonProps, { onClick: d }), {
                    default: E(() => [
                      I(T(e.okText), 1)
                    ]),
                    _: 1
                  }, 16)
                ])
              ])) : C("", !0)
            ], 16)) : C("", !0)
          ]),
          _: 3
        }, 8, ["name"])
      ])) : C("", !0)
    ]));
  }
}), aa = { class: "apron-empty__icon" }, na = { class: "apron-empty__description" }, oa = `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="32" cy="32" r="28" stroke="currentColor" stroke-width="2" stroke-dasharray="4 4" opacity="0.3"/>
  <path d="M24 28C24 26.8954 24.8954 26 26 26H38C39.1046 26 40 26.8954 40 28V40C40 41.1046 39.1046 42 38 42H26C24.8954 42 24 41.1046 24 40V28Z" stroke="currentColor" stroke-width="2" opacity="0.5"/>
  <path d="M28 34L30 36L36 30" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"/>
</svg>`, la = /* @__PURE__ */ O({
  __name: "Empty",
  props: {
    icon: {},
    description: { default: "暂无数据" }
  },
  setup(e) {
    const a = R(), t = f(() => ["apron-empty"]);
    return (n, p) => (o(), r("div", B({ class: t.value }, M(a)), [
      u("div", aa, [
        w(n.$slots, "icon", {}, () => [
          e.icon ? (o(), H(Z(e.icon), { key: 0 })) : (o(), r("span", {
            key: 1,
            innerHTML: oa
          }))
        ])
      ]),
      u("div", na, [
        w(n.$slots, "default", {}, () => [
          I(T(e.description), 1)
        ])
      ])
    ], 16));
  }
}), Re = Symbol("formContext"), sa = /* @__PURE__ */ O({
  __name: "Form",
  props: {
    layout: { default: "vertical" },
    floatingLabel: { type: Boolean, default: !1 },
    labelWidth: {},
    labelAlign: { default: "right" },
    disabled: { type: Boolean, default: !1 },
    initialValues: { default: () => ({}) }
  },
  emits: ["finish", "finishFailed", "valuesChange"],
  setup(e, { expose: a, emit: t }) {
    const n = e, p = t, l = R(), s = ue({ ...n.initialValues }), i = ue({}), c = ue({}), d = ue({}), k = x({}), y = async (L, K) => {
      for (const F of K) {
        if (F.required && (L == null || L === ""))
          return F.message || "此字段为必填项";
        if (F.min !== void 0 && typeof L == "string" && L.length < F.min)
          return F.message || `最少需要 ${F.min} 个字符`;
        if (F.max !== void 0 && typeof L == "string" && L.length > F.max)
          return F.message || `最多允许 ${F.max} 个字符`;
        if (F.pattern && !F.pattern.test(String(L)))
          return F.message || "格式不正确";
        if (F.validator)
          try {
            if (!await F.validator(L))
              return F.message || "验证失败";
          } catch {
            return F.message || "验证失败";
          }
      }
      return null;
    }, b = (L, K) => {
      const F = s[L];
      s[L] = K, F !== K && p("valuesChange", { [L]: K }, { ...s });
    }, v = (L, K) => {
      c[L] = K;
    }, m = async (L, K) => {
      const F = K || k.value[L] || [];
      if (F.length === 0) return !0;
      d[L] = !0;
      const he = await y(s[L], F);
      return d[L] = !1, he ? (i[L] = he, !1) : (delete i[L], !0);
    }, h = (L) => {
      delete i[L];
    }, g = (L, K) => {
      K && (k.value[L] = K);
    }, _ = (L) => {
      delete k.value[L], delete i[L], delete c[L], delete d[L];
    }, j = async () => {
      const L = Object.keys(k.value);
      return (await Promise.all(L.map((F) => m(F)))).every(Boolean);
    }, V = () => {
      Object.keys(s).forEach((L) => {
        s[L] = n.initialValues[L];
      }), Object.keys(i).forEach((L) => delete i[L]), Object.keys(c).forEach((L) => delete c[L]);
    }, P = (L) => {
      L ? (Array.isArray(L) ? L : [L]).forEach((F) => delete i[F]) : Object.keys(i).forEach((K) => delete i[K]);
    }, $ = (L) => s[L], S = () => ({ ...s }), A = (L) => {
      Object.entries(L).forEach(([K, F]) => {
        b(K, F);
      });
    };
    te(Re, {
      values: s,
      errors: i,
      touched: c,
      validating: d,
      get layout() {
        return n.layout;
      },
      get floatingLabel() {
        return n.floatingLabel;
      },
      get labelWidth() {
        return n.labelWidth;
      },
      get labelAlign() {
        return n.labelAlign;
      },
      get disabled() {
        return n.disabled;
      },
      setFieldValue: b,
      setFieldTouched: v,
      validateField: m,
      clearFieldError: h,
      registerField: g,
      unregisterField: _
    });
    const oe = {
      validate: j,
      validateField: m,
      resetFields: V,
      clearValidate: P,
      getFieldValue: $,
      getFieldsValue: S,
      setFieldValue: b,
      setFieldsValue: A
    }, Ke = async (L) => {
      L.preventDefault(), await j() ? p("finish", { ...s }) : p("finishFailed", { ...i });
    }, He = f(() => [
      "apron-form",
      `apron-form--${n.layout}`,
      {
        "apron-form--floating-label": n.floatingLabel,
        "apron-form--disabled": n.disabled
      }
    ]);
    return a(oe), (L, K) => (o(), r("form", B({
      class: He.value,
      onSubmit: Ke
    }, M(l)), [
      w(L.$slots, "default")
    ], 16));
  }
}), ra = {
  key: 0,
  class: "apron-form-item__required"
}, ia = { class: "apron-form-item__control" }, ca = { class: "apron-form-item__content" }, ua = {
  key: 0,
  class: "apron-form-item__error"
}, da = {
  key: 1,
  class: "apron-form-item__help"
}, pa = {
  key: 2,
  class: "apron-form-item__extra"
}, fa = /* @__PURE__ */ O({
  __name: "FormItem",
  props: {
    name: {},
    label: {},
    required: { type: Boolean },
    rules: {},
    help: {},
    extra: {},
    valuePropName: { default: "modelValue" },
    trigger: { default: "update:modelValue" },
    validateTrigger: { default: "blur" }
  },
  setup(e) {
    const a = e, t = R();
    ie();
    const n = X(Re, null), p = f(() => {
      if (!(!n || !a.name))
        return n.values[a.name];
    }), l = f(() => !n || !a.name ? "" : n.errors[a.name] || ""), s = f(() => !n || !a.name ? !1 : n.validating[a.name] || !1), i = f(() => a.required ? !0 : a.rules?.some((v) => v.required) || !1), c = f(() => n?.floatingLabel || !1), d = f(() => p.value !== void 0 && p.value !== null && p.value !== ""), k = f(() => n?.labelWidth ? {
      width: typeof n.labelWidth == "number" ? `${n.labelWidth}px` : n.labelWidth,
      textAlign: n.labelAlign
    } : {}), y = f(() => [
      "apron-form-item",
      {
        "apron-form-item--error": !!l.value,
        "apron-form-item--validating": s.value,
        "apron-form-item--required": i.value,
        "apron-form-item--floating": c.value,
        "apron-form-item--has-value": d.value,
        "apron-form-item--focused": !1
        // Will be managed by child
      }
    ]), b = f(() => {
      const v = [];
      return a.required && v.push({ required: !0, message: `${a.label || a.name}为必填项` }), a.rules && v.push(...a.rules), v;
    });
    return U(() => {
      n && a.name && n.registerField(a.name, b.value);
    }), J(() => {
      n && a.name && n.unregisterField(a.name);
    }), z(b, (v) => {
      n && a.name && n.registerField(a.name, v);
    }), (v, m) => (o(), r("div", B({ class: y.value }, M(t)), [
      e.label || c.value ? (o(), r("label", {
        key: 0,
        class: "apron-form-item__label",
        style: fe(k.value)
      }, [
        i.value ? (o(), r("span", ra, "*")) : C("", !0),
        I(" " + T(e.label), 1)
      ], 4)) : C("", !0),
      u("div", ia, [
        u("div", ca, [
          w(v.$slots, "default")
        ]),
        l.value ? (o(), r("div", ua, T(l.value), 1)) : e.help ? (o(), r("div", da, T(e.help), 1)) : C("", !0),
        e.extra ? (o(), r("div", pa, T(e.extra), 1)) : C("", !0)
      ])
    ], 16));
  }
});
function So() {
  const e = x(null);
  return [e, {
    validate: () => e.value ? e.value.validate() : Promise.resolve(!1),
    validateField: (t) => e.value ? e.value.validateField(t) : Promise.resolve(!1),
    resetFields: () => {
      e.value?.resetFields();
    },
    clearValidate: (t) => {
      e.value?.clearValidate(t);
    },
    getFieldValue: (t) => e.value?.getFieldValue(t),
    getFieldsValue: () => e.value?.getFieldsValue() ?? {},
    setFieldValue: (t, n) => {
      e.value?.setFieldValue(t, n);
    },
    setFieldsValue: (t) => {
      e.value?.setFieldsValue(t);
    }
  }];
}
const Pe = Symbol("rowContext"), va = /* @__PURE__ */ O({
  __name: "Row",
  props: {
    gutter: { default: 0 },
    justify: { default: "start" },
    align: { default: "top" },
    wrap: { type: Boolean, default: !0 }
  },
  setup(e) {
    const a = e, t = R();
    te(Pe, {
      get gutter() {
        return a.gutter;
      }
    });
    const p = f(() => {
      const s = {}, i = a.gutter;
      return typeof i == "number" && i > 0 ? (s.marginLeft = `-${i / 2}px`, s.marginRight = `-${i / 2}px`) : Array.isArray(i) && (i[0] > 0 && (s.marginLeft = `-${i[0] / 2}px`, s.marginRight = `-${i[0] / 2}px`), i[1] > 0 && (s.rowGap = `${i[1]}px`)), s;
    }), l = f(() => [
      "apron-row",
      `apron-row--justify-${a.justify}`,
      `apron-row--align-${a.align}`,
      {
        "apron-row--wrap": a.wrap,
        "apron-row--no-wrap": !a.wrap
      }
    ]);
    return (s, i) => (o(), r("div", B({
      class: l.value,
      style: p.value
    }, M(t)), [
      w(s.$slots, "default")
    ], 16));
  }
}), ha = /* @__PURE__ */ O({
  __name: "Col",
  props: {
    span: {},
    offset: {},
    order: {},
    push: {},
    pull: {},
    flex: {},
    xs: {},
    sm: {},
    md: {},
    lg: {},
    xl: {},
    xxl: {}
  },
  setup(e) {
    const a = e, t = R(), n = X(Pe, null), p = f(() => {
      const i = {}, c = n?.gutter;
      return typeof c == "number" && c > 0 ? (i.paddingLeft = `${c / 2}px`, i.paddingRight = `${c / 2}px`) : Array.isArray(c) && c[0] > 0 && (i.paddingLeft = `${c[0] / 2}px`, i.paddingRight = `${c[0] / 2}px`), a.flex && (i.flex = typeof a.flex == "number" ? `${a.flex} ${a.flex} auto` : a.flex), i;
    }), l = (i, c) => {
      if (c === void 0) return {};
      const d = {};
      return typeof c == "number" ? d[`apron-col-${i}-${c}`] = !0 : (c.span !== void 0 && (d[`apron-col-${i}-${c.span}`] = !0), c.offset !== void 0 && (d[`apron-col-${i}-offset-${c.offset}`] = !0), c.order !== void 0 && (d[`apron-col-${i}-order-${c.order}`] = !0), c.push !== void 0 && (d[`apron-col-${i}-push-${c.push}`] = !0), c.pull !== void 0 && (d[`apron-col-${i}-pull-${c.pull}`] = !0)), d;
    }, s = f(() => {
      const i = {
        "apron-col": !0
      };
      return a.span !== void 0 && (i[`apron-col-${a.span}`] = !0), a.offset !== void 0 && (i[`apron-col-offset-${a.offset}`] = !0), a.order !== void 0 && (i[`apron-col-order-${a.order}`] = !0), a.push !== void 0 && (i[`apron-col-push-${a.push}`] = !0), a.pull !== void 0 && (i[`apron-col-pull-${a.pull}`] = !0), [
        i,
        l("xs", a.xs),
        l("sm", a.sm),
        l("md", a.md),
        l("lg", a.lg),
        l("xl", a.xl),
        l("xxl", a.xxl)
      ];
    });
    return (i, c) => (o(), r("div", B({
      class: s.value,
      style: p.value
    }, M(t)), [
      w(i.$slots, "default")
    ], 16));
  }
}), ma = ["src", "alt"], ga = {
  key: 1,
  class: "apron-image__fallback"
}, ya = ["src", "alt"], _a = {
  key: 2,
  class: "apron-image__error"
}, ka = {
  key: 3,
  class: "apron-image__placeholder"
}, ba = ["src", "alt"], wa = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
  <circle cx="8.5" cy="8.5" r="1.5"/>
  <polyline points="21 15 16 10 5 21"/>
</svg>`, $a = /* @__PURE__ */ O({
  __name: "Image",
  props: {
    src: {},
    alt: {},
    fit: { default: "cover" },
    fallback: {},
    preview: { type: Boolean, default: !1 },
    width: {},
    height: {}
  },
  emits: ["load", "error"],
  setup(e, { emit: a }) {
    const t = e, n = a, p = R(), l = x(!0), s = x(!1), i = x(!1), c = f(() => {
      const m = {
        objectFit: t.fit
      };
      return t.width && (m.width = typeof t.width == "number" ? `${t.width}px` : t.width), t.height && (m.height = typeof t.height == "number" ? `${t.height}px` : t.height), m;
    }), d = f(() => [
      "apron-image",
      {
        "apron-image--loading": l.value,
        "apron-image--error": s.value,
        "apron-image--preview": t.preview
      }
    ]), k = (m) => {
      l.value = !1, s.value = !1, n("load", m);
    }, y = (m) => {
      l.value = !1, s.value = !0, n("error", m);
    }, b = () => {
      t.preview && !s.value && (i.value = !0);
    }, v = () => {
      i.value = !1;
    };
    return (m, h) => (o(), r("div", B({
      class: d.value,
      style: c.value
    }, M(p)), [
      e.src && !s.value ? (o(), r("img", {
        key: 0,
        src: e.src,
        alt: e.alt,
        class: "apron-image__img",
        onLoad: k,
        onError: y,
        onClick: b
      }, null, 40, ma)) : s.value && e.fallback ? (o(), r("div", ga, [
        u("img", {
          src: e.fallback,
          alt: e.alt,
          class: "apron-image__img"
        }, null, 8, ya)
      ])) : s.value ? (o(), r("div", _a, [
        u("span", { innerHTML: wa })
      ])) : C("", !0),
      l.value ? (o(), r("div", ka, [...h[0] || (h[0] = [
        u("div", { class: "apron-image__loading" }, null, -1)
      ])])) : C("", !0),
      i.value ? (o(), H(Q, {
        key: 4,
        to: "body"
      }, [
        u("div", {
          class: "apron-image-preview",
          onClick: v
        }, [
          h[2] || (h[2] = u("div", { class: "apron-image-preview__mask" }, null, -1)),
          u("img", {
            src: e.src,
            alt: e.alt,
            class: "apron-image-preview__img"
          }, null, 8, ba),
          u("button", {
            type: "button",
            class: "apron-image-preview__close",
            onClick: v
          }, [...h[1] || (h[1] = [
            u("svg", {
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2",
              "stroke-linecap": "round",
              "stroke-linejoin": "round"
            }, [
              u("line", {
                x1: "18",
                y1: "6",
                x2: "6",
                y2: "18"
              }),
              u("line", {
                x1: "6",
                y1: "6",
                x2: "18",
                y2: "18"
              })
            ], -1)
          ])])
        ])
      ])) : C("", !0)
    ], 16));
  }
}), Ca = {
  key: 0,
  class: "apron-input__prepend"
}, xa = { class: "apron-input__wrapper" }, Ba = ["type", "value", "placeholder", "disabled"], Va = {
  key: 0,
  class: "apron-input__suffix"
}, Ta = {
  key: 0,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, La = {
  key: 1,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Ma = {
  key: 1,
  class: "apron-input__append"
}, Oa = /* @__PURE__ */ O({
  __name: "Input",
  props: {
    modelValue: {},
    type: { default: "text" },
    placeholder: {},
    disabled: { type: Boolean, default: !1 },
    clearable: { type: Boolean, default: !1 },
    prepend: {},
    append: {}
  },
  emits: ["update:modelValue", "change", "focus", "blur", "clear"],
  setup(e, { expose: a, emit: t }) {
    const n = e, p = t, l = R(), s = x(null), i = x(!1), c = x(!1), d = x(n.modelValue ?? "");
    z(() => n.modelValue, (P) => {
      d.value = P ?? "";
    });
    const k = f(() => n.type === "password" ? c.value ? "text" : "password" : n.type), y = f(() => n.clearable && d.value && !n.disabled), b = f(() => n.type === "password" && d.value), v = f(() => [
      "apron-input",
      {
        "apron-input--focused": i.value,
        "apron-input--disabled": n.disabled,
        "apron-input--with-prepend": n.prepend,
        "apron-input--with-append": n.append
      }
    ]), m = (P) => {
      const $ = P.target;
      d.value = $.value, p("update:modelValue", $.value);
    }, h = (P) => {
      const $ = P.target;
      p("change", $.value);
    }, g = (P) => {
      i.value = !0, p("focus", P);
    }, _ = (P) => {
      i.value = !1, p("blur", P);
    }, j = () => {
      d.value = "", p("update:modelValue", ""), p("clear"), s.value?.focus();
    }, V = () => {
      c.value = !c.value;
    };
    return a({
      focus: () => s.value?.focus(),
      blur: () => s.value?.blur(),
      select: () => s.value?.select()
    }), (P, $) => (o(), r("div", {
      class: D(v.value)
    }, [
      e.prepend ? (o(), r("span", Ca, T(e.prepend), 1)) : C("", !0),
      u("div", xa, [
        u("input", B({
          ref_key: "inputRef",
          ref: s,
          type: k.value,
          value: d.value,
          placeholder: e.placeholder,
          disabled: e.disabled,
          class: "apron-input__inner"
        }, M(l), {
          onInput: m,
          onChange: h,
          onFocus: g,
          onBlur: _
        }), null, 16, Ba),
        y.value || b.value ? (o(), r("span", Va, [
          y.value ? (o(), r("button", {
            key: 0,
            type: "button",
            class: "apron-input__clear",
            onClick: j,
            tabindex: "-1"
          }, [...$[0] || ($[0] = [
            u("svg", {
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2",
              "stroke-linecap": "round",
              "stroke-linejoin": "round"
            }, [
              u("circle", {
                cx: "12",
                cy: "12",
                r: "10"
              }),
              u("line", {
                x1: "15",
                y1: "9",
                x2: "9",
                y2: "15"
              }),
              u("line", {
                x1: "9",
                y1: "9",
                x2: "15",
                y2: "15"
              })
            ], -1)
          ])])) : C("", !0),
          b.value ? (o(), r("button", {
            key: 1,
            type: "button",
            class: "apron-input__password-toggle",
            onClick: V,
            tabindex: "-1"
          }, [
            c.value ? (o(), r("svg", Ta, [...$[1] || ($[1] = [
              u("path", { d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" }, null, -1),
              u("circle", {
                cx: "12",
                cy: "12",
                r: "3"
              }, null, -1)
            ])])) : (o(), r("svg", La, [...$[2] || ($[2] = [
              u("path", { d: "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" }, null, -1),
              u("line", {
                x1: "1",
                y1: "1",
                x2: "23",
                y2: "23"
              }, null, -1)
            ])]))
          ])) : C("", !0)
        ])) : C("", !0)
      ]),
      e.append ? (o(), r("span", Ma, T(e.append), 1)) : C("", !0)
    ], 2));
  }
}), Ra = ["value", "placeholder", "disabled", "rows", "maxlength"], Pa = {
  key: 0,
  class: "apron-textarea__footer"
}, Sa = {
  key: 1,
  class: "apron-textarea__count"
}, Aa = /* @__PURE__ */ O({
  __name: "Textarea",
  props: {
    modelValue: {},
    placeholder: {},
    disabled: { type: Boolean, default: !1 },
    rows: { default: 3 },
    clearable: { type: Boolean, default: !1 },
    max: {}
  },
  emits: ["update:modelValue", "change", "focus", "blur", "clear"],
  setup(e, { expose: a, emit: t }) {
    const n = e, p = t, l = R(), s = x(null), i = x(!1), c = x(n.modelValue ?? "");
    z(() => n.modelValue, (_) => {
      c.value = _ ?? "";
    });
    const d = f(() => n.clearable && c.value && !n.disabled), k = f(() => c.value.length), y = f(() => [
      "apron-textarea",
      {
        "apron-textarea--focused": i.value,
        "apron-textarea--disabled": n.disabled,
        "apron-textarea--with-count": n.max !== void 0
      }
    ]), b = (_) => {
      const j = _.target;
      c.value = j.value, p("update:modelValue", j.value);
    }, v = (_) => {
      const j = _.target;
      p("change", j.value);
    }, m = (_) => {
      i.value = !0, p("focus", _);
    }, h = (_) => {
      i.value = !1, p("blur", _);
    }, g = () => {
      c.value = "", p("update:modelValue", ""), p("clear"), s.value?.focus();
    };
    return a({
      focus: () => s.value?.focus(),
      blur: () => s.value?.blur(),
      select: () => s.value?.select()
    }), (_, j) => (o(), r("div", {
      class: D(y.value)
    }, [
      u("textarea", B({
        ref_key: "textareaRef",
        ref: s,
        value: c.value,
        placeholder: e.placeholder,
        disabled: e.disabled,
        rows: e.rows,
        maxlength: e.max,
        class: "apron-textarea__inner"
      }, M(l), {
        onInput: b,
        onChange: v,
        onFocus: m,
        onBlur: h
      }), null, 16, Ra),
      d.value || e.max !== void 0 ? (o(), r("div", Pa, [
        d.value ? (o(), r("button", {
          key: 0,
          type: "button",
          class: "apron-textarea__clear",
          onClick: g,
          tabindex: "-1"
        }, [...j[0] || (j[0] = [
          u("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
          }, [
            u("circle", {
              cx: "12",
              cy: "12",
              r: "10"
            }),
            u("line", {
              x1: "15",
              y1: "9",
              x2: "9",
              y2: "15"
            }),
            u("line", {
              x1: "9",
              y1: "9",
              x2: "15",
              y2: "15"
            })
          ], -1)
        ])])) : C("", !0),
        e.max !== void 0 ? (o(), r("span", Sa, T(k.value) + " / " + T(e.max), 1)) : C("", !0)
      ])) : C("", !0)
    ], 2));
  }
}), ja = ["type", "value", "disabled", "onInput", "onKeydown"], Fa = /* @__PURE__ */ O({
  __name: "InputOtp",
  props: {
    modelValue: { default: "" },
    length: { default: 6 },
    disabled: { type: Boolean, default: !1 },
    password: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "change", "complete"],
  setup(e, { emit: a }) {
    const t = e, n = a, p = R(), l = x([]), s = x(Array(t.length).fill(""));
    z(() => t.modelValue, (v) => {
      const m = (v || "").split("").slice(0, t.length);
      s.value = [...m, ...Array(t.length - m.length).fill("")];
    }, { immediate: !0 });
    const i = f(() => [
      "apron-input-otp",
      {
        "apron-input-otp--disabled": t.disabled
      }
    ]), c = (v) => {
      ve(() => {
        l.value[v]?.focus();
      });
    }, d = (v, m) => {
      const g = v.target.value.slice(-1);
      s.value[m] = g;
      const _ = s.value.join("");
      n("update:modelValue", _), n("change", _), g && m < t.length - 1 && c(m + 1), _.length === t.length && !s.value.includes("") && n("complete", _);
    }, k = (v, m) => {
      v.key === "Backspace" ? !s.value[m] && m > 0 && c(m - 1) : v.key === "ArrowLeft" && m > 0 ? c(m - 1) : v.key === "ArrowRight" && m < t.length - 1 && c(m + 1);
    }, y = (v) => {
      v.preventDefault();
      const h = (v.clipboardData?.getData("text") || "").replace(/\D/g, "").split("").slice(0, t.length);
      h.forEach((j, V) => {
        s.value[V] = j;
      });
      const g = s.value.join("");
      n("update:modelValue", g), n("change", g);
      const _ = Math.min(h.length, t.length - 1);
      c(_), g.length === t.length && !s.value.includes("") && n("complete", g);
    }, b = (v, m) => {
      l.value[m] = v;
    };
    return (v, m) => (o(), r("div", B({ class: i.value }, M(p)), [
      (o(!0), r(W, null, Y(e.length, (h, g) => (o(), r("input", {
        key: g,
        ref_for: !0,
        ref: (_) => b(_, g),
        type: e.password ? "password" : "text",
        value: s.value[g],
        disabled: e.disabled,
        class: "apron-input-otp__input",
        maxlength: "1",
        inputmode: "numeric",
        autocomplete: "one-time-code",
        onInput: (_) => d(_, g),
        onKeydown: (_) => k(_, g),
        onPaste: y
      }, null, 40, ja))), 128))
    ], 16));
  }
}), Ea = ["href", "target"], Ia = /* @__PURE__ */ O({
  __name: "Link",
  props: {
    variant: { default: "primary" },
    underline: { default: "hover" },
    danger: { type: Boolean, default: !1 },
    href: {},
    target: {}
  },
  setup(e) {
    const a = e, t = R(), n = f(() => [
      "apron-link",
      `apron-link--${a.variant}`,
      `apron-link--underline-${a.underline}`,
      {
        "apron-link--danger": a.danger
      }
    ]);
    return (p, l) => (o(), r("a", B({
      class: n.value,
      href: e.href,
      target: e.target
    }, M(t)), [
      w(p.$slots, "default")
    ], 16, Ea));
  }
});
let le = null, Be = null;
const re = x([]);
let Ka = 0;
const Ha = {
  info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>',
  success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
  warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
  loading: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="31.4 31.4"/></svg>'
}, Da = () => {
  if (le) return;
  le = document.createElement("div"), le.className = "apron-message-container", document.body.appendChild(le);
  const e = document.createElement("style");
  e.textContent = `
    .apron-message-container {
      position: fixed;
      top: 16px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1100;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      pointer-events: none;
    }
    .apron-message {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 16px;
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      font-family: var(--apron-font-family, sans-serif);
      font-size: 14px;
      color: #18181b;
      pointer-events: auto;
      animation: apron-message-in 0.2s ease;
    }
    .apron-message--leaving {
      animation: apron-message-out 0.2s ease forwards;
    }
    .apron-message__icon {
      width: 18px;
      height: 18px;
      flex-shrink: 0;
    }
    .apron-message__icon svg {
      width: 100%;
      height: 100%;
    }
    .apron-message--info .apron-message__icon { color: #06b6d4; }
    .apron-message--success .apron-message__icon { color: #22c55e; }
    .apron-message--warning .apron-message__icon { color: #f59e0b; }
    .apron-message--error .apron-message__icon { color: #ef4444; }
    .apron-message--loading .apron-message__icon { 
      color: #393939;
      animation: apron-message-spin 1s linear infinite;
    }
    @keyframes apron-message-in {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes apron-message-out {
      from { opacity: 1; transform: translateY(0); }
      to { opacity: 0; transform: translateY(-10px); }
    }
    @keyframes apron-message-spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    [data-theme='dark'] .apron-message {
      background: #27272a;
      color: #fafafa;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
    }
    [data-theme='dark'] .apron-message--loading .apron-message__icon {
      color: #fafafa;
    }
  `, document.head.appendChild(e), Be = be({
    render() {
      return re.value.map(
        (a) => se("div", {
          key: a.id,
          class: ["apron-message", `apron-message--${a.type}`, { "apron-message--leaving": !a.visible }]
        }, [
          se("span", { class: "apron-message__icon", innerHTML: Ha[a.type] }),
          se("span", { class: "apron-message__content" }, a.content)
        ])
      );
    }
  }), Be.mount(le);
}, ne = (e) => {
  Da();
  const a = typeof e == "string" ? { content: e } : e, { type: t = "info", content: n, duration: p = 3e3 } = a, l = Ka++, s = { id: l, type: t, content: n, visible: !0 };
  return re.value.push(s), t !== "loading" && p > 0 && setTimeout(() => {
    Se(l);
  }, p), l;
}, Se = (e) => {
  const a = re.value.find((t) => t.id === e);
  a && (a.visible = !1, setTimeout(() => {
    const t = re.value.findIndex((n) => n.id === e);
    t !== -1 && re.value.splice(t, 1);
  }, 200));
}, za = (e, a) => ne({ type: "info", content: e, duration: a }), Ga = (e, a) => ne({ type: "success", content: e, duration: a }), Wa = (e, a) => ne({ type: "warning", content: e, duration: a }), qa = (e, a) => ne({ type: "error", content: e, duration: a }), Na = (e) => ne({ type: "loading", content: e, duration: 0 }), Ao = {
  show: ne,
  close: Se,
  info: za,
  success: Ga,
  warning: Wa,
  error: qa,
  loading: Na
}, Ya = {
  key: 0,
  class: "apron-modal-root"
}, Ua = {
  key: 0,
  class: "apron-modal__header"
}, Ja = { class: "apron-modal__title" }, Xa = { class: "apron-modal__body" }, Qa = {
  key: 1,
  class: "apron-modal__footer"
}, Ae = /* @__PURE__ */ O({
  __name: "Modal",
  props: {
    open: { type: Boolean, default: !1 },
    title: {},
    closable: { type: Boolean, default: !0 },
    closeByOverlay: { type: Boolean, default: !0 },
    width: { default: 480 },
    centered: { type: Boolean, default: !1 },
    okText: { default: "确定" },
    cancelText: { default: "取消" },
    okButtonProps: {},
    cancelButtonProps: {},
    showCancel: { type: Boolean, default: !0 }
  },
  emits: ["update:open", "close", "ok", "cancel", "afterOpenChange"],
  setup(e, { emit: a }) {
    const t = e, n = a, p = R(), l = x(!1), s = x(!1);
    z(() => t.open, (h) => {
      h ? (l.value = !0, s.value = !0, document.body.style.overflow = "hidden") : s.value = !0;
    });
    const i = () => {
      n("update:open", !1), n("close");
    }, c = () => {
      t.closeByOverlay && i();
    }, d = () => {
      n("ok");
    }, k = () => {
      n("cancel"), i();
    }, y = () => {
      l.value = !1, s.value = !1, document.body.style.overflow = "", n("afterOpenChange", !1);
    }, b = () => {
      s.value = !1, n("afterOpenChange", !0);
    }, v = f(() => typeof t.width == "number" ? `${t.width}px` : t.width), m = f(() => [
      "apron-modal",
      {
        "apron-modal--centered": t.centered
      }
    ]);
    return U(() => {
      t.open && (l.value = !0, document.body.style.overflow = "hidden");
    }), J(() => {
      document.body.style.overflow = "";
    }), (h, g) => (o(), H(Q, { to: "body" }, [
      l.value ? (o(), r("div", Ya, [
        G(q, { name: "apron-modal-overlay" }, {
          default: E(() => [
            e.open ? (o(), r("div", {
              key: 0,
              class: "apron-modal__overlay",
              onClick: c
            })) : C("", !0)
          ]),
          _: 1
        }),
        u("div", {
          class: D(m.value)
        }, [
          G(q, {
            name: "apron-modal",
            onAfterEnter: b,
            onAfterLeave: y
          }, {
            default: E(() => [
              e.open ? (o(), r("div", B({
                key: 0,
                class: "apron-modal__wrapper",
                style: { width: v.value }
              }, M(p)), [
                e.title || e.closable || h.$slots.header ? (o(), r("div", Ua, [
                  u("div", Ja, [
                    w(h.$slots, "header", {}, () => [
                      I(T(e.title), 1)
                    ])
                  ]),
                  e.closable ? (o(), r("button", {
                    key: 0,
                    type: "button",
                    class: "apron-modal__close",
                    onClick: i,
                    "aria-label": "Close"
                  }, [...g[0] || (g[0] = [
                    u("svg", {
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "2",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round"
                    }, [
                      u("line", {
                        x1: "18",
                        y1: "6",
                        x2: "6",
                        y2: "18"
                      }),
                      u("line", {
                        x1: "6",
                        y1: "6",
                        x2: "18",
                        y2: "18"
                      })
                    ], -1)
                  ])])) : C("", !0)
                ])) : C("", !0),
                u("div", Xa, [
                  w(h.$slots, "default")
                ]),
                h.$slots.footer || e.showCancel || e.okText ? (o(), r("div", Qa, [
                  w(h.$slots, "footer", {}, () => [
                    e.showCancel ? (o(), H(ee, B({ key: 0 }, e.cancelButtonProps, { onClick: k }), {
                      default: E(() => [
                        I(T(e.cancelText), 1)
                      ]),
                      _: 1
                    }, 16)) : C("", !0),
                    G(ee, B({ variant: "primary" }, e.okButtonProps, { onClick: d }), {
                      default: E(() => [
                        I(T(e.okText), 1)
                      ]),
                      _: 1
                    }, 16)
                  ])
                ])) : C("", !0)
              ], 16)) : C("", !0)
            ]),
            _: 3
          })
        ], 2)
      ])) : C("", !0)
    ]));
  }
}), Za = {
  key: 0,
  class: "apron-pagination__total"
}, en = ["disabled"], tn = ["disabled", "onClick", "aria-label", "aria-current"], an = ["disabled"], nn = /* @__PURE__ */ O({
  __name: "Pagination",
  props: {
    current: { default: 1 },
    total: { default: 0 },
    pageSize: { default: 10 },
    showQuickJumper: { type: Boolean, default: !1 },
    showTotal: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:current", "change"],
  setup(e, { emit: a }) {
    const t = e, n = a, p = R(), l = f(() => Math.ceil(t.total / t.pageSize)), s = f(() => {
      const h = [], g = t.current, _ = l.value;
      if (_ <= 7)
        for (let j = 1; j <= _; j++)
          h.push(j);
      else {
        h.push(1), g > 4 && h.push("ellipsis-start");
        const j = Math.max(2, g - 2), V = Math.min(_ - 1, g + 2);
        for (let P = j; P <= V; P++)
          h.push(P);
        g < _ - 3 && h.push("ellipsis-end"), _ > 1 && h.push(_);
      }
      return h;
    }), i = f(() => t.current > 1), c = f(() => t.current < l.value), d = (h) => {
      t.disabled || h < 1 || h > l.value || h !== t.current && (n("update:current", h), n("change", h, t.pageSize));
    }, k = () => {
      i.value && d(t.current - 1);
    }, y = () => {
      c.value && d(t.current + 1);
    }, b = () => {
      d(Math.max(1, t.current - 5));
    }, v = () => {
      d(Math.min(l.value, t.current + 5));
    }, m = f(() => [
      "apron-pagination",
      {
        "apron-pagination--disabled": t.disabled
      }
    ]);
    return (h, g) => (o(), r("nav", B({
      class: m.value,
      "aria-label": "Pagination"
    }, M(p)), [
      e.showTotal ? (o(), r("span", Za, " 共 " + T(e.total) + " 条 ", 1)) : C("", !0),
      u("button", {
        type: "button",
        class: "apron-pagination__btn apron-pagination__prev",
        disabled: !i.value || e.disabled,
        onClick: k,
        "aria-label": "Previous page"
      }, [...g[0] || (g[0] = [
        u("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, [
          u("polyline", { points: "15 18 9 12 15 6" })
        ], -1)
      ])], 8, en),
      (o(!0), r(W, null, Y(s.value, (_, j) => (o(), r(W, { key: j }, [
        _ === "ellipsis-start" ? (o(), r("button", {
          key: 0,
          type: "button",
          class: "apron-pagination__btn apron-pagination__ellipsis",
          onClick: b,
          "aria-label": "Jump 5 pages back"
        }, " ••• ")) : _ === "ellipsis-end" ? (o(), r("button", {
          key: 1,
          type: "button",
          class: "apron-pagination__btn apron-pagination__ellipsis",
          onClick: v,
          "aria-label": "Jump 5 pages forward"
        }, " ••• ")) : (o(), r("button", {
          key: 2,
          type: "button",
          class: D(["apron-pagination__btn apron-pagination__page", { "apron-pagination__page--active": _ === e.current }]),
          disabled: e.disabled,
          onClick: (V) => d(_),
          "aria-label": `Page ${_}`,
          "aria-current": _ === e.current ? "page" : void 0
        }, T(_), 11, tn))
      ], 64))), 128)),
      u("button", {
        type: "button",
        class: "apron-pagination__btn apron-pagination__next",
        disabled: !c.value || e.disabled,
        onClick: y,
        "aria-label": "Next page"
      }, [...g[1] || (g[1] = [
        u("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, [
          u("polyline", { points: "9 18 15 12 9 6" })
        ], -1)
      ])], 8, an)
    ], 16));
  }
}), on = {
  key: 0,
  class: "apron-popover__title"
}, ln = { class: "apron-popover__content" }, sn = /* @__PURE__ */ O({
  __name: "Popover",
  props: {
    title: {},
    content: {},
    mode: { default: "click" },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["openChange"],
  setup(e, { emit: a }) {
    const t = e, n = a, p = R(), l = x(null), s = x(null), i = x(!1), c = x({ top: 0, left: 0 });
    let d = null, k = null;
    const y = () => {
      if (!l.value || !s.value) return;
      const V = l.value.getBoundingClientRect(), P = s.value.getBoundingClientRect();
      let $ = V.bottom + 8, S = V.left + (V.width - P.width) / 2;
      S < 8 && (S = 8), S + P.width > window.innerWidth - 8 && (S = window.innerWidth - P.width - 8), $ + P.height > window.innerHeight - 8 && ($ = V.top - P.height - 8), c.value = { top: $, left: S };
    }, b = () => {
      t.disabled || (h(), d = setTimeout(() => {
        i.value = !0, n("openChange", !0), ve(y);
      }, t.mode === "hover" ? 100 : 0));
    }, v = () => {
      h(), k = setTimeout(() => {
        i.value = !1, n("openChange", !1);
      }, t.mode === "hover" ? 100 : 0);
    }, m = () => {
      i.value ? v() : b();
    }, h = () => {
      d && (clearTimeout(d), d = null), k && (clearTimeout(k), k = null);
    }, g = (V) => {
      t.mode === "click" && (l.value?.contains(V.target) || s.value?.contains(V.target) || v());
    };
    U(() => {
      document.addEventListener("click", g);
    }), J(() => {
      h(), document.removeEventListener("click", g);
    });
    const _ = f(() => t.mode === "hover" ? {
      onMouseenter: b,
      onMouseleave: v,
      onFocus: b,
      onBlur: v
    } : {
      onClick: m
    }), j = f(() => t.mode === "hover" ? {
      onMouseenter: b,
      onMouseleave: v
    } : {});
    return (V, P) => (o(), r(W, null, [
      u("span", B({
        ref_key: "triggerRef",
        ref: l,
        class: "apron-popover-trigger"
      }, { ...M(p), ..._.value }), [
        w(V.$slots, "default")
      ], 16),
      (o(), H(Q, { to: "body" }, [
        G(q, { name: "apron-popover" }, {
          default: E(() => [
            i.value ? (o(), r("div", B({
              key: 0,
              ref_key: "popoverRef",
              ref: s,
              class: "apron-popover",
              style: { top: `${c.value.top}px`, left: `${c.value.left}px` }
            }, j.value), [
              P[0] || (P[0] = u("div", { class: "apron-popover__arrow" }, null, -1)),
              e.title || V.$slots.title ? (o(), r("div", on, [
                w(V.$slots, "title", {}, () => [
                  I(T(e.title), 1)
                ])
              ])) : C("", !0),
              u("div", ln, [
                w(V.$slots, "content", {}, () => [
                  I(T(e.content), 1)
                ])
              ])
            ], 16)) : C("", !0)
          ]),
          _: 3
        })
      ]))
    ], 64));
  }
}), rn = {
  key: 0,
  class: "apron-popover__title"
}, cn = { class: "apron-popover__content" }, un = { class: "apron-popover__footer" }, dn = /* @__PURE__ */ O({
  __name: "PopoverConfirm",
  props: {
    title: {},
    content: {},
    okText: { default: "确定" },
    cancelText: { default: "取消" },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["confirm", "cancel", "openChange"],
  setup(e, { emit: a }) {
    const t = e, n = a, p = R(), l = x(null), s = x(null), i = x(!1), c = x({ top: 0, left: 0 }), d = () => {
      if (!l.value || !s.value) return;
      const g = l.value.getBoundingClientRect(), _ = s.value.getBoundingClientRect();
      let j = g.bottom + 8, V = g.left + (g.width - _.width) / 2;
      V < 8 && (V = 8), V + _.width > window.innerWidth - 8 && (V = window.innerWidth - _.width - 8), j + _.height > window.innerHeight - 8 && (j = g.top - _.height - 8), c.value = { top: j, left: V };
    }, k = () => {
      t.disabled || (i.value = !0, n("openChange", !0), ve(d));
    }, y = () => {
      i.value = !1, n("openChange", !1);
    }, b = () => {
      i.value ? y() : k();
    }, v = () => {
      n("confirm"), y();
    }, m = () => {
      n("cancel"), y();
    }, h = (g) => {
      l.value?.contains(g.target) || s.value?.contains(g.target) || y();
    };
    return U(() => {
      document.addEventListener("click", h);
    }), J(() => {
      document.removeEventListener("click", h);
    }), (g, _) => (o(), r(W, null, [
      u("span", B({
        ref_key: "triggerRef",
        ref: l,
        class: "apron-popover-trigger",
        onClick: b
      }, M(p)), [
        w(g.$slots, "default")
      ], 16),
      (o(), H(Q, { to: "body" }, [
        G(q, { name: "apron-popover" }, {
          default: E(() => [
            i.value ? (o(), r("div", {
              key: 0,
              ref_key: "popoverRef",
              ref: s,
              class: "apron-popover apron-popover-confirm",
              style: fe({ top: `${c.value.top}px`, left: `${c.value.left}px` })
            }, [
              _[0] || (_[0] = u("div", { class: "apron-popover__arrow" }, null, -1)),
              e.title || g.$slots.title ? (o(), r("div", rn, [
                w(g.$slots, "title", {}, () => [
                  I(T(e.title), 1)
                ])
              ])) : C("", !0),
              u("div", cn, [
                w(g.$slots, "content", {}, () => [
                  I(T(e.content), 1)
                ])
              ]),
              u("div", un, [
                G(ee, {
                  size: "small",
                  onClick: m
                }, {
                  default: E(() => [
                    I(T(e.cancelText), 1)
                  ]),
                  _: 1
                }),
                G(ee, {
                  size: "small",
                  variant: "primary",
                  onClick: v
                }, {
                  default: E(() => [
                    I(T(e.okText), 1)
                  ]),
                  _: 1
                })
              ])
            ], 4)) : C("", !0)
          ]),
          _: 3
        })
      ]))
    ], 64));
  }
}), pn = { class: "apron-radio__input" }, fn = ["checked", "disabled", "value", "name"], je = Symbol("radioGroup"), vn = /* @__PURE__ */ O({
  __name: "Radio",
  props: {
    modelValue: { type: Boolean },
    value: {},
    disabled: { type: Boolean, default: !1 },
    labelClickable: { type: Boolean, default: !0 },
    name: {}
  },
  emits: ["update:modelValue", "change"],
  setup(e, { emit: a }) {
    const t = e, n = a, p = R(), l = X(je, null), s = x(t.modelValue ?? !1);
    z(() => t.modelValue, (m) => {
      s.value = m ?? !1;
    });
    const i = f(() => l && t.value !== void 0 ? l.value === t.value : s.value), c = f(() => t.disabled || l?.disabled), d = f(() => l?.labelClickable ?? t.labelClickable), k = f(() => l?.name ?? t.name), y = f(() => [
      "apron-radio",
      {
        "apron-radio--checked": i.value,
        "apron-radio--disabled": c.value,
        "apron-radio--label-clickable": d.value
      }
    ]), b = () => {
      c.value || (l && t.value !== void 0 ? l.onChange(t.value) : (s.value = !0, n("update:modelValue", !0), n("change", !0)));
    }, v = () => {
      c.value || !d.value || i.value || b();
    };
    return (m, h) => (o(), r("label", B({ class: y.value }, M(p)), [
      u("span", pn, [
        u("input", {
          type: "radio",
          class: "apron-radio__native",
          checked: i.value,
          disabled: c.value,
          value: e.value,
          name: k.value,
          onChange: b
        }, null, 40, fn),
        h[0] || (h[0] = u("span", { class: "apron-radio__circle" }, [
          u("span", { class: "apron-radio__dot" })
        ], -1))
      ]),
      m.$slots.default ? (o(), r("span", {
        key: 0,
        class: "apron-radio__label",
        onClick: Te(v, ["prevent"])
      }, [
        w(m.$slots, "default")
      ])) : C("", !0)
    ], 16));
  }
}), hn = /* @__PURE__ */ O({
  __name: "RadioGroup",
  props: {
    modelValue: {},
    options: {},
    disabled: { type: Boolean, default: !1 },
    direction: { default: "horizontal" },
    labelClickable: { type: Boolean, default: !0 },
    name: {}
  },
  emits: ["update:modelValue", "change"],
  setup(e, { emit: a }) {
    const t = e, n = a, p = R(), l = x(t.modelValue);
    z(() => t.modelValue, (d) => {
      l.value = d;
    }), te(je, {
      get value() {
        return l.value;
      },
      get name() {
        return t.name;
      },
      get disabled() {
        return t.disabled;
      },
      get labelClickable() {
        return t.labelClickable;
      },
      onChange: (d) => {
        l.value = d, n("update:modelValue", d), n("change", d);
      }
    });
    const c = f(() => [
      "apron-radio-group",
      `apron-radio-group--${t.direction}`
    ]);
    return (d, k) => (o(), r("div", B({
      class: c.value,
      role: "radiogroup"
    }, M(p)), [
      w(d.$slots, "default")
    ], 16));
  }
}), mn = ["onMouseenter", "onClick"], gn = ["onMouseenter", "onClick"], Ve = `<svg viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
</svg>`, yn = /* @__PURE__ */ O({
  __name: "Rate",
  props: {
    modelValue: { default: 0 },
    count: { default: 5 },
    disabled: { type: Boolean, default: !1 },
    allowHalf: { type: Boolean, default: !1 },
    allowClear: { type: Boolean, default: !0 }
  },
  emits: ["update:modelValue", "change"],
  setup(e, { emit: a }) {
    const t = e, n = a, p = R(), l = x(null), s = x(t.modelValue);
    z(() => t.modelValue, (v) => {
      s.value = v;
    });
    const i = f(() => l.value !== null ? l.value : s.value), c = f(() => [
      "apron-rate",
      {
        "apron-rate--disabled": t.disabled
      }
    ]), d = (v) => {
      const m = i.value, h = v + 1;
      return m >= h ? "apron-rate__star--full" : t.allowHalf && m >= h - 0.5 ? "apron-rate__star--half" : "";
    }, k = (v, m = !1) => {
      t.disabled || (l.value = t.allowHalf && m ? v + 0.5 : v + 1);
    }, y = () => {
      t.disabled || (l.value = null);
    }, b = (v, m = !1) => {
      if (t.disabled) return;
      let h = t.allowHalf && m ? v + 0.5 : v + 1;
      t.allowClear && h === s.value && (h = 0), s.value = h, n("update:modelValue", h), n("change", h);
    };
    return (v, m) => (o(), r("div", B({
      class: c.value,
      onMouseleave: y
    }, M(p)), [
      (o(!0), r(W, null, Y(e.count, (h, g) => (o(), r("div", {
        key: g,
        class: D(["apron-rate__star", d(g)])
      }, [
        e.allowHalf ? (o(), r("span", {
          key: 0,
          class: "apron-rate__star-half apron-rate__star-half--first",
          onMouseenter: (_) => k(g, !0),
          onClick: (_) => b(g, !0),
          innerHTML: Ve
        }, null, 40, mn)) : C("", !0),
        u("span", {
          class: "apron-rate__star-half apron-rate__star-half--second",
          onMouseenter: (_) => k(g, !1),
          onClick: (_) => b(g, !1),
          innerHTML: Ve
        }, null, 40, gn)
      ], 2))), 128))
    ], 16));
  }
}), _n = /* @__PURE__ */ O({
  __name: "ResponsiveModal",
  props: {
    open: { type: Boolean, default: !1 },
    title: {},
    closable: { type: Boolean, default: !0 },
    closeByOverlay: { type: Boolean, default: !0 },
    width: { default: 480 },
    okText: { default: "确定" },
    cancelText: { default: "取消" },
    okButtonProps: {},
    cancelButtonProps: {},
    showCancel: { type: Boolean, default: !0 },
    breakpoint: { default: 768 }
  },
  emits: ["update:open", "close", "ok", "cancel", "afterOpenChange"],
  setup(e, { emit: a }) {
    const t = e, n = a, p = R(), l = f(() => typeof window > "u" ? !1 : window.innerWidth < t.breakpoint), s = (y) => {
      n("update:open", y);
    }, i = () => {
      n("close");
    }, c = () => {
      n("ok");
    }, d = () => {
      n("cancel");
    }, k = (y) => {
      n("afterOpenChange", y);
    };
    return (y, b) => l.value ? (o(), H(Oe, B({
      key: 1,
      open: e.open,
      title: e.title,
      closable: e.closable,
      closeByOverlay: e.closeByOverlay,
      placement: "bottom",
      height: "auto",
      okText: e.okText,
      cancelText: e.cancelText,
      okButtonProps: e.okButtonProps,
      cancelButtonProps: e.cancelButtonProps,
      showCancel: e.showCancel,
      isMobile: "",
      "onUpdate:open": s,
      onClose: i,
      onOk: c,
      onCancel: d,
      onAfterOpenChange: k
    }, M(p)), xe({
      default: E(() => [
        w(y.$slots, "default")
      ]),
      _: 2
    }, [
      y.$slots.header ? {
        name: "header",
        fn: E(() => [
          w(y.$slots, "header")
        ]),
        key: "0"
      } : void 0,
      y.$slots.footer ? {
        name: "footer",
        fn: E(() => [
          w(y.$slots, "footer")
        ]),
        key: "1"
      } : void 0
    ]), 1040, ["open", "title", "closable", "closeByOverlay", "okText", "cancelText", "okButtonProps", "cancelButtonProps", "showCancel"])) : (o(), H(Ae, B({
      key: 0,
      open: e.open,
      title: e.title,
      closable: e.closable,
      closeByOverlay: e.closeByOverlay,
      width: e.width,
      okText: e.okText,
      cancelText: e.cancelText,
      okButtonProps: e.okButtonProps,
      cancelButtonProps: e.cancelButtonProps,
      showCancel: e.showCancel,
      centered: "",
      "onUpdate:open": s,
      onClose: i,
      onOk: c,
      onCancel: d,
      onAfterOpenChange: k
    }, M(p)), xe({
      default: E(() => [
        w(y.$slots, "default")
      ]),
      _: 2
    }, [
      y.$slots.header ? {
        name: "header",
        fn: E(() => [
          w(y.$slots, "header")
        ]),
        key: "0"
      } : void 0,
      y.$slots.footer ? {
        name: "footer",
        fn: E(() => [
          w(y.$slots, "footer")
        ]),
        key: "1"
      } : void 0
    ]), 1040, ["open", "title", "closable", "closeByOverlay", "width", "okText", "cancelText", "okButtonProps", "cancelButtonProps", "showCancel"]));
  }
}), kn = {
  key: 0,
  class: "apron-select__value"
}, bn = {
  key: 1,
  class: "apron-select__placeholder"
}, wn = { class: "apron-select__suffix" }, $n = {
  key: 0,
  class: "apron-select__loading"
}, Cn = {
  key: 1,
  class: "apron-select__arrow",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, xn = {
  key: 0,
  class: "apron-select__dropdown"
}, Bn = { class: "apron-select__options" }, Vn = ["onClick"], Tn = /* @__PURE__ */ O({
  __name: "Select",
  props: {
    modelValue: {},
    options: { default: () => [] },
    placeholder: { default: "请选择" },
    disabled: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    inflow: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "change", "openChange"],
  setup(e, { emit: a }) {
    const t = e, n = a, p = R(), l = x(null), s = x(!1), i = x(t.modelValue);
    z(() => t.modelValue, (h) => {
      i.value = h;
    });
    const c = f(() => t.options.find((h) => h.value === i.value)), d = f(() => c.value?.label ?? ""), k = f(() => [
      "apron-select",
      {
        "apron-select--open": s.value,
        "apron-select--disabled": t.disabled,
        "apron-select--loading": t.loading,
        "apron-select--inflow": t.inflow,
        "apron-select--has-value": i.value !== void 0
      }
    ]), y = () => {
      t.disabled || t.loading || (s.value = !s.value, n("openChange", s.value));
    }, b = () => {
      s.value && (s.value = !1, n("openChange", !1));
    }, v = (h) => {
      h.disabled || (i.value = h.value, n("update:modelValue", h.value), n("change", h.value), b());
    }, m = (h) => {
      l.value && !l.value.contains(h.target) && b();
    };
    return U(() => {
      document.addEventListener("click", m);
    }), J(() => {
      document.removeEventListener("click", m);
    }), (h, g) => (o(), r("div", B({
      ref_key: "selectRef",
      ref: l,
      class: k.value
    }, M(p)), [
      u("div", {
        class: "apron-select__trigger",
        onClick: y,
        tabindex: "0"
      }, [
        d.value ? (o(), r("span", kn, T(d.value), 1)) : (o(), r("span", bn, T(e.placeholder), 1)),
        u("span", wn, [
          e.loading ? (o(), r("span", $n, [...g[0] || (g[0] = [
            u("svg", {
              viewBox: "0 0 24 24",
              fill: "none"
            }, [
              u("circle", {
                cx: "12",
                cy: "12",
                r: "10",
                stroke: "currentColor",
                "stroke-width": "2",
                "stroke-linecap": "round",
                "stroke-dasharray": "31.4 31.4"
              })
            ], -1)
          ])])) : (o(), r("svg", Cn, [...g[1] || (g[1] = [
            u("polyline", { points: "6 9 12 15 18 9" }, null, -1)
          ])]))
        ])
      ]),
      G(q, { name: "apron-select-dropdown" }, {
        default: E(() => [
          s.value ? (o(), r("div", xn, [
            u("div", Bn, [
              (o(!0), r(W, null, Y(e.options, (_) => (o(), r("div", {
                key: _.value,
                class: D(["apron-select__option", {
                  "apron-select__option--selected": _.value === i.value,
                  "apron-select__option--disabled": _.disabled
                }]),
                onClick: (j) => v(_)
              }, T(_.label), 11, Vn))), 128))
            ])
          ])) : C("", !0)
        ]),
        _: 1
      })
    ], 16));
  }
}), Ln = /* @__PURE__ */ O({
  __name: "Skeleton",
  props: {
    loading: { type: Boolean, default: !0 },
    animated: { type: Boolean, default: !0 }
  },
  setup(e) {
    const a = e, t = R();
    ie();
    const n = f(() => [
      "apron-skeleton",
      {
        "apron-skeleton--animated": a.animated
      }
    ]);
    return (p, l) => (o(), r("div", B({ class: n.value }, M(t)), [
      e.loading ? w(p.$slots, "template", { key: 0 }, () => [
        l[0] || (l[0] = De('<div class="apron-skeleton__content"><div class="apron-skeleton__avatar apron-skeleton-element apron-skeleton-element--circular"></div><div class="apron-skeleton__info"><div class="apron-skeleton-element apron-skeleton-element--text" style="width:40%;"></div><div class="apron-skeleton-element apron-skeleton-element--text"></div><div class="apron-skeleton-element apron-skeleton-element--text" style="width:60%;"></div></div></div>', 1))
      ]) : w(p.$slots, "default", { key: 1 })
    ], 16));
  }
}), Mn = /* @__PURE__ */ O({
  __name: "SkeletonElement",
  props: {
    variant: { default: "text" },
    width: {},
    height: {},
    animated: { type: Boolean, default: !0 }
  },
  setup(e) {
    const a = e, t = R(), n = f(() => {
      const l = {};
      return a.width && (l.width = typeof a.width == "number" ? `${a.width}px` : a.width), a.height && (l.height = typeof a.height == "number" ? `${a.height}px` : a.height), l;
    }), p = f(() => [
      "apron-skeleton-element",
      `apron-skeleton-element--${a.variant}`,
      {
        "apron-skeleton--animated": a.animated
      }
    ]);
    return (l, s) => (o(), r("div", B({
      class: p.value,
      style: n.value
    }, M(t)), null, 16));
  }
}), On = /* @__PURE__ */ O({
  __name: "Space",
  props: {
    align: { default: "center" },
    orientation: { default: "horizontal" },
    size: { default: "middle" },
    wrap: { type: Boolean, default: !1 }
  },
  setup(e) {
    const a = e, t = R(), n = {
      small: 8,
      middle: 16,
      large: 24
    }, p = f(() => typeof a.size == "number" ? a.size : n[a.size]), l = f(() => ({
      "--apron-space-gap": `${p.value}px`
    })), s = f(() => [
      "apron-space",
      `apron-space--${a.orientation}`,
      `apron-space--align-${a.align}`,
      {
        "apron-space--wrap": a.wrap
      }
    ]);
    return (i, c) => (o(), r("div", B({
      class: s.value,
      style: l.value
    }, M(t)), [
      w(i.$slots, "default")
    ], 16));
  }
}), Rn = {
  key: 0,
  class: "apron-spin-root"
}, Pn = { class: "apron-spin__icon" }, Sn = {
  key: 0,
  class: "apron-spin__text"
}, An = {
  key: 0,
  class: "apron-spin__indicator"
}, jn = { class: "apron-spin__icon" }, Fn = {
  key: 0,
  class: "apron-spin__text"
}, En = { class: "apron-spin__icon" }, In = {
  key: 0,
  class: "apron-spin__text"
}, me = `<svg viewBox="0 0 24 24" fill="none">
  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="31.4 31.4"/>
</svg>`, we = /* @__PURE__ */ O({
  __name: "Spin",
  props: {
    loading: { type: Boolean, default: !0 },
    text: {},
    icon: {},
    placement: { default: "center" },
    fullscreen: { type: Boolean, default: !1 }
  },
  setup(e) {
    const a = e, t = R(), n = ie(), p = f(() => !!n.default), l = f(() => [
      "apron-spin",
      `apron-spin--${a.placement}`,
      {
        "apron-spin--loading": a.loading,
        "apron-spin--fullscreen": a.fullscreen,
        "apron-spin--wrapper": p.value
      }
    ]);
    return (s, i) => e.fullscreen ? (o(), H(Q, {
      key: 0,
      to: "body"
    }, [
      G(q, { name: "apron-spin-fullscreen" }, {
        default: E(() => [
          e.loading ? (o(), r("div", Rn, [
            i[0] || (i[0] = u("div", { class: "apron-spin__overlay" }, null, -1)),
            u("div", B({ class: l.value }, M(t)), [
              u("span", Pn, [
                w(s.$slots, "icon", {}, () => [
                  e.icon ? (o(), H(Z(e.icon), { key: 0 })) : (o(), r("span", {
                    key: 1,
                    innerHTML: me
                  }))
                ])
              ]),
              e.text ? (o(), r("span", Sn, T(e.text), 1)) : C("", !0)
            ], 16)
          ])) : C("", !0)
        ]),
        _: 3
      })
    ])) : p.value ? (o(), r("div", B({
      key: 1,
      class: l.value
    }, M(t)), [
      u("div", {
        class: D(["apron-spin__content", { "apron-spin__content--blur": e.loading }])
      }, [
        w(s.$slots, "default")
      ], 2),
      G(q, { name: "apron-spin-fade" }, {
        default: E(() => [
          e.loading ? (o(), r("div", An, [
            u("span", jn, [
              w(s.$slots, "icon", {}, () => [
                e.icon ? (o(), H(Z(e.icon), { key: 0 })) : (o(), r("span", {
                  key: 1,
                  innerHTML: me
                }))
              ])
            ]),
            e.text ? (o(), r("span", Fn, T(e.text), 1)) : C("", !0)
          ])) : C("", !0)
        ]),
        _: 3
      })
    ], 16)) : (o(), r("div", B({
      key: 2,
      class: l.value
    }, M(t)), [
      u("span", En, [
        w(s.$slots, "icon", {}, () => [
          e.icon ? (o(), H(Z(e.icon), { key: 0 })) : (o(), r("span", {
            key: 1,
            innerHTML: me
          }))
        ])
      ]),
      e.text ? (o(), r("span", In, T(e.text), 1)) : C("", !0)
    ], 16));
  }
});
let ge = null, ye = null;
const $e = x(!1), de = x({}), Kn = () => {
  ge || (ye = document.createElement("div"), document.body.appendChild(ye), ge = be({
    render() {
      return se(we, {
        loading: $e.value,
        fullscreen: !0,
        text: de.value.text,
        icon: de.value.icon
      });
    }
  }), ge.mount(ye));
}, Hn = (e) => {
  Kn(), typeof e == "string" ? de.value = { text: e } : de.value = e || {}, $e.value = !0;
}, Dn = () => {
  $e.value = !1;
}, Fe = {
  show: Hn,
  close: Dn
}, Ee = we;
Ee.show = Fe.show;
Ee.close = Fe.close;
const zn = { class: "apron-steps__content" }, Gn = { class: "apron-steps__icon" }, Wn = ["innerHTML"], qn = ["innerHTML"], Nn = { key: 2 }, Yn = {
  key: 0,
  class: "apron-steps__line"
}, Un = { class: "apron-steps__label" }, Jn = { class: "apron-steps__title" }, Xn = {
  key: 0,
  class: "apron-steps__subtitle"
}, Qn = /* @__PURE__ */ O({
  __name: "Steps",
  props: {
    items: {},
    current: { default: 0 },
    labelPlacement: { default: "bottom" }
  },
  setup(e) {
    const a = e, t = R(), n = (s) => {
      const i = a.items[s];
      return i.status ? i.status : s < a.current ? "completed" : s === a.current ? "current" : "pending";
    }, p = f(() => [
      "apron-steps",
      `apron-steps--label-${a.labelPlacement}`
    ]), l = {
      completed: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>`,
      error: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>`
    };
    return (s, i) => (o(), r("div", B({ class: p.value }, M(t)), [
      (o(!0), r(W, null, Y(e.items, (c, d) => (o(), r("div", {
        key: d,
        class: D(["apron-steps__step", `apron-steps__step--${n(d)}`])
      }, [
        u("div", zn, [
          u("div", Gn, [
            n(d) === "completed" ? (o(), r("span", {
              key: 0,
              innerHTML: l.completed
            }, null, 8, Wn)) : n(d) === "error" ? (o(), r("span", {
              key: 1,
              innerHTML: l.error
            }, null, 8, qn)) : (o(), r("span", Nn, T(d + 1), 1))
          ]),
          d < e.items.length - 1 ? (o(), r("div", Yn)) : C("", !0)
        ]),
        u("div", Un, [
          u("div", Jn, T(c.title), 1),
          c.subtitle ? (o(), r("div", Xn, T(c.subtitle), 1)) : C("", !0)
        ])
      ], 2))), 128))
    ], 16));
  }
}), Zn = ["checked", "disabled"], eo = /* @__PURE__ */ O({
  __name: "Switch",
  props: {
    modelValue: { type: Boolean },
    disabled: { type: Boolean, default: !1 },
    size: { default: "default" },
    variant: { default: "default" },
    checkedColor: {},
    uncheckedColor: {}
  },
  emits: ["update:modelValue", "change"],
  setup(e, { emit: a }) {
    const t = e, n = a, p = R(), l = x(t.modelValue ?? !1);
    z(() => t.modelValue, (d) => {
      l.value = d ?? !1;
    });
    const s = f(() => [
      "apron-switch",
      `apron-switch--${t.size}`,
      `apron-switch--${t.variant}`,
      {
        "apron-switch--checked": l.value,
        "apron-switch--disabled": t.disabled
      }
    ]), i = f(() => {
      const d = {};
      return t.checkedColor && l.value && (d["--switch-checked-bg"] = t.checkedColor), t.uncheckedColor && !l.value && (d["--switch-bg"] = t.uncheckedColor), d;
    }), c = () => {
      if (t.disabled) return;
      const d = !l.value;
      l.value = d, n("update:modelValue", d), n("change", d);
    };
    return (d, k) => (o(), r("label", B({
      class: s.value,
      style: i.value
    }, M(p)), [
      u("input", {
        type: "checkbox",
        class: "apron-switch__native",
        checked: l.value,
        disabled: e.disabled,
        onChange: c
      }, null, 40, Zn),
      k[0] || (k[0] = u("span", { class: "apron-switch__track" }, [
        u("span", { class: "apron-switch__thumb" })
      ], -1))
    ], 16));
  }
}), Ce = Symbol("tabsContext"), to = /* @__PURE__ */ O({
  __name: "Tabs",
  props: {
    modelValue: {},
    defaultActiveKey: {},
    capsule: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "change"],
  setup(e, { emit: a }) {
    const t = e, n = a, p = R(), l = x(t.modelValue ?? t.defaultActiveKey ?? "");
    z(() => t.modelValue, (d) => {
      d !== void 0 && (l.value = d);
    }), te(Ce, {
      get activeKey() {
        return l.value;
      },
      setActiveKey: (d) => {
        l.value = d, n("update:modelValue", d), n("change", d);
      }
    });
    const c = f(() => [
      "apron-tabs",
      {
        "apron-tabs--capsule": t.capsule
      }
    ]);
    return (d, k) => (o(), r("div", B({ class: c.value }, M(p)), [
      w(d.$slots, "default")
    ], 16));
  }
}), ao = { class: "apron-tabs__nav" }, no = {
  key: 0,
  class: "apron-tabs__extra"
}, oo = /* @__PURE__ */ O({
  __name: "TabList",
  props: {
    extra: {}
  },
  setup(e) {
    const a = R();
    return (t, n) => (o(), r("div", B({
      class: "apron-tabs__list",
      role: "tablist"
    }, M(a)), [
      u("div", ao, [
        w(t.$slots, "default")
      ]),
      e.extra || t.$slots.extra ? (o(), r("div", no, [
        w(t.$slots, "extra", {}, () => [
          I(T(e.extra), 1)
        ])
      ])) : C("", !0)
    ], 16));
  }
}), lo = ["aria-selected", "tabindex"], so = /* @__PURE__ */ O({
  __name: "Tab",
  props: {
    tabKey: {},
    disabled: { type: Boolean, default: !1 }
  },
  setup(e) {
    const a = e, t = R(), n = X(Ce, null), p = f(() => n?.activeKey === a.tabKey), l = f(() => [
      "apron-tabs__tab",
      {
        "apron-tabs__tab--active": p.value,
        "apron-tabs__tab--disabled": a.disabled
      }
    ]), s = () => {
      a.disabled || n?.setActiveKey(a.tabKey);
    };
    return (i, c) => (o(), r("button", B({
      type: "button",
      class: l.value,
      role: "tab",
      "aria-selected": p.value,
      tabindex: p.value ? 0 : -1,
      onClick: s
    }, M(t)), [
      w(i.$slots, "default")
    ], 16, lo));
  }
}), ro = /* @__PURE__ */ O({
  __name: "TabPanel",
  props: {
    tabKey: {}
  },
  setup(e) {
    const a = e, t = R(), n = X(Ce, null), p = f(() => n?.activeKey === a.tabKey), l = f(() => [
      "apron-tabs__panel",
      {
        "apron-tabs__panel--active": p.value
      }
    ]);
    return (s, i) => ze((o(), r("div", B({
      class: l.value,
      role: "tabpanel"
    }, M(t)), [
      w(s.$slots, "default")
    ], 16)), [
      [Ge, p.value]
    ]);
  }
}), io = { class: "apron-tag__content" }, co = /* @__PURE__ */ O({
  __name: "Tag",
  props: {
    variant: { default: "default" },
    closable: { type: Boolean, default: !1 }
  },
  emits: ["close"],
  setup(e, { emit: a }) {
    const t = e, n = a, p = R(), l = f(() => [
      "apron-tag",
      `apron-tag--${t.variant}`,
      {
        "apron-tag--closable": t.closable
      }
    ]), s = (i) => {
      i.stopPropagation(), n("close", i);
    };
    return (i, c) => (o(), r("span", B({ class: l.value }, M(p)), [
      u("span", io, [
        w(i.$slots, "default")
      ]),
      e.closable ? (o(), r("button", {
        key: 0,
        type: "button",
        class: "apron-tag__close",
        onClick: s,
        "aria-label": "Close"
      }, [...c[0] || (c[0] = [
        u("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, [
          u("line", {
            x1: "18",
            y1: "6",
            x2: "6",
            y2: "18"
          }),
          u("line", {
            x1: "6",
            y1: "6",
            x2: "18",
            y2: "18"
          })
        ], -1)
      ])])) : C("", !0)
    ], 16));
  }
}), Ie = Symbol("timelineContext"), uo = /* @__PURE__ */ O({
  __name: "Timeline",
  props: {
    side: { default: "left" }
  },
  setup(e) {
    const a = e, t = R();
    te(Ie, {
      get side() {
        return a.side;
      }
    });
    const p = f(() => [
      "apron-timeline",
      `apron-timeline--${a.side}`
    ]);
    return (l, s) => (o(), r("div", B({ class: p.value }, M(t)), [
      w(l.$slots, "default")
    ], 16));
  }
}), po = { class: "apron-timeline-item__content" }, fo = {
  key: 0,
  class: "apron-timeline-item__title"
}, vo = { class: "apron-timeline-item__text" }, ho = {
  key: 1,
  class: "apron-timeline-item__date"
}, mo = /* @__PURE__ */ O({
  __name: "TimelineItem",
  props: {
    title: {},
    content: {},
    date: {},
    dotColor: {}
  },
  setup(e) {
    const a = e, t = R();
    X(Ie, null);
    const n = f(() => [
      "apron-timeline-item"
    ]), p = f(() => a.dotColor ? { "--timeline-dot-color": a.dotColor } : {});
    return (l, s) => (o(), r("div", B({
      class: n.value,
      style: p.value
    }, M(t)), [
      s[0] || (s[0] = u("div", { class: "apron-timeline-item__line" }, [
        u("span", { class: "apron-timeline-item__dot" })
      ], -1)),
      u("div", po, [
        e.title ? (o(), r("div", fo, T(e.title), 1)) : C("", !0),
        u("div", vo, [
          w(l.$slots, "default", {}, () => [
            I(T(e.content), 1)
          ])
        ]),
        e.date ? (o(), r("div", ho, T(e.date), 1)) : C("", !0)
      ])
    ], 16));
  }
}), go = {
  key: 0,
  class: "apron-toast-root"
}, yo = { class: "apron-toast__icon" }, _o = ["innerHTML"], ko = {
  key: 0,
  class: "apron-toast__text"
}, bo = /* @__PURE__ */ O({
  __name: "Toast",
  props: {
    visible: { type: Boolean, default: !1 },
    type: { default: "success" },
    text: {},
    icon: {},
    duration: { default: 2e3 }
  },
  emits: ["update:visible", "close"],
  setup(e, { emit: a }) {
    const t = e, n = a, p = R(), l = x(t.visible);
    let s = null;
    z(() => t.visible, (y) => {
      l.value = y, y && t.type !== "loading" && t.duration > 0 && (i(), s = setTimeout(() => {
        c();
      }, t.duration));
    });
    const i = () => {
      s && (clearTimeout(s), s = null);
    }, c = () => {
      l.value = !1, n("update:visible", !1), n("close");
    };
    U(() => {
      t.visible && t.type !== "loading" && t.duration > 0 && (s = setTimeout(() => {
        c();
      }, t.duration));
    });
    const d = {
      success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>`,
      fail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="15" y1="9" x2="9" y2="15"/>
    <line x1="9" y1="9" x2="15" y2="15"/>
  </svg>`,
      danger: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>`,
      loading: `<svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="31.4 31.4"/>
  </svg>`
    }, k = f(() => [
      "apron-toast",
      `apron-toast--${t.type}`
    ]);
    return (y, b) => (o(), H(Q, { to: "body" }, [
      G(q, { name: "apron-toast" }, {
        default: E(() => [
          l.value ? (o(), r("div", go, [
            b[0] || (b[0] = u("div", { class: "apron-toast__overlay" }, null, -1)),
            u("div", B({ class: k.value }, M(p)), [
              u("span", yo, [
                e.icon ? (o(), H(Z(e.icon), { key: 0 })) : (o(), r("span", {
                  key: 1,
                  innerHTML: d[e.type]
                }, null, 8, _o))
              ]),
              e.text ? (o(), r("span", ko, T(e.text), 1)) : C("", !0)
            ], 16)
          ])) : C("", !0)
        ]),
        _: 1
      })
    ]));
  }
});
let _e = null, ke = null;
const pe = x(!1), ae = x({}), wo = () => {
  _e || (ke = document.createElement("div"), document.body.appendChild(ke), _e = be({
    render() {
      return se(bo, {
        visible: pe.value,
        type: ae.value.type || "success",
        text: ae.value.text,
        icon: ae.value.icon,
        duration: ae.value.duration || 2e3,
        "onUpdate:visible": (e) => {
          pe.value = e;
        }
      });
    }
  }), _e.mount(ke));
}, ce = (e) => {
  wo(), typeof e == "string" ? ae.value = { text: e } : ae.value = e, pe.value = !0;
}, $o = () => {
  pe.value = !1;
}, Co = (e, a) => {
  ce({ type: "success", text: e, duration: a });
}, xo = (e, a) => {
  ce({ type: "fail", text: e, duration: a });
}, Bo = (e, a) => {
  ce({ type: "danger", text: e, duration: a });
}, Vo = (e) => {
  ce({ type: "loading", text: e || "加载中...", duration: 0 });
}, jo = {
  show: ce,
  close: $o,
  success: Co,
  fail: xo,
  danger: Bo,
  loading: Vo
}, To = { class: "apron-tooltip__content" }, Lo = /* @__PURE__ */ O({
  __name: "Tooltip",
  props: {
    content: {},
    disabled: { type: Boolean, default: !1 }
  },
  setup(e) {
    const a = e, t = R(), n = x(null), p = x(null), l = x(!1), s = x({ top: 0, left: 0 });
    let i = null, c = null;
    const d = () => {
      if (!n.value || !p.value) return;
      const v = n.value.getBoundingClientRect(), m = p.value.getBoundingClientRect();
      let h = v.top - m.height - 8, g = v.left + (v.width - m.width) / 2;
      g < 8 && (g = 8), g + m.width > window.innerWidth - 8 && (g = window.innerWidth - m.width - 8), h < 8 && (h = v.bottom + 8), s.value = { top: h, left: g };
    }, k = () => {
      a.disabled || (b(), i = setTimeout(() => {
        l.value = !0, ve(d);
      }, 100));
    }, y = () => {
      b(), c = setTimeout(() => {
        l.value = !1;
      }, 100);
    }, b = () => {
      i && (clearTimeout(i), i = null), c && (clearTimeout(c), c = null);
    };
    return J(() => {
      b();
    }), (v, m) => (o(), r(W, null, [
      u("span", B({
        ref_key: "triggerRef",
        ref: n,
        class: "apron-tooltip-trigger",
        onMouseenter: k,
        onMouseleave: y,
        onFocus: k,
        onBlur: y
      }, M(t)), [
        w(v.$slots, "default")
      ], 16),
      (o(), H(Q, { to: "body" }, [
        G(q, { name: "apron-tooltip" }, {
          default: E(() => [
            l.value ? (o(), r("div", {
              key: 0,
              ref_key: "tooltipRef",
              ref: p,
              class: "apron-tooltip",
              style: fe({ top: `${s.value.top}px`, left: `${s.value.left}px` }),
              onMouseenter: k,
              onMouseleave: y
            }, [
              m[0] || (m[0] = u("div", { class: "apron-tooltip__arrow" }, null, -1)),
              u("div", To, [
                w(v.$slots, "content", {}, () => [
                  I(T(e.content), 1)
                ])
              ])
            ], 36)) : C("", !0)
          ]),
          _: 3
        })
      ]))
    ], 64));
  }
}), Mo = "1.0.0", Oo = [
  Ne,
  Je,
  Xe,
  tt,
  ee,
  lt,
  it,
  ct,
  ut,
  kt,
  Bt,
  Vt,
  Tt,
  Rt,
  Nt,
  Jt,
  Oe,
  la,
  sa,
  fa,
  va,
  ha,
  $a,
  Oa,
  Aa,
  Fa,
  Ia,
  Ae,
  nn,
  sn,
  dn,
  vn,
  hn,
  yn,
  _n,
  Tn,
  Ln,
  Mn,
  On,
  we,
  Qn,
  eo,
  to,
  oo,
  so,
  ro,
  co,
  uo,
  mo,
  Lo
], Ro = (e) => {
  Oo.forEach((a) => {
    a.name && e.component(a.name, a);
  });
}, Fo = {
  version: Mo,
  install: Ro
};
export {
  Ne as Alert,
  Je as Avatar,
  Xe as AvatarGroup,
  tt as Badge,
  ee as Button,
  lt as Card,
  ct as CardBody,
  ut as CardFooter,
  it as CardHeader,
  kt as Cascader,
  Bt as Checkbox,
  Vt as CheckboxGroup,
  ha as Col,
  Tt as Collapse,
  Rt as CollapseItem,
  Nt as DatePicker,
  Jt as Divider,
  Oe as Drawer,
  la as Empty,
  sa as Form,
  fa as FormItem,
  $a as Image,
  Oa as Input,
  Fa as InputOtp,
  Ia as Link,
  Ao as Message,
  Ae as Modal,
  nn as Pagination,
  sn as Popover,
  dn as PopoverConfirm,
  vn as Radio,
  hn as RadioGroup,
  yn as Rate,
  _n as ResponsiveModal,
  va as Row,
  Tn as Select,
  Ln as Skeleton,
  Mn as SkeletonElement,
  On as Space,
  we as Spin,
  Fe as SpinService,
  Qn as Steps,
  eo as Switch,
  so as Tab,
  oo as TabList,
  ro as TabPanel,
  to as Tabs,
  co as Tag,
  Aa as Textarea,
  uo as Timeline,
  mo as TimelineItem,
  jo as Toast,
  bo as ToastComponent,
  Lo as Tooltip,
  Le as checkboxGroupKey,
  Me as collapseContextKey,
  Fo as default,
  Re as formContextKey,
  Ro as install,
  je as radioGroupKey,
  Pe as rowContextKey,
  Ce as tabsContextKey,
  Ie as timelineContextKey,
  So as useForm,
  Mo as version
};
