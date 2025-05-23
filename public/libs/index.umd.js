(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("react/jsx-runtime"), require("react"), require("@graphiql/react")) : typeof define === "function" && define.amd ? define(["exports", "react/jsx-runtime", "react", "@graphiql/react"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.snippetPlugin = {}, global.jsxRuntime, global.React, global.GraphiQLReact));
})(this, function(exports2, jsxRuntime, React, react) {
  "use strict";
  function _interopNamespaceDefault(e) {
    const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
    if (e) {
      for (const k in e) {
        if (k !== "default") {
          const d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: () => e[k]
          });
        }
      }
    }
    n.default = e;
    return Object.freeze(n);
  }
  const React__namespace = /* @__PURE__ */ _interopNamespaceDefault(React);
  const SnippetContext = react.createNullableContext("SnippetContext");
  function SnippetContextProvider({ editQuery, editVariables, snippetsEndpoint, children }) {
    const [snippets, setSnippets] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    React.useEffect(() => {
      if (!isLoading) {
        return;
      }
      fetch(snippetsEndpoint).then((response) => {
        if (!response.ok) {
          throw new Error("Cannot download snippets.");
        }
        return response.json();
      }).then((data) => setSnippets(data)).catch((error) => console.error(error)).finally(() => setIsLoading(false));
    }, []);
    const items = [];
    for (let snippet of snippets) {
      items.push({
        operationName: snippet.title,
        query: snippet.query,
        variables: snippet.variables
      });
    }
    const value = {
      items,
      editQuery,
      editVariables,
      snippetsEndpoint
    };
    return /* @__PURE__ */ jsxRuntime.jsx(SnippetContext.Provider, { value, children });
  }
  const useSnippetContext = react.createContextHook(SnippetContext);
  function Snippet() {
    const context = useSnippetContext();
    return /* @__PURE__ */ jsxRuntime.jsxs("section", { "aria-label": "Snippet", className: "graphiql-history", children: [
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "graphiql-history-header", children: "Snippet" }),
      /* @__PURE__ */ jsxRuntime.jsx("ul", { className: "graphiql-history-items", children: context?.items.map((item, index) => /* @__PURE__ */ jsxRuntime.jsx(SnippetItem, { item }, `snippet-item-${index}`)) })
    ] });
  }
  function SnippetItem(props) {
    const context = useSnippetContext();
    return /* @__PURE__ */ jsxRuntime.jsx(
      "li",
      {
        onClick: () => {
          context?.editQuery(props.item.query ?? "");
          if (context?.editVariables) {
            context.editVariables(props.item.variables ?? "");
          }
        },
        className: react.cn("graphiql-history-item"),
        children: /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: /* @__PURE__ */ jsxRuntime.jsx(
          react.UnStyledButton,
          {
            type: "button",
            className: "graphiql-history-item-label",
            "aria-label": "Set active",
            children: props.item.operationName
          }
        ) })
      }
    );
  }
  const SvgIcon = (props) => /* @__PURE__ */ React__namespace.createElement("svg", { height: "1em", viewBox: "0 0 20 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props }, /* @__PURE__ */ React__namespace.createElement("title", null, "code snippet document icon"), /* @__PURE__ */ React__namespace.createElement("path", { d: "M0.75 3C0.75 4.24264 1.75736 5.25 3 5.25H17.25M0.75 3C0.75 1.75736 1.75736 0.75 3 0.75H16.25C16.8023 0.75 17.25 1.19772 17.25 1.75V5.25M0.75 3V21C0.75 22.2426 1.75736 23.25 3 23.25H18.25C18.8023 23.25 19.25 22.8023 19.25 22.25V6.25C19.25 5.69771 18.8023 5.25 18.25 5.25H17.25", stroke: "currentColor", strokeWidth: 1.5 }), /* @__PURE__ */ React__namespace.createElement("path", { d: "M7.5 14L5.5 12L7.5 10", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ React__namespace.createElement("path", { d: "M12.5 10L14.5 12L12.5 14", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ React__namespace.createElement("path", { d: "M10 10.5L9 13.5", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" }));
  function snippetPlugin(snippetsEndpoint, setQuery, setVariables) {
    return {
      title: "Snippet",
      icon: () => /* @__PURE__ */ jsxRuntime.jsx(SvgIcon, {}),
      content: () => {
        return /* @__PURE__ */ jsxRuntime.jsx(
          SnippetContextProvider,
          {
            editQuery: setQuery,
            editVariables: setVariables,
            snippetsEndpoint,
            children: /* @__PURE__ */ jsxRuntime.jsx(Snippet, {})
          }
        );
      }
    };
  }
  exports2.Snippet = Snippet;
  exports2.SnippetContext = SnippetContext;
  exports2.SnippetContextProvider = SnippetContextProvider;
  exports2.default = snippetPlugin;
  exports2.useSnippetContext = useSnippetContext;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
//# sourceMappingURL=index.umd.js.map
