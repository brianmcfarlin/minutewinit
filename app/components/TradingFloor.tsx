```tsx
'use client';
import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Users, Timer } from 'lucide-react';
import MiniChart from './MiniChart';
const coins = [
{ symbol: 'BTC', name: 'Bitcoin', price: '63421.87', change: '+1.87', color: '#f59e0b' },
{ symbol: 'ETH', name: 'Ethereum', price: '2144.32', change: '-0.80', color: '#3b82f6' },
{ symbol: 'SOL', name: 'Solana', price: '178.15', change: '+3.84', color: '#22c55e' },
{ symbol: 'XRP', name: 'XRP', price: '0.5874', change: '-1.23', color: '#8b5cf6' },
{ symbol: 'DOGE', name: 'Dogecoin', price: '0.1781', change: '+2.41', color: '#eab308' },
];
export default function TradingFloor() {
const [timeLeft, setTimeLeft] = useState(42);
const [totalPool, setTotalPool] = useState(18420);
const [selected, setSelected] = useState('BTC');
useEffect(() => {
const interval = setInterval(() => {
setTimeLeft((t) => (t <= 1 ? 60 : t - 1));
}, 1000);
return () => clearInterval(interval);
}, []);
const placeBet = (symbol: string, direction: 'UP' | 'DOWN') => {
const amount = 25;
setTotalPool((p) => p + amount);
alert(`Bet placed! ${direction} $${amount} on ${symbol}. Pool now $${(totalPool + amount).toLocaleString()}`);
};
return (
<div className="bg-zinc-950 text-white min-h-screen p-6 font-mono">
<div className="max-w-[1680px] mx-auto">
<header className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-6">
<div className="flex items-center gap-4">
<div className="text-5xl font-black tracking-tighter">MINUTE<span className="text-emerald-400">WINIT</span></div>
<div className="px-5 py-1 bg-emerald-500 text-black text-sm font-bold rounded-3xl">LIVE • PARIMUTUEL</div>
</div>
<div className="flex items-center gap-10 text-sm">
<div className="flex items-center gap-2"><Users className="w-5 h-5 text-emerald-400" /> 2,847 TRADING</div>
<div className="flex items-center gap-2"><Timer className="w-5 h-5" /> 60 SECOND ROUNDS</div>
<div>TOTAL POOL <span className="text-emerald-400 font-bold">${totalPool.toLocaleString()}</span></div>
</div>
</header>
<div className="grid grid-cols-5 gap-5">
{coins.map((coin) => (
<div
key={coin.symbol}
className={`bg-zinc-900 border-2 rounded-3xl overflow-hidden transition-all hover:border-white ${selected === coin.symbol ? 'border-white' : 'border-zinc-800'}`}
onClick={() => setSelected(coin.symbol)}
>
<div className="px-6 pt-6 flex justify-between">
<div className="flex gap-4 items-center">
<div className="w-10 h-10 rounded-2xl" style={{ background: coin.color }}></div>
<div>
<div className="text-3xl font-bold">{coin.symbol}</div>
<div className="text-xs text-zinc-500">{coin.name}</div>
</div>
</div>
<div className="text-right">
<div className="font-mono text-xl">${coin.price}</div>
<div className={`text-sm font-bold ${coin.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>{coin.change}%</div>
</div>
</div>
<div className="h-28 mt-4 bg-black relative">
<MiniChart symbol={coin.symbol} />
</div>
<div className="text-center mt-6">
<div className="inline-block w-24 h-24 border border-zinc-700 rounded-3xl text-6xl font-bold tabular-nums flex items-center justify-center">
{timeLeft}
</div>
<div className="text-xs text-zinc-500 mt-2">UNTIL SETTLEMENT</div>
</div>
<div className="p-6 grid grid-cols-2 gap-4">
<button
onClick={(e) => { e.stopPropagation(); placeBet(coin.symbol, 'UP'); }}
className="bg-emerald-500 hover:bg-emerald-400 text-black font-black py-9 rounded-3xl text-3xl flex flex-col items-center active:scale-95 transition"
>
<TrendingUp size={36} className="mb-2" /> UP
<span className="text-xs opacity-70">71%</span>
</button>
<button
onClick={(e) => { e.stopPropagation(); placeBet(coin.symbol, 'DOWN'); }}
className="bg-red-500 hover:bg-red-400 text-black font-black py-9 rounded-3xl text-3xl flex flex-col items-center active:scale-95 transition"
>
<TrendingDown size={36} className="mb-2" /> DOWN
<span className="text-xs opacity-70">29%</span>
</button>
</div>
</div>
))}
</div>
</div>
</div>
);
}
```
FILE: app/globals.css (add this if you don't have Tailwind already set up)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
body {
font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}
