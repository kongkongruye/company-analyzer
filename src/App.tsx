import { useState } from 'react'
import crrcData from './data/companies/crrc.json'
import { TrendingUp, Building2, AlertTriangle, BarChart3, DollarSign, Activity } from 'lucide-react'

type Summary = {
  graham: string
  buffett: string
  marks: string
  overall: string
}

type CompanyData = typeof crrcData & { summary: Summary }

function App() {
  const [selectedCompany, setSelectedCompany] = useState<string>('crrc')
  const [activeTab, setActiveTab] = useState<'graham' | 'buffett' | 'marks'>('graham')
  
  // 模拟公司列表，实际可从API或文件获取
  const companies = [
    { id: 'crrc', name: '中国中车', code: '601766' }
  ]
  
  const data: CompanyData = crrcData

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">公司分析平台</h1>
          </div>
          <select 
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white"
          >
            {companies.map(c => (
              <option key={c.id} value={c.id}>{c.name} ({c.code})</option>
            ))}
          </select>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* 公司基本信息 */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{data.name}</h2>
              <p className="text-gray-500 mt-1">
                股票代码: {data.code} | {data.exchange} | {data.industry}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">最后更新</p>
              <p className="text-gray-700">{data.lastUpdated}</p>
            </div>
          </div>
        </section>

        {/* 行情数据 */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            行情数据
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">当前股价</p>
              <p className="text-2xl font-bold text-gray-900">¥{data.quote.currentPrice}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">总市值</p>
              <p className="text-2xl font-bold text-gray-900">{data.quote.totalMarketCap}亿</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">流通市值</p>
              <p className="text-2xl font-bold text-gray-900">{data.quote.circulatingMarketCap}亿</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">市盈率(TTM)</p>
              <p className="text-2xl font-bold text-gray-900">{data.quote.pe}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">市净率(TTM)</p>
              <p className="text-2xl font-bold text-gray-900">{data.quote.pb}</p>
            </div>
          </div>
        </section>

        {/* 财务数据 */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5" />
            财务数据
          </h3>
          
          {/* 2024年完整数据 */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-700 mb-3">2024年年报</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-600">营业收入</p>
                <p className="text-xl font-bold text-blue-900">{data.financials["2024"].revenue}亿</p>
                <p className="text-xs text-blue-600">同比 +{data.financials["2024"].revenueGrowth}%</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-green-600">归母净利润</p>
                <p className="text-xl font-bold text-green-900">{data.financials["2024"].netProfit}亿</p>
                <p className="text-xs text-green-600">同比 +{data.financials["2024"].profitGrowth}%</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-purple-600">经营现金流</p>
                <p className="text-xl font-bold text-purple-900">{data.financials["2024"].cashFlow}亿</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <p className="text-sm text-orange-600">净利润现金含量</p>
                <p className="text-xl font-bold text-orange-900">{data.financials["2024"].netProfitCashContent}</p>
              </div>
            </div>
          </div>

          {/* 2025季度数据 */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-gray-700 mb-3">2025年Q1</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">营业收入</span>
                  <span className="font-medium">{data.financials["2025_Q1"].revenue}亿 <span className="text-green-600 text-sm">+{data.financials["2025_Q1"].revenueGrowth}%</span></span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">归母净利润</span>
                  <span className="font-medium">{data.financials["2025_Q1"].netProfit}亿 <span className="text-green-600 text-sm">+{data.financials["2025_Q1"].profitGrowth}%</span></span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">每股收益</span>
                  <span className="font-medium">¥{data.financials["2025_Q1"].eps}</span>
                </div>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-gray-700 mb-3">2025年Q3</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">营业收入</span>
                  <span className="font-medium">{data.financials["2025_Q3"].revenue}亿 <span className="text-green-600 text-sm">+{data.financials["2025_Q3"].revenueGrowth}%</span></span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">归母净利润</span>
                  <span className="font-medium">{data.financials["2025_Q3"].netProfit}亿 <span className="text-green-600 text-sm">+{data.financials["2025_Q3"].profitGrowth}%</span></span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 估值分析 */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            估值分析
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-gray-700 mb-3">市盈率(PE)</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">当前</span>
                  <span className="font-bold">{data.valuation.pe.current}倍</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">历史区间</span>
                  <span className="font-medium">{data.valuation.pe.historical}倍</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">目标区间</span>
                  <span className="font-medium">{data.valuation.pe.target}倍</span>
                </div>
                <div className="mt-2 pt-2 border-t">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${data.valuation.pe.assessment === '低估' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {data.valuation.pe.assessment}
                  </span>
                </div>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-gray-700 mb-3">市净率(PB)</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">当前</span>
                  <span className="font-bold">{data.valuation.pb.current}倍</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">历史区间</span>
                  <span className="font-medium">{data.valuation.pb.historical}倍</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">目标区间</span>
                  <span className="font-medium">{data.valuation.pb.target}倍</span>
                </div>
                <div className="mt-2 pt-2 border-t">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${data.valuation.pb.assessment === '低估' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {data.valuation.pb.assessment}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 亮点与风险 */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* 亮点 */}
          <section className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              投资亮点
            </h3>
            <ul className="space-y-3">
              {data.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="w-2 h-2 mt-2 rounded-full bg-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{highlight}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 风险 */}
          <section className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              风险因素
            </h3>
            <ul className="space-y-3">
              {data.risks.map((risk, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="w-2 h-2 mt-2 rounded-full bg-red-500 flex-shrink-0" />
                  <span className="text-gray-700">{risk}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* 风险指标观测 */}
        {data.riskIndicators && (
          <section className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              风险观测指标
            </h3>
            <p className="text-sm text-gray-500 mb-4">{data.riskIndicators.description}</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.riskIndicators.indicators.map((indicator, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{indicator.name}</h4>
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-500">
                      {indicator.frequency}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{indicator.impact}</p>
                  <div className="text-sm">
                    <span className="text-orange-600 font-medium">关注: </span>
                    <span className="text-gray-700">{indicator.watch}</span>
                  </div>
                  <div className="mt-2 pt-2 border-t text-sm">
                    <span className="text-gray-500">当前: </span>
                    <span className="text-gray-900">{indicator.current}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 总结 - 三大师视角 */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            投资大师三重视角
          </h3>
          
          {/* Tab 切换 */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setActiveTab('graham')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'graham' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border'
              }`}
            >
              格雷厄姆
            </button>
            <button
              onClick={() => setActiveTab('buffett')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'buffett' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border'
              }`}
            >
              巴菲特
            </button>
            <button
              onClick={() => setActiveTab('marks')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'marks' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border'
              }`}
            >
              霍华德·马克斯
            </button>
          </div>
          
          {/* 内容 */}
          <div className="bg-white rounded-lg p-4 mb-4">
            {activeTab === 'graham' && (
              <p className="text-gray-700 leading-relaxed">{data.summary.graham}</p>
            )}
            {activeTab === 'buffett' && (
              <p className="text-gray-700 leading-relaxed">{data.summary.buffett}</p>
            )}
            {activeTab === 'marks' && (
              <p className="text-gray-700 leading-relaxed">{data.summary.marks}</p>
            )}
          </div>
          
          {/* 综合结论 */}
          <div className="border-t pt-4">
            <p className="text-gray-900 font-medium">{data.summary.overall}</p>
          </div>
        </section>
      </main>

      {/* 页脚 */}
      <footer className="bg-white border-t mt-8 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>公司分析平台 | 数据仅供研究参考，不构成投资建议</p>
        </div>
      </footer>
    </div>
  )
}

export default App
