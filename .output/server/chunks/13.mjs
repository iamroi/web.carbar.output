const id = 13;
const ids = [13];
const modules = {

/***/ 13:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ search)
});

// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(609);
// EXTERNAL MODULE: ./node_modules/nuxt3/dist/app/index.mjs + 12 modules
var app = __webpack_require__(830);
// EXTERNAL MODULE: external "vue/server-renderer"
var server_renderer_ = __webpack_require__(344);
// EXTERNAL MODULE: ./components/breadcrumbs/Breadcrumb.vue + 2 modules
var Breadcrumb = __webpack_require__(135);
// EXTERNAL MODULE: ./components/product-catalog/RemoveFilterCloud.vue + 5 modules
var RemoveFilterCloud = __webpack_require__(684);
// EXTERNAL MODULE: ./components/product-catalog/FiltersAside.vue + 30 modules
var FiltersAside = __webpack_require__(679);
// EXTERNAL MODULE: ./components/product-catalog/FilterResults.vue + 22 modules
var FilterResults = __webpack_require__(952);
// EXTERNAL MODULE: ./components/product-catalog/NoResults.vue + 2 modules
var NoResults = __webpack_require__(386);
// EXTERNAL MODULE: ./components/dropdowns/Dropdown.vue + 2 modules
var Dropdown = __webpack_require__(118);
// EXTERNAL MODULE: ./components/links/Link.vue + 2 modules
var Link = __webpack_require__(398);
// EXTERNAL MODULE: external "lodash-es"
var external_lodash_es_ = __webpack_require__(352);
// EXTERNAL MODULE: external "qs"
var external_qs_ = __webpack_require__(938);
// EXTERNAL MODULE: ./stores/product-catalog.js + 2 modules
var product_catalog = __webpack_require__(196);
// EXTERNAL MODULE: external "consola"
var external_consola_ = __webpack_require__(889);















/* harmony default export */ const searchvue_type_script_setup_true_lang_js = ({
  __ssrInlineRender: true,
  props: {
    response: {
      type: Object
    }
  },
  emits: ["click"],
  setup(__props, { emit }) {
    const productCatalog = (0, product_catalog/* useProductCatalog */.M)();
    (0, app/* useRouter */.tv)();
    const route = (0, app/* useRoute */.yj)();
    const crumbs = [
      {
        title: "Home",
        url: "/"
      },
      {
        title: "Cars"
      }
    ];
    const facets = (0, external_vue_.computed)(() => productCatalog.facets);
    const filters = (0, external_vue_.computed)(() => productCatalog.filters);
    const sortByOptions = (0, external_vue_.computed)(() => productCatalog.facets.sortBy);
    const activeSortBySlug = (0, external_vue_.computed)(() => productCatalog.filters.sortBy);
    const activeSortBy = (0, external_vue_.computed)(() => (0, external_lodash_es_.find)(sortByOptions.value, (item) => item.slug === activeSortBySlug.value));
    const pagination = (0, external_vue_.computed)(() => productCatalog.productsPagination);
    (0, external_vue_.computed)(() => productCatalog.isInitialPageLoaded);
    const currentQuery = (0, external_vue_.computed)(() => productCatalog.getCurrentQuery);
    const mounted = (0, external_vue_.ref)(false);
    (0, external_vue_.watch)(filters, async (newValue, oldValue) => {
      if (!mounted.value)
        return;
      await onFiltersChange();
    }, {
      deep: true
    });
    (0, external_vue_.watch)(() => pagination.value.current, async (newValue, oldValue) => {
      if (!mounted.value)
        return;
      await onFiltersChange();
    });
    (0, external_vue_.onServerPrefetch)(async () => {
      external_consola_["default"].info("onServerPrefetch");
      await initFiltersFromUrl();
      await filter();
    });
    (0, external_vue_.onMounted)(async () => {
      external_consola_["default"].log("onMounted");
      if (facets.value.bodyTypes.length === 0) {
        external_consola_["default"].warn(`Server side fetch failed. Fetching on the client side`);
        await filter();
      }
      mounted.value = true;
    });
    const initFiltersFromUrl = async () => {
      let queryParams = external_qs_["default"].parse(route.query);
      if (!queryParams.filter)
        return;
      let urlFilters = {};
      for (const [key, item] of Object.entries(queryParams.filter)) {
        if (!facets.value[key]) {
          continue;
        }
        let values = item;
        if (Array.isArray(filters.value[key])) {
          values = item.split(",");
        }
        urlFilters[key] = values;
      }
      await productCatalog.updateFilters(urlFilters);
    };
    const onFiltersChange = async () => {
      await productCatalog.setFilteringState(true);
      const query = currentQuery.value;
      query._builder.query();
      await filterDebounced();
      pushHistoryState();
    };
    const pushHistoryState = () => {
      return;
    };
    const filter = async () => {
      await productCatalog.filter({});
    };
    const filterDebounced = (0, external_lodash_es_.debounce)(async () => {
      console.info("initiating filter");
      await filter();
    }, 500, {
      leading: false,
      trailing: true
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${(0, server_renderer_.ssrRenderAttrs)((0, external_vue_.mergeProps)({ class: "py-6 lg:py-8" }, _attrs))}><div class="container flex"><div class="w-3/12">`);
      _push((0, server_renderer_.ssrRenderComponent)(FiltersAside/* default */.Z, { class: "pr-14" }, null, _parent));
      _push(`</div><div class="w-9/12"><div class="flex flex-col pb-8 border-b border-gray-300">`);
      _push((0, server_renderer_.ssrRenderComponent)(Breadcrumb/* default */.Z, { crumbs }, null, _parent));
      _push(`<h1 class="mt-5 mb-0">Car subscriptions</h1>`);
      _push((0, server_renderer_.ssrRenderComponent)(RemoveFilterCloud/* default */.Z, { class: "mt-5" }, null, _parent));
      _push(`</div><div class="flex flex-col mt-6"><div class="flex justify-end"><div class="flex gap-x-6">`);
      if ((0, external_vue_.unref)(pagination).total !== null) {
        _push(`<span class="font-bold">${(0, server_renderer_.ssrInterpolate)((0, external_vue_.unref)(pagination).total)} cars</span>`);
      } else {
        _push(`<!---->`);
      }
      _push((0, server_renderer_.ssrRenderComponent)(Dropdown/* default */.Z, {
        label: "Select an item",
        position: `left`,
        "menu-items": (0, external_vue_.unref)(sortByOptions)
      }, {
        "menu-button": (0, external_vue_.withCtx)((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex"${_scopeId}><span class="font-medium"${_scopeId}>Sort by:\xA0\xA0</span>`);
            _push2((0, server_renderer_.ssrRenderComponent)(Link/* default */.Z, null, {
              default: (0, external_vue_.withCtx)((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${(0, server_renderer_.ssrInterpolate)((0, external_vue_.unref)(activeSortBy).label)}`);
                } else {
                  return [
                    (0, external_vue_.createTextVNode)((0, external_vue_.toDisplayString)((0, external_vue_.unref)(activeSortBy).label), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              (0, external_vue_.createVNode)("div", { class: "flex" }, [
                (0, external_vue_.createVNode)("span", { class: "font-medium" }, "Sort by:\xA0\xA0"),
                (0, external_vue_.createVNode)(Link/* default */.Z, null, {
                  default: (0, external_vue_.withCtx)(() => [
                    (0, external_vue_.createTextVNode)((0, external_vue_.toDisplayString)((0, external_vue_.unref)(activeSortBy).label), 1)
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="mt-6">`);
      _push((0, server_renderer_.ssrRenderComponent)(FilterResults/* default */.Z, null, null, _parent));
      if ((0, external_vue_.unref)(pagination).total === 0 || 1) {
        _push((0, server_renderer_.ssrRenderComponent)(NoResults/* default */.Z, null, null, _parent));
      }
      _push(`</div></div></div></div></div>`);
    };
  }
});



const __exports__ = searchvue_type_script_setup_true_lang_js;

/* harmony default export */ const search = (__exports__);

/***/ })

};

export { id, ids, modules };
