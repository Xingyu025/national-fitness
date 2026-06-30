# 全民健身 · 前端工程说明

静态多页数据新闻网页。**全程不使用 `fetch`**，因此双击 `index.html`（`file://`）与部署到
GitHub Pages（`http://`）表现完全一致——这是为了同时满足"双击浏览"和"在线预览"两种模式。

## 目录结构

```
fitness-circle/
├─ index.html              引子·没处运动？（已完成）
├─ growth.html …           其余 9 个叙事板块（已完成）
├─ method.html             数据说明页（已完成）
├─ README.md
└─ assets/
   ├─ css/style.css        全局样式 + 设计令牌（唯一样式来源）
   ├─ js/
   │  ├─ site.js           注入页眉/导航/页脚 + 上下篇 + 进度条 + 滚动揭示 + 数字滚动
   │  ├─ chart-theme.js    全站统一 ECharts 主题（主题名 "fitness"）
   │  ├─ echarts.min.js    ECharts 库，本地引用
   │  └─ china.js          合规中国地图 GeoJSON，详见下
   ├─ fonts/               
   ├─ data/                各页数据，以 JS 全局变量形式
   └─ img/                 AI生成/已授权图片
```

## 框架如何工作

- **导航是单一事实来源。** 11 个板块全部定义在 `site.js` 的 `PAGES` 数组里。增删板块、改名、改顺序只动这一处，所有页面的导航条、汉堡菜单、"上一篇/下一篇"自动更新。
- **每个 HTML 页只需三件事**：① `<body data-page="xxx">` 标明自己是哪页（用于高亮）；② `<link>` 引入 `style.css`；③ `</body>` 前 `<script defer src="assets/js/site.js">`。页眉、导航、页脚、翻页器都由脚本注入，无需在每页重复粘贴。
- **正文写在 `<main id="main">` 内**，翻页器和页脚会自动插到 `<main>` 之后。

## 加数据 / 字体 / 地图的方式（务必遵守，以保 `file://` 可跑）

**数据**：每页一个 JS 文件，把数据挂到全局变量，再在该页 `<script>` 里直接用。不要用 `fetch` 读 JSON。
```html
<!-- assets/data/map-data.js -->
<script>window.MAP_DATA = [{ name: "江苏", value: 4.32 }, /* …31 省… */];</script>
```

**地图 GeoJSON（合规硬红线）**：从阿里 DataV.GeoAtlas 下载含南海诸岛/九段线/完整国界的 `china.json`，
包成 `assets/js/china.js`，在文件里调用 `echarts.registerMap("china", {...})`。
```js
// assets/js/china.js  （把下载的 GeoJSON 粘进 GEO 对象）
(function(){ var GEO = /* 粘贴 china.json 内容 */; echarts.registerMap("china", GEO); })();
```
> 引入顺序固定：`echarts.min.js` → `chart-theme.js` → `china.js` → 本页绘图脚本。

## 部署

- **GitHub Pages**：把 `natinal-fitness/` 内的文件推到仓库 → Settings → Pages → 选 `main` 分支根目录 → 得到在线链接。
- **百度网盘**：直接把 `national-fitness/` 整个文件夹压缩成 zip 上传。解压后双击 `index.html` 即可（离线可跑）。

## 当前进度

- ✅ 公共框架（`style.css` / `site.js` / `chart-theme.js`）
- ✅ `index.html` 没处运动（新闻标题 + 媒体背景 Hero，待嵌入 AI 短视频）
- ✅ `map.html` 省域地图（ECharts 分省填色 + CSS 排行条；数据 `assets/data/map-data.js`、合规底图 `assets/js/china.js` 已接入）
- ✅ `growth.html` 十年成就（2019–2024 折线 + 长历史里程碑 + 步道亮点 + 目标卡；数据 `assets/data/growth-data.js`）
- ✅ `region.html` 区域真相（官方四大区分组柱状 + 内部区间条；数据 `assets/data/regional-data.js`）
- ✅ `structure.html` 场地归属·题眼（全国构成堆叠条 + 沈阳权属桑基图 + 开放率温度计；数据 `assets/data/structure-data.js`）
- ✅ `soft.html` 软硬之间（指导员/锻炼率双折线 + 官方短板引文 + 软硬对比；数据 `assets/data/soft-data.js`）
- ✅ `people.html` 3㎡的背后（全国vs残疾人对照条 + 老人/残障/青少年画像卡；人文关怀层，纯 CSS 可视化）
- ✅ `case.html` 两个极端（江苏vs甘肃 差距条+对照表 + 甘肃帮扶时间线 + 人物口述；纯 CSS 可视化）
- ✅ `promise.html` 最后一公里（承诺vs现实进度条 90.4%/100% + 目标既成对照 + 最后一公里 + 2025最新3.11㎡；纯 CSS）
- ✅ `next.html` 到家门口（国家补短板实证 + 广覆盖→优供给转变面板 + 官方“不平衡/均衡可及”权威收口 + 大字主张；纯 CSS）
- ✅ `method.html` 数据说明与 AI 使用披露（人工工作流程 + 关键口径决策 + 分板块来源含31省逐省链接 + AI披露声明）— 🎉 全站 11 页完成
- 🎉 全部 11 个页面已完成，可直接部署 / 打包提交。
- 页内除已接入台账的板块外，其余数字仍为 PRD 锚点占位，**以人工核对台账为准替换**。
