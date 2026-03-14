# 公司分析平台

一个用于展示公司基本面分析数据的网站，支持添加多个公司的分析报告。

## 功能特性

- 公司基本信息展示（股票代码、交易所、行业）
- 实时行情数据（市值、PE、PB）
- 财务数据（营收、利润、现金流）
- 估值分析（历史区间 vs 当前估值）
- 投资亮点与风险因素
- 分析总结

## 添加新公司

1. 在 `src/data/companies/` 目录下创建新的 JSON 文件，文件名使用公司拼音或英文缩写
2. 参考 `crrc.json` 的格式填充数据
3. 在 `App.tsx` 的 `companies` 数组中添加新公司的配置

## 数据格式说明

```json
{
  "name": "公司名称",
  "code": "股票代码",
  "exchange": "交易所",
  "industry": "所属行业",
  "lastUpdated": "更新日期",
  
  "quote": {
    "currentPrice": 当前股价,
    "totalMarketCap": 总市值(亿),
    "circulatingMarketCap": 流通市值(亿),
    "pe": 市盈率,
    "pb": 市净率,
    "dividendYield": 股息率
  },
  
  "financials": {
    "2023": { "revenue": 营收, "netProfit": 净利润 },
    "2024": { ... },
    "2025_Q1": { ... },
    "2025_Q3": { ... }
  },
  
  "valuation": {
    "pe": { "current": 当前, "historical": 历史区间, "target": 目标区间, "assessment": 评估 },
    "pb": { ... }
  },
  
  "highlights": ["亮点1", "亮点2"],
  "risks": ["风险1", "风险2"],
  "summary": "总结文本"
}
```

## 开发

```bash
cd company-analyzer
pnpm install
pnpm dev
```

## 部署

项目已配置部署到静态网站，可以托管到 GitHub Pages、Vercel 等平台。
