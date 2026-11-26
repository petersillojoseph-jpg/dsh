window.__ModuleLoader__.load({id:'@local/dsh-speech-generation',factory(require){
var __speechEntry = (() => {
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

  // work/speech-plugin/src/client.jsx
  var client_exports = {};
  __export(client_exports, {
    apply: () => apply,
    inject: () => inject
  });
  var import_react = __toESM(__require("react"), 1);
  var import_jsx_runtime = __require("react/jsx-runtime");
  var css = `.dsh-speech-list{display:flex;flex-wrap:wrap;gap:12px;margin:12px 0 16px}.dsh-speech-card{margin:0;padding:16px;width:min(100%,480px);box-sizing:border-box;border:1px solid #8884;border-radius:16px;background:var(--dsw-alias-bg-base,#fff);color:var(--dsw-alias-label-primary,#222);font:13px system-ui}.dsh-speech-card audio{width:100%;display:block}.dsh-speech-card figcaption{display:flex;justify-content:space-between;align-items:center;margin-top:12px;color:var(--dsw-alias-label-caption,#777)}.dsh-speech-card a{color:inherit;text-decoration:none;border:1px solid #8885;padding:7px 11px;border-radius:9px}.dsh-speech-progress{color:var(--dsw-alias-label-caption,#777);font-size:13px}`;
  function valid(meta) {
    return meta && typeof meta.file === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.mp3$/.test(meta.file);
  }
  function ToolView({ phase, block }) {
    if (phase !== "result") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-speech-progress", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: css }),
      "Creating speech\u2026"
    ] });
    if (block?.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dsh-speech-progress", children: block?.content?.find((x) => x.type === "text")?.text || "Could not create speech." });
    return null;
  }
  function AudioInChat({ turn }) {
    const items = turn.data.get("dsh-generated-audio") || [];
    if (!items.length) return null;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-speech-list", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: css }),
      items.filter(valid).map((meta) => {
        const url = `/grokbot/api/media/file?type=audio&id=${encodeURIComponent(meta.file)}`;
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", { className: "dsh-speech-card", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", { controls: true, preload: "metadata", src: url, "aria-label": "Generated speech" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Generated speech" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: url, download: meta.file, "aria-label": "Save audio", children: "\u2193 Save" })
          ] })
        ] }, meta.file);
      })
    ] });
  }
  var definition = { kind: "dsh-generated-audio", match: (event) => {
    if (event.type === "turn/start") return { id: String(event.data.turn), role: "start" };
    if (event.type === "tool/call" && event.data.name === "generate_speech") return { id: String(event.data.turn), role: "update" };
    if (event.type === "tool/result" && event.surfaceOp === "append") return { id: String(event.data.turn), role: "update" };
    return null;
  }, start: (_context, match) => ({ turn: match.event.data.turn, calls: /* @__PURE__ */ new Set(), items: [] }), update: (context, match) => {
    if (match.event.type === "tool/call") {
      const calls = new Set(context.state.calls);
      calls.add(String(match.event.data.callId));
      return { ...context.state, calls };
    }
    const d = match.event.data;
    if (d.message?.isError || !context.state.calls.has(String(d.message?.source?.callId)) || !valid(d.meta) || context.state.items.some((x) => x.file === d.meta.file)) return context.state;
    return { ...context.state, items: [...context.state.items, d.meta] };
  }, buildLocationData: (context, scope, previous) => {
    if (scope !== "turn" || !context.state) return null;
    if (previous?.kind === "turn" && previous.turn === context.state.turn && previous.key === "dsh-generated-audio" && previous.value === context.state.items) return previous;
    return { kind: "turn", turn: context.state.turn, key: "dsh-generated-audio", value: context.state.items };
  } };
  var inject = ["slots", "uiConversation"];
  function apply(ctx) {
    ctx.uiConversation.events.register(definition);
    ctx.slots.inject("conversation.chat.turnTail", () => ctx.slots.register({ name: "conversation.chat.turnTail", id: "dsh-generated-audio", order: 12 }, AudioInChat));
    ctx.slots.inject("tool.call.toolview", () => ctx.slots.register({ name: "tool.call.toolview", key: "generate_speech" }, ToolView));
  }
  return __toCommonJS(client_exports);
})();

return __speechEntry || {};
}});
