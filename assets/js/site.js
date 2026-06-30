/* =============================================================
   site.js · 全站共享脚本
   职责:从单一"页面清单"注入页眉/导航/页脚 + 上下篇,
        并提供阅读进度条、滚动揭示、数字滚动等通用交互。
   关键:不使用 fetch —— 因此 file:// 双击打开与 GitHub Pages 行为一致。
   用法:每页 <body data-page="index">,在 </body> 前 <script defer src=".../site.js">
   ============================================================= */
(function () {
  "use strict";

  /* —— 唯一事实来源:10 叙事板块 + 数据说明页 —— */
  var PAGES = [
    { id: "index",     file: "index.html",     no: "01", nav: "没处运动", kicker: "人均3㎡，为什么还是\"没处运动？\"" },
    { id: "growth",    file: "growth.html",    no: "02", nav: "十年成就", kicker: "十年，成就是真的" },
    { id: "map",       file: "map.html",       no: "03", nav: "省域地图", kicker: "3.0㎡摊在地图上，是另一副样子" },
    { id: "region",    file: "region.html",    no: "04", nav: "区域真相",   kicker: "\"东西差距\"，其实没那么深" },
    { id: "structure", file: "structure.html", no: "05", nav: "场地归属", kicker: "42亿㎡，为什么没到我们家门口？" },
    { id: "soft",      file: "soft.html",      no: "06", nav: "软硬之间",   kicker: "有了场地，就会练了吗？" },
    { id: "people",    file: "people.html",    no: "07", nav: "3㎡的背面",   kicker: "被\"平均\"藏起来的人" },
    { id: "case",      file: "case.html",      no: "08", nav: "两个极端",   kicker: "同一年，两个省的两种日常" },
    { id: "promise",   file: "promise.html",   no: "09", nav: "最后一公里", kicker: "量出来的最后一公里" },
    { id: "next",      file: "next.html",      no: "10", nav: "到家门口", kicker: "数量过了关，均衡是下一关" },
    { id: "method",    file: "method.html",    no: "—",  nav: "数据说明", kicker: "附：数据说明与 AI 使用披露" }
  ];

  var BRAND = "全民健身";
  var BRAND_SUB = "3㎡之后，\"平均\"往哪匀？";
  /* —— 以下三项请填写为你们自己的信息(改这里即可,全站页脚同步) —— */
  var TEAM = "匀动 · 全民健身数据小组";
  var FT_ORG = "RPI/三峡大学/上海政法学院";
  var FT_EMAIL = "3272839624@qq.com";

  // 各页可取用:页内右上角小标题(叙事副题)
  window.PAGE_KICKER = (function () {
    var m = {}; PAGES.forEach(function (p) { m[p.id] = p.kicker; }); return m;
  })();

  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    if (attrs) for (var k in attrs) { if (attrs[k] != null) n.setAttribute(k, attrs[k]); }
    if (html != null) n.innerHTML = html;
    return n;
  }

  function currentId() {
    return document.body.getAttribute("data-page") || "index";
  }

  /* —— 1. 进度条 —— */
  function buildProgress() {
    var bar = el("div", { class: "read-progress", role: "presentation" });
    document.body.insertBefore(bar, document.body.firstChild);
    var ticking = false;
    function update() {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
      bar.style.width = pct.toFixed(2) + "%";
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* —— 2. 页眉 + 导航 —— */
  function buildHeader() {
    var cur = currentId();
    var header = el("header", { class: "site-header" });
    var inner = el("div", { class: "site-header__inner" });

    var brand = el("a", { class: "brand", href: "index.html", "aria-label": BRAND + "·" + BRAND_SUB });
    brand.appendChild(el("span", { class: "brand__mark", "aria-hidden": "true" }));
    brand.appendChild(el("span", { class: "brand__name" }, BRAND));

    var nav = el("nav", { class: "nav", id: "site-nav", "aria-label": "板块导航" });
    PAGES.forEach(function (p) {
      var a = el("a", { class: "nav__link", href: p.file });
      if (p.id === cur) a.setAttribute("aria-current", "page");
      a.innerHTML = '<span class="nav__no">' + p.no + '</span><span>' + p.nav + "</span>";
      nav.appendChild(a);
    });

    var toggle = el("button", {
      class: "nav-toggle", type: "button",
      "aria-label": "打开导航菜单", "aria-expanded": "false", "aria-controls": "site-nav"
    }, '<span class="nav-toggle__bars" aria-hidden="true"></span>');

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "关闭导航菜单" : "打开导航菜单");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) toggle.click();
    });

    inner.appendChild(brand);
    inner.appendChild(nav);
    inner.appendChild(toggle);
    header.appendChild(inner);
    document.body.insertBefore(header, document.body.children[1] || null);
  }

  /* —— 3. 上一篇 / 下一篇 + 页脚 —— */
  function buildFooter() {
    var cur = currentId();
    var idx = PAGES.findIndex(function (p) { return p.id === cur; });
    var prev = idx > 0 ? PAGES[idx - 1] : null;
    var next = idx >= 0 && idx < PAGES.length - 1 ? PAGES[idx + 1] : null;

    var main = document.querySelector("main") || document.body;

    var pager = el("nav", { class: "pager container", "aria-label": "顺序阅读" });
    pager.appendChild(prev
      ? el("a", { class: "pager__link", href: prev.file },
          '<span class="pager__dir">← 上一篇</span><span class="pager__title">' +
          '<span class="num-tag">' + prev.no + "</span>" + prev.kicker + "</span>")
      : el("span", { class: "pager__link pager__link--disabled" }));
    pager.appendChild(next
      ? el("a", { class: "pager__link pager__link--next", href: next.file },
          '<span class="pager__dir">下一篇 →</span><span class="pager__title">' +
          next.kicker + '<span class="num-tag">' + next.no + "</span></span>")
      : el("span", { class: "pager__link pager__link--disabled" }));

    var IC = {
      mail: '<svg class="ft-ic" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="M3.5 7l8.5 6 8.5-6"></path></svg>',
      org:  '<svg class="ft-ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 21V5l8-2 8 2v16"></path><path d="M2.5 21h19"></path><path d="M9.5 21v-4h5v4"></path></svg>',
      team: '<svg class="ft-ic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3"></circle><path d="M3.5 20c0-3 2.5-5.5 5.5-5.5S14.5 17 14.5 20"></path><path d="M16 6.2a3 3 0 0 1 0 6"></path><path d="M20.5 20c0-2.4-1.5-4.4-3.6-5.2"></path></svg>'
    };
    var footer = el("footer", { class: "site-footer" });
    var fInner = el("div", { class: "site-footer__inner container" });
    fInner.appendChild(el("div", { class: "ft-col ft-col--brand" },
      '<div class="ft-brand">《' + BRAND + '》</div>' +
      '<p class="ft-tagline">' + BRAND_SUB + '</p>' +
      '<p class="ft-note">中国数据新闻大赛 · AIGC 应用大赛参赛作品</p>'));
    fInner.appendChild(el("div", { class: "ft-col" },
      '<h4 class="ft-h">数据与声明</h4>' +
      '<p class="ft-text">数据均来自官方公开来源，经人工逐条核对。图表自制 · 无个人隐私数据。</p>' +
      '<p class="ft-text"><a href="method.html">查看数据说明与 AI 使用披露 →</a></p>'));
    fInner.appendChild(el("div", { class: "ft-col" },
      '<h4 class="ft-h">联系我们</h4>' +
      '<ul class="ft-contact">' +
        '<li>' + IC.team + '<span>' + TEAM + '</span></li>' +
        '<li>' + IC.org + '<span>' + FT_ORG + '</span></li>' +
        '<li>' + IC.mail + '<a href="mailto:' + FT_EMAIL + '">' + FT_EMAIL + '</a></li>' +
      '</ul>'));
    footer.appendChild(fInner);

    var fBar = el("div", { class: "site-footer__bar" });
    fBar.appendChild(el("div", { class: "container ft-bar__inner" },
      '<span>© 2026 <span class="ft-team__name">' + TEAM + '</span> · 保留所有权利</span>' +
      '<span class="ft-bar__sub">数据来自官方公开来源，经人工逐条核对；图表自制，无个人隐私数据。</span>'));
    footer.appendChild(fBar);

    main.insertAdjacentElement("afterend", pager);
    pager.insertAdjacentElement("afterend", footer);
  }

  /* —— 4. 滚动揭示 —— */
  function buildReveal() {
    var items = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window) || !items.length) {
      items.forEach(function (n) { n.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (n) { io.observe(n); });
  }

  /* —— 5. 数字滚动计数 —— [data-count] 目标值,可选 data-decimals / data-suffix —— */
  function buildCounters() {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var nodes = document.querySelectorAll("[data-count]");
    function run(node) {
      var target = parseFloat(node.getAttribute("data-count"));
      var dec = parseInt(node.getAttribute("data-decimals") || "0", 10);
      var suffix = node.getAttribute("data-suffix") || "";
      if (reduce || isNaN(target)) { node.textContent = target.toFixed(dec) + suffix; return; }
      var dur = 1300, start = null;
      function step(ts) {
        if (!start) start = ts;
        var t = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - t, 3);
        node.textContent = (target * eased).toFixed(dec) + suffix;
        if (t < 1) requestAnimationFrame(step);
        else node.textContent = target.toFixed(dec) + suffix;
      }
      requestAnimationFrame(step);
    }
    if (!("IntersectionObserver" in window)) { nodes.forEach(run); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { run(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    nodes.forEach(function (n) { io.observe(n); });
  }

  function init() {
    buildProgress();
    buildHeader();
    buildFooter();
    buildReveal();
    buildCounters();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
