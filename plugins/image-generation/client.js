window.__ModuleLoader__.load({id:'@local/dsh-image-generation',factory(require){
var __imageEntry = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // work/image-plugin/src/client.jsx
  var client_exports = {};
  __export(client_exports, {
    apply: () => apply,
    inject: () => inject
  });
  var import_react = __toESM(__require("react"), 1);
  var import_jsx_runtime = __require("react/jsx-runtime");
  var models = [
    ["bytedance-seed/seedream-5-0-flash", "Seedream 5.0 Flash", "About US $0.018 per image"],
    ["openai/gpt-image-2.5-flare", "GPT Image 2.5 Flare", "Price varies with quality and request"],
    ["google/gemini-3.1-flash-image", "Nano Banana 2", "Price varies with resolution and request"]
  ];
  function ImageSettings() {
    const [model, setModel] = import_react.default.useState(models[0][0]), [status, setStatus] = import_react.default.useState("");
    import_react.default.useEffect(() => {
      fetch("/dsh-image/settings").then((r) => r.json()).then((d) => setModel(d.model)).catch(() => setStatus("Could not load image settings."));
    }, []);
    const change = async (e) => {
      const next = e.target.value;
      try {
        setStatus("Saving\u2026");
        const r = await fetch("/dsh-image/settings", { method: "POST", headers: { "content-type": "application/json", "x-dsh-images": "1" }, body: JSON.stringify({ model: next }) });
        const d = await r.json();
        if (!r.ok) throw Error(d.error);
        setModel(next);
        setStatus("Saved");
      } catch (e2) {
        setStatus(e2.message || "Could not save settings.");
      }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-image-settings", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: css }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Image generation" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "When you ask dsh to create an image, it uses your OpenRouter account. Each image is billed by OpenRouter." }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { htmlFor: "dsh-image-model", children: "Image model" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", { id: "dsh-image-model", value: model, onChange: change, children: models.map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: id, children: label }, id)) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
        models.find((x) => x[0] === model)?.[2],
        ". Prices can change."
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { role: "status", children: status })
    ] });
  }
  function ImageIcon() {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-hidden": "true", children: "\u25C8" });
  }
  function validImage(meta) {
    return meta && typeof meta.file === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.(png|jpg|webp)$/.test(meta.file);
  }
  function ImageToolView({ phase, block }) {
    if (phase !== "result") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dsh-image-progress", children: "Creating image\u2026" });
    if (block?.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dsh-image-progress", children: block?.content?.find((x) => x.type === "text")?.text || "Could not create the image." });
    return null;
  }
  function ImagesInChat({ turn }) {
    const images = turn.data.get("dsh-generated-images") || [];
    if (!images.length) return null;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-images-in-chat", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: css }),
      images.filter(validImage).map((meta) => {
        const url = `/dsh-image/file?id=${encodeURIComponent(meta.file)}`;
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", { className: "dsh-image-card", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { src: url, alt: "Generated image", loading: "lazy" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Generated image" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", { href: url, download: meta.file, "aria-label": "Save image", title: "Save image", children: [
              "\u2193 ",
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Save" })
            ] })
          ] })
        ] }, meta.file);
      })
    ] });
  }
  var imagesDefinition = {
    kind: "dsh-generated-images",
    match: (event) => {
      if (event.type === "turn/start") return { id: String(event.data.turn), role: "start" };
      if (event.type === "tool/call" && ["generate_image", "edit_image"].includes(event.data.name)) return { id: String(event.data.turn), role: "update" };
      if (event.type === "tool/result" && event.surfaceOp === "append") return { id: String(event.data.turn), role: "update" };
      return null;
    },
    start: (_context, match) => ({ turn: match.event.data.turn, calls: /* @__PURE__ */ new Set(), images: [] }),
    update: (context, match) => {
      if (match.event.type === "tool/call") {
        const calls = new Set(context.state.calls);
        calls.add(String(match.event.data.callId));
        return { ...context.state, calls };
      }
      const data = match.event.data;
      if (data.message?.isError || !context.state.calls.has(String(data.message?.source?.callId)) || !validImage(data.meta)) return context.state;
      if (context.state.images.some((item) => item.file === data.meta.file)) return context.state;
      return { ...context.state, images: [...context.state.images, data.meta] };
    },
    buildLocationData: (context, scope, previous) => {
      if (scope !== "turn" || !context.state) return null;
      if (previous?.kind === "turn" && previous.turn === context.state.turn && previous.key === "dsh-generated-images" && previous.value === context.state.images) return previous;
      return { kind: "turn", turn: context.state.turn, key: "dsh-generated-images", value: context.state.images };
    }
  };
  var css = `.dsh-image-settings{max-width:680px;padding:4px 4px 24px;color:var(--dsw-alias-label-primary,#222)}.dsh-image-settings h2{font-size:23px;margin:0 0 8px}.dsh-image-settings p{font-size:13px;line-height:1.5;color:var(--dsw-alias-label-caption,#777)}.dsh-image-settings label{display:block;font-weight:600;margin:24px 0 8px}.dsh-image-settings select{max-width:100%;padding:10px;border:1px solid #8886;border-radius:10px;background:var(--dsw-alias-bg-base,#fff);color:inherit;font:inherit}.dsh-images-in-chat{display:flex;flex-wrap:wrap;gap:12px;margin:12px 0 16px}.dsh-image-card{position:relative;margin:0;width:min(100%,512px);color:var(--dsw-alias-label-primary,#222);font:13px system-ui}.dsh-image-card img{width:100%;height:auto;max-height:640px;object-fit:contain;display:block;border-radius:16px}.dsh-image-card figcaption{display:flex;justify-content:space-between;align-items:center;margin-top:8px;color:var(--dsw-alias-label-caption,#777)}.dsh-image-card figcaption a{color:inherit;text-decoration:none;border:1px solid #8885;padding:7px 11px;border-radius:9px}.dsh-image-progress{color:var(--dsw-alias-label-caption,#777);font-size:13px}`;
  var inject = ["slots", "uiConversation"];
  function apply(ctx) {
    ctx.uiConversation.events.register(imagesDefinition);
    ctx.slots.inject("conversation.chat.turnTail", () => ctx.slots.register({ name: "conversation.chat.turnTail", id: "dsh-generated-images", order: 10 }, ImagesInChat));
    ctx.slots.inject("tool.call.toolview", () => ctx.slots.register({ name: "tool.call.toolview", key: "generate_image" }, ImageToolView));
    ctx.slots.inject("tool.call.toolview", () => ctx.slots.register({ name: "tool.call.toolview", key: "edit_image" }, ImageToolView));
    ctx.slots.inject("settings.section", () => ctx.slots.register({ name: "settings.section", id: "dsh-images", order: 13, label: () => "Images" }, ImageSettings));
    ctx.slots.inject("settings.section.icon", () => ctx.slots.register({ name: "settings.section.icon", id: "dsh-images" }, ImageIcon));
  }
  return __toCommonJS(client_exports);
})();

return __imageEntry || {};
}});
