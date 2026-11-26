window.__ModuleLoader__.load({id:'@local/dsh-video-generation',factory(require){
var __videoEntry = (() => {
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

  // work/video-plugin/src/client.jsx
  var client_exports = {};
  __export(client_exports, {
    apply: () => apply,
    inject: () => inject
  });
  var import_react = __toESM(__require("react"), 1);
  var import_jsx_runtime = __require("react/jsx-runtime");
  var css = `.dsh-video-settings{max-width:680px;padding:4px 4px 24px;color:var(--dsw-alias-label-primary,#222)}.dsh-video-settings h2{font-size:23px;margin:0 0 8px}.dsh-video-settings p{font-size:13px;line-height:1.5;color:var(--dsw-alias-label-caption,#777)}.dsh-video-settings label{display:block;font-weight:600;margin:22px 0 8px}.dsh-video-settings select{max-width:100%;padding:10px;border:1px solid #8886;border-radius:10px;background:var(--dsw-alias-bg-base,#fff);color:inherit;font:inherit}.dsh-video-list{display:flex;flex-wrap:wrap;gap:12px;margin:12px 0 16px}.dsh-video-card{margin:0;width:min(100%,600px);color:var(--dsw-alias-label-primary,#222);font:13px system-ui}.dsh-video-card video{width:100%;max-height:640px;display:block;border-radius:16px;background:#111}.dsh-video-card figcaption{display:flex;justify-content:space-between;align-items:center;margin-top:8px;color:var(--dsw-alias-label-caption,#777)}.dsh-video-card a{color:inherit;text-decoration:none;border:1px solid #8885;padding:7px 11px;border-radius:9px}.dsh-video-progress{color:var(--dsw-alias-label-caption,#777);font-size:13px}`;
  function Settings() {
    const [value, setValue] = import_react.default.useState({ resolution: "480p", duration: 5 }), [status, setStatus] = import_react.default.useState("");
    import_react.default.useEffect(() => {
      fetch("/dsh-video/settings").then((r) => r.json()).then(setValue).catch(() => setStatus("Could not load settings."));
    }, []);
    const save = async (next) => {
      try {
        setStatus("Saving\u2026");
        const r = await fetch("/dsh-video/settings", { method: "POST", headers: { "content-type": "application/json", "x-dsh-videos": "1" }, body: JSON.stringify(next) });
        const v = await r.json();
        if (!r.ok) throw Error(v.error);
        setValue(next);
        setStatus("Saved");
      } catch (e) {
        setStatus(e.message || "Could not save settings.");
      }
    };
    const estimate = (value.duration * (value.resolution === "480p" ? 0.05 : value.resolution === "720p" ? 0.1 : 0.2)).toFixed(2);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-video-settings", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: css }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Video generation" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Alibaba Wan 3.0 generates short videos with audio via OpenRouter. Prices can change." }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { htmlFor: "dsh-video-resolution", children: "Resolution" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { id: "dsh-video-resolution", value: value.resolution, onChange: (e) => save({ ...value, resolution: e.target.value }), children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "480p", children: "480p \xB7 approximately US $0.05 per second" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "720p", children: "720p \xB7 approximately US $0.10 per second" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "1080p", children: "1080p \xB7 approximately US $0.20 per second" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { htmlFor: "dsh-video-duration", children: "Default video length" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", { id: "dsh-video-duration", value: value.duration, onChange: (e) => save({ ...value, duration: Number(e.target.value) }), children: Array.from({ length: 29 }, (_, i) => i + 2).map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", { value: n, children: [
        n,
        " seconds"
      ] }, n)) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
        "Estimated cost at these settings: US $",
        estimate,
        " per video. Stopping after submission may not prevent a charge."
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { role: "status", children: status })
    ] });
  }
  function Icon() {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-hidden": "true", children: "\u25B7" });
  }
  function validVideo(meta) {
    return meta && typeof meta.file === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.mp4$/.test(meta.file);
  }
  function ToolView({ phase, block }) {
    if (phase !== "result") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-video-progress", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: css }),
      "Creating video\u2026 This can take a few minutes."
    ] });
    if (block?.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dsh-video-progress", children: block?.content?.find((x) => x.type === "text")?.text || "Could not create the video." });
    return null;
  }
  function VideosInChat({ turn }) {
    const videos = turn.data.get("dsh-generated-videos") || [];
    if (!videos.length) return null;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-video-list", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: css }),
      videos.filter(validVideo).map((meta) => {
        const url = `/dsh-video/file?id=${encodeURIComponent(meta.file)}`;
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", { className: "dsh-video-card", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", { controls: true, playsInline: true, preload: "metadata", src: url, "aria-label": "Generated video" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Generated video" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", { href: url, download: meta.file, "aria-label": "Save video", children: [
              "\u2193 ",
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Save" })
            ] })
          ] })
        ] }, meta.file);
      })
    ] });
  }
  var definition = { kind: "dsh-generated-videos", match: (event) => {
    if (event.type === "turn/start") return { id: String(event.data.turn), role: "start" };
    if (event.type === "tool/call" && event.data.name === "generate_video") return { id: String(event.data.turn), role: "update" };
    if (event.type === "tool/result" && event.surfaceOp === "append") return { id: String(event.data.turn), role: "update" };
    return null;
  }, start: (_context, match) => ({ turn: match.event.data.turn, calls: /* @__PURE__ */ new Set(), videos: [] }), update: (context, match) => {
    if (match.event.type === "tool/call") {
      const calls = new Set(context.state.calls);
      calls.add(String(match.event.data.callId));
      return { ...context.state, calls };
    }
    const d = match.event.data;
    if (d.message?.isError || !context.state.calls.has(String(d.message?.source?.callId)) || !validVideo(d.meta)) return context.state;
    if (context.state.videos.some((x) => x.file === d.meta.file)) return context.state;
    return { ...context.state, videos: [...context.state.videos, d.meta] };
  }, buildLocationData: (context, scope, previous) => {
    if (scope !== "turn" || !context.state) return null;
    if (previous?.kind === "turn" && previous.turn === context.state.turn && previous.key === "dsh-generated-videos" && previous.value === context.state.videos) return previous;
    return { kind: "turn", turn: context.state.turn, key: "dsh-generated-videos", value: context.state.videos };
  } };
  var inject = ["slots", "uiConversation"];
  function apply(ctx) {
    ctx.uiConversation.events.register(definition);
    ctx.slots.inject("conversation.chat.turnTail", () => ctx.slots.register({ name: "conversation.chat.turnTail", id: "dsh-generated-videos", order: 11 }, VideosInChat));
    ctx.slots.inject("tool.call.toolview", () => ctx.slots.register({ name: "tool.call.toolview", key: "generate_video" }, ToolView));
    ctx.slots.inject("settings.section", () => ctx.slots.register({ name: "settings.section", id: "dsh-videos", order: 14, label: () => "Videos" }, Settings));
    ctx.slots.inject("settings.section.icon", () => ctx.slots.register({ name: "settings.section.icon", id: "dsh-videos" }, Icon));
  }
  return __toCommonJS(client_exports);
})();

return __videoEntry || {};
}});
