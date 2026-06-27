/* =============================================================
   chart-theme.js · 全站 ECharts 统一主题
   在引入 echarts.min.js 之后、绘制任何图表之前引入本文件。
   主题名:"fitness" —— 各页 echarts.init(dom, "fitness") 即用。
   规范(对齐 PRD 图表风格):统一配色字号、去冗余网格线与边框、
   等宽数字、来源标注独立于图外(由 .source 承担)。
   ============================================================= */
(function () {
  "use strict";
  if (typeof echarts === "undefined") {
    console.warn("[chart-theme] echarts 未加载,主题未注册。请先引入 echarts.min.js。");
    return;
  }

  var INK = "#1F2329", INK2 = "#4A515C", INK3 = "#79828F", LINE = "#E6E9EF";
  var WARM = "#F2994A", WARM_DEEP = "#C9701B", COOL = "#2D6CDF", SLATE = "#5B7083", ALERT = "#D64545";
  var FONT = '"Source Han Sans SC","PingFang SC","Microsoft YaHei","Noto Sans CJK SC",sans-serif';

  // 分类色序:暖、冷、青灰交替,克制
  var PALETTE = [COOL, WARM, SLATE, "#7BA3E8", "#E8A93D", "#9AA6B4", ALERT];

  echarts.registerTheme("fitness", {
    color: PALETTE,
    backgroundColor: "transparent",
    textStyle: { fontFamily: FONT, color: INK2 },

    title: {
      textStyle: { color: INK, fontFamily: FONT, fontWeight: 700, fontSize: 16 },
      subtextStyle: { color: INK3, fontFamily: FONT, fontSize: 12 }
    },

    grid: { left: 8, right: 16, top: 24, bottom: 8, containLabel: true },

    categoryAxis: {
      axisLine:  { show: true, lineStyle: { color: LINE } },
      axisTick:  { show: false },
      axisLabel: { color: INK2, fontFamily: FONT, fontSize: 12 },
      splitLine: { show: false }
    },
    valueAxis: {
      axisLine:  { show: false },
      axisTick:  { show: false },
      axisLabel: { color: INK3, fontFamily: FONT, fontSize: 12 },
      splitLine: { show: true, lineStyle: { color: LINE, type: "dashed" } }
    },
    // ECharts 对不同轴类型分别取键,这里统一兜底
    axisCommon: {
      axisLabel: { color: INK2, fontFamily: FONT },
      splitLine: { lineStyle: { color: LINE } }
    },

    line: { symbol: "circle", symbolSize: 7, smooth: false,
            lineStyle: { width: 2.5 }, emphasis: { focus: "series" } },
    bar:  { itemStyle: { borderRadius: [4, 4, 0, 0] }, barMaxWidth: 38 },
    scatter: { symbolSize: 12, itemStyle: { opacity: .82 } },

    visualMap: {
      textStyle: { color: INK2, fontFamily: FONT, fontSize: 12 },
      itemWidth: 14, itemHeight: 92
    },

    tooltip: {
      backgroundColor: "#FFFFFF",
      borderColor: LINE,
      borderWidth: 1,
      padding: [10, 14],
      textStyle: { color: INK, fontFamily: FONT, fontSize: 13 },
      extraCssText: "box-shadow:0 6px 28px rgba(24,32,46,.12);border-radius:10px;",
      axisPointer: { lineStyle: { color: "#C8D0DB" }, crossStyle: { color: "#C8D0DB" } }
    },

    legend: {
      textStyle: { color: INK2, fontFamily: FONT, fontSize: 12 },
      icon: "roundRect", itemWidth: 14, itemHeight: 8
    },

    sankey: {
      nodeWidth: 16, nodeGap: 12,
      label: { color: INK, fontFamily: FONT, fontSize: 12 },
      lineStyle: { color: "gradient", opacity: .42, curveness: .5 },
      itemStyle: { borderWidth: 0 }
    },

    geo: {
      itemStyle: { areaColor: "#EDF0F5", borderColor: "#FFFFFF", borderWidth: .8 },
      emphasis: { itemStyle: { areaColor: "#FBE7CF" }, label: { color: INK } }
    }
  });

  // 暴露给各页直接取色,避免重复定义
  window.FITNESS_PALETTE = {
    ink: INK, ink2: INK2, ink3: INK3, line: LINE,
    warm: WARM, warmDeep: WARM_DEEP, cool: COOL, slate: SLATE, alert: ALERT,
    font: FONT,
    // 地图单色顺序色阶(浅→深,蓝系,色盲友好)
    mapScale: ["#EAF0FB", "#C6D8F4", "#9CBBEC", "#6E97DF", "#4574CE", "#2D6CDF", "#1E4FB0"]
  };
})();
