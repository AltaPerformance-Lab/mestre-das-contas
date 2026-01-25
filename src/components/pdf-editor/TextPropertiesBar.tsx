import React from 'react';
import { usePDFStore } from '@/store/pdf-store';
import { Type, Minus, Plus, Palette } from 'lucide-react';

const FONTS = [
    { label: 'Helvetica', value: 'Helvetica' },
    { label: 'Times New Roman', value: 'Times-Roman' },
    { label: 'Courier', value: 'Courier' },
    { label: 'Symbol', value: 'Symbol' },
];

const COLORS = [
    { r: 0, g: 0, b: 0, label: 'Preto' },
    { r: 220, g: 38, b: 38, label: 'Vermelho' },
    { r: 37, g: 99, b: 235, label: 'Azul' },
    { r: 22, g: 163, b: 74, label: 'Verde' },
];

export default function TextPropertiesBar() {
    const { textStyle, setTextStyle } = usePDFStore();

    return (
        <div className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-2 flex flex-wrap items-center justify-center gap-4 md:gap-6 animate-slideDown shadow-sm">
            
            {/* Font Family */}
            <div className="flex items-center gap-2">
                <Type size={16} className="text-slate-400 dark:text-slate-500" />
                <select 
                    value={textStyle.font}
                    onChange={(e) => setTextStyle({ font: e.target.value })}
                    className="h-8 text-sm border-slate-200 dark:border-slate-700 rounded-md text-slate-700 dark:text-slate-200 focus:ring-cyan-500 bg-slate-50 dark:bg-slate-800 min-w-[140px]"
                >
                    {FONTS.map(f => (
                        <option key={f.value} value={f.value}>{f.label}</option>
                    ))}
                </select>
            </div>

            <div className="w-px h-6 bg-slate-200 dark:bg-slate-700" />

            {/* Font Size */}
            <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 p-0.5">
                <button 
                    onClick={() => setTextStyle({ size: Math.max(8, textStyle.size - 2) })}
                    className="w-8 h-8 flex items-center justify-center hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm rounded text-slate-600 dark:text-slate-300 active:scale-95 transition-all"
                >
                    <Minus size={14} />
                </button>
                <div className="w-10 text-center font-bold text-slate-700 dark:text-slate-200 text-sm">
                    {textStyle.size}
                </div>
                <button 
                    onClick={() => setTextStyle({ size: Math.min(72, textStyle.size + 2) })}
                    className="w-8 h-8 flex items-center justify-center hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm rounded text-slate-600 dark:text-slate-300 active:scale-95 transition-all"
                >
                    <Plus size={14} />
                </button>
            </div>

            <div className="w-px h-6 bg-slate-200 dark:bg-slate-700" />

            {/* Color Picker (Simplified) */}
            <div className="flex items-center gap-2">
                <Palette size={16} className="text-slate-400 dark:text-slate-500" />
                <div className="flex gap-1">
                    {COLORS.map((c, i) => (
                        <button
                            key={i}
                            onClick={() => setTextStyle({ color: { r: c.r, g: c.g, b: c.b } })}
                            className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${
                                textStyle.color.r === c.r && textStyle.color.g === c.g && textStyle.color.b === c.b
                                    ? 'border-slate-900 dark:border-white ring-1 ring-slate-300 dark:ring-slate-600' 
                                    : 'border-transparent'
                            }`}
                            style={{ backgroundColor: `rgb(${c.r},${c.g},${c.b})` }}
                            title={c.label}
                        />
                    ))}
                </div>
            </div>
            
        </div>
    );
}
