```tsx
'use client';
import { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
export default function MiniChart({ symbol }: { symbol: string }) {
const chartRef = useRef<HTMLDivElement>(null);
useEffect(() => {
if (!chartRef.current) return;
const chart = createChart(chartRef.current, {
width: 280,
height: 112,
layout: { background: { color: '#0a0a0a' }, textColor: '#666' },
grid: { vertLines: { color: '#1a1a1a' }, horzLines: { color: '#1a1a1a' } },
timeScale: { visible: false },
rightPriceScale: { visible: false },
crosshair: { vertLine: { visible: false }, horzLine: { visible: false } },
handleScale: false,
handleScroll: false,
});
const lineSeries = chart.addLineSeries({
color: symbol === 'BTC' ? '#f59e0b' : symbol === 'ETH' ? '#3b82f6' : symbol === 'SOL' ? '#22c55e' : symbol === 'XRP' ? '#8b5cf6' : '#eab308',
lineWidth: 2.5,
});
const base = symbol === 'BTC' ? 63420 : symbol === 'ETH' ? 2144 : symbol === 'SOL' ? 178 : symbol === 'XRP' ? 0.58 : 0.178;
const data = Array.from({ length: 50 }, (_, i) => ({
time: Date.now() / 1000 - (50 - i) * 60,
value: base + Math.sin(i / 4)  (symbol === 'BTC' ? 45 : 8) + (Math.random()  6 - 3),
}));
lineSeries.setData(data);
chart.timeScale().fitContent();
return () => chart.remove();
}, [symbol]);
return <div ref={chartRef} className="w-full h-full" />;
}
