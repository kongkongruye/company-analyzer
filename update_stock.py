#!/usr/bin/env python3
"""
中国中车股票数据更新脚本
用法: python update_stock.py
需要: pip install tushare
"""
import json
import os
import tushare as ts

# 设置token
TOKEN = "6d50819cc9b173e6ae92ebfd0cf6240e77d9b83e3a06de7d15b0b7b8"
pro = ts.pro_api(TOKEN)

def get_stock_quote():
    """获取实时行情"""
    df = ts.realtime_quote(ts_code='601766.SH')
    if df is not None and len(df) > 0:
        return {
            'currentPrice': round(float(df.iloc[0]['price']), 2),
            'volume': int(df.iloc[0]['vol']),
        }
    return None

def get_daily_data(start_date='20250301', end_date='20260314'):
    """获取历史交易日数据"""
    df = pro.daily(ts_code='601766.SH', start_date=start_date, end_date=end_date)
    if df is not None and len(df) > 0:
        # 按日期排序，取最新
        df = df.sort_values('trade_date', ascending=False)
        latest = df.iloc[0]
        return {
            'date': latest['trade_date'],
            'close': float(latest['close']),
            'open': float(latest['open']),
            'high': float(latest['high']),
            'low': float(latest['low']),
            'vol': int(latest['vol']),
        }
    return None

def get_financial_data():
    """获取财务数据"""
    # 2024年年报
    df_income = pro.income(ts_code='601766.SH', start_date='20240101', end_date='20241231', fields='ts_code,end_date,total_revenue,net_profit')
    df_cash = pro.cashflow(ts_code='601766.SH', start_date='20240101', end_date='20241231', fields='ts_code,end_date,net_cash_flows_oper')
    
    result = {}
    if df_income is not None and len(df_income) > 0:
        # 取年报 (end_date = 1231)
        annual = df_income[df_income['end_date'] == '20241231']
        if len(annual) > 0:
            result['2024'] = {
                'revenue': round(float(annual.iloc[0]['total_revenue']) / 100000000, 2),
                'netProfit': round(float(annual.iloc[0]['net_profit']) / 100000000, 2),
            }
    
    if df_cash is not None and len(df_cash) > 0:
        annual_cash = df_cash[df_cash['end_date'] == '20241231']
        if len(annual_cash) > 0 and 'net_cash_flows_oper' in annual_cash.columns:
            result['2024']['cashFlow'] = round(float(annual_cash.iloc[0]['net_cash_flows_oper']) / 100000000, 2)
    
    return result

def main():
    print("开始更新中国中车数据...")
    
    # 获取数据
    quote = get_stock_quote()
    daily = get_daily_data()
    financials = get_financial_data()
    
    print(f"实时行情: {quote}")
    print(f"日线数据: {daily}")
    print(f"财务数据: {financials}")
    
    # 读取现有数据
    json_path = os.path.join(os.path.dirname(__file__), 'src', 'data', 'companies', 'crrc.json')
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # 更新数据
    if quote:
        if 'quote' not in data:
            data['quote'] = {}
        data['quote']['currentPrice'] = quote['currentPrice']
    
    if daily:
        data['lastUpdated'] = daily['date']
    
    # 写入更新
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"数据已更新，写入 {json_path}")
    print("请运行: git add . && git commit -m '更新股票数据' && git push")

if __name__ == '__main__':
    main()
