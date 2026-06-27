/* regional-data.js · 板块04 东中西东北 分区人均(2024)
   官方四大地区划分(国家统计局·七普公报);区域人均=Σ各省场地面积/Σ各省常住人口。 */
window.REGIONAL_DATA = {
  "metadata": {
    "title": "东中西东北 分区人均体育场地面积(2024)",
    "unit": "平方米/人",
    "classification_source": "国家统计局四大地区划分(第七次全国人口普查公报)",
    "method": "区域人均 = Σ各省场地面积 / Σ各省常住人口；常住人口由各省官方场地面积÷官方人均反算得到，反算全国值3.006㎡与官方3.0㎡吻合，抽样省份人口与官方值一致。上海采用国家标准口径2.43。",
    "national_2024": 3.0
  },
  "regions": [
    {
      "region": "东部",
      "provinces_count": 10,
      "area_yi_sqm": 18.36,
      "pop_wan": 56723,
      "per_capita": 3.24,
      "max": {
        "province": "江苏",
        "value": 4.46
      },
      "min": {
        "province": "上海",
        "value": 2.43
      },
      "internal_range": 2.03
    },
    {
      "region": "中部",
      "provinces_count": 6,
      "area_yi_sqm": 10.56,
      "pop_wan": 36257,
      "per_capita": 2.91,
      "max": {
        "province": "湖北",
        "value": 3.19
      },
      "min": {
        "province": "山西",
        "value": 2.72
      },
      "internal_range": 0.47
    },
    {
      "region": "西部",
      "provinces_count": 12,
      "area_yi_sqm": 10.85,
      "pop_wan": 38252,
      "per_capita": 2.84,
      "max": {
        "province": "宁夏",
        "value": 3.51
      },
      "min": {
        "province": "西藏",
        "value": 1.96
      },
      "internal_range": 1.55
    },
    {
      "region": "东北",
      "provinces_count": 3,
      "area_yi_sqm": 2.54,
      "pop_wan": 9516,
      "per_capita": 2.67,
      "max": {
        "province": "辽宁",
        "value": 2.78
      },
      "min": {
        "province": "黑龙江",
        "value": 2.58
      },
      "internal_range": 0.2
    }
  ],
  "region_membership": {
    "东部": [
      "北京",
      "天津",
      "河北",
      "上海",
      "江苏",
      "浙江",
      "福建",
      "山东",
      "广东",
      "海南"
    ],
    "中部": [
      "山西",
      "安徽",
      "江西",
      "河南",
      "湖北",
      "湖南"
    ],
    "西部": [
      "内蒙古",
      "广西",
      "重庆",
      "四川",
      "贵州",
      "云南",
      "西藏",
      "陕西",
      "甘肃",
      "青海",
      "宁夏",
      "新疆"
    ],
    "东北": [
      "辽宁",
      "吉林",
      "黑龙江"
    ]
  },
  "per_capita_gdp_anchors_2024_yuan": {
    "note": "用于‘场地vs经济’散点的锚点(部分省)；如做完整散点，建议从国家统计局分省年度数据补齐全部31省人均GDP",
    "北京": 228011,
    "上海": 216834,
    "江苏": 160000,
    "福建": 138000,
    "浙江": 136000,
    "天津": 132143,
    "内蒙古": 109827,
    "重庆": 100887,
    "山东": 97368,
    "甘肃": 52750
  }
};
