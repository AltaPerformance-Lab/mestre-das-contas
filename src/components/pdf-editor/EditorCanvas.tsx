import { useRef, useEffect, useState } from 'react';
import Image from "next/image";
import { usePDFStore } from '@/store/pdf-store';
import { Trash2, Move, Copy } from 'lucide-react';

interface EditorCanvasProps {
    width: number;
    height: number;
    pageIndex: number;
}

export default function EditorCanvas({ width, height, pageIndex }: EditorCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { 
        selectedTool, addPathToPage, addTextToPage, updateText, deleteText, 
        addImageToPage, updateImage, deleteImage,
        pages, textStyle 
    } = usePDFStore();
    
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentPath, setCurrentPath] = useState<any[]>([]);
    const [editingText, setEditingText] = useState<{x: number, y: number, text: string, id: number | null} | null>(null);
    const [pendingImagePos, setPendingImagePos] = useState<{x: number, y: number} | null>(null);

    // --- DRAWING LOGIC ---
    const getContext = () => canvasRef.current?.getContext('2d');

    const startDrawing = (e: React.MouseEvent) => {
        if (selectedTool !== 'draw' && selectedTool !== 'erase') return;
        const ctx = getContext();
        if (!ctx) return;
        setIsDrawing(true);
        const startPoint = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
        setCurrentPath([startPoint]);
        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        if (selectedTool === 'erase') {
             ctx.globalCompositeOperation = 'source-over';
             ctx.strokeStyle = '#FFFFFF';
             ctx.lineWidth = 20;
        } else {
             ctx.globalCompositeOperation = 'source-over';
             ctx.strokeStyle = `rgb(${textStyle.color.r},${textStyle.color.g},${textStyle.color.b})`;
             ctx.lineWidth = 2;
        }
    };

    const draw = (e: React.MouseEvent) => {
        if (!isDrawing) return;
        const ctx = getContext();
        if (!ctx) return;
        const point = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
        setCurrentPath(prev => [...prev, point]);
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
    };

    const stopDrawing = () => {
        if (!isDrawing) return;
        setIsDrawing(false);
        const isErase = selectedTool === 'erase';
        if(currentPath.length > 0) {
            addPathToPage(pageIndex, currentPath, {
                color: isErase ? '#FFFFFF' : `rgb(${textStyle.color.r},${textStyle.color.g},${textStyle.color.b})`,
                width: isErase ? 20 : 2,
                type: isErase ? 'erase' : 'draw'
            });
        }
    };

    // --- IMAGE LOGIC ---
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && pendingImagePos) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const result = event.target?.result;
                if (result) {
                    addImageToPage(pageIndex, result, pendingImagePos.x - 50, pendingImagePos.y - 50, 100, 100);
                }
            };
            reader.readAsDataURL(file);
        }
        setPendingImagePos(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    // --- CLICK HANDLER ---
    const handleCanvasClick = (e: React.MouseEvent) => {
        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;

        if (selectedTool === 'image') {
            setPendingImagePos({ x, y });
            fileInputRef.current?.click();
            return;
        }

        if (selectedTool === 'text') {
            const pageState = pages[pageIndex] || { texts: [], lines: [], images: [] };
            const clickedText = pageState.texts.find((t: any) => {
                const w = (t.text.length * (t.size * 0.6));
                const h = t.size * 1.2;
                return x >= t.x && x <= t.x + w && y >= t.y && y <= t.y + h;
            });
            if (clickedText) {
                 setEditingText({ x: clickedText.x, y: clickedText.y, text: clickedText.text, id: (clickedText as any).id });
            } else {
                 setEditingText({ x, y, text: "", id: null });
            }
        }
    };

    // --- RE-DRAW PATHS ---
    useEffect(() => {
        const ctx = getContext();
        if (!ctx) return;
        const pageState = pages[pageIndex];
        if (!pageState) return;

        ctx.clearRect(0, 0, width, height);

        pageState.lines.forEach((lineData: any) => {
             let points: any[] = [];
             let options = { color: '#000000', width: 2, type: 'draw' };

             if (Array.isArray(lineData)) {
                 points = lineData;
             } else {
                 options.color = lineData.color || '#000000';
                 options.width = lineData.width || 2;
                 points = Object.keys(lineData)
                    .filter(k => !isNaN(Number(k)))
                    .sort((a, b) => Number(a) - Number(b))
                    .map(k => lineData[Number(k)]);
             }
             if (points.length === 0) return;

             ctx.beginPath();
             ctx.moveTo(points[0].x, points[0].y);
             for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
             ctx.strokeStyle = options.color;
             ctx.lineWidth = options.width;
             ctx.lineCap = 'round';
             ctx.lineJoin = 'round';
             ctx.stroke();
        });
    }, [pages, pageIndex, width, height]);

    const pageState = pages[pageIndex] || { texts: [], lines: [], images: [] };

    return (
        <div className="absolute inset-0 z-10" style={{ width, height }}>
            <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleImageUpload}
            />

            <canvas 
                ref={canvasRef}
                width={width} 
                height={height}
                className={`absolute top-0 left-0 w-full h-full touch-none ${selectedTool === 'draw' || selectedTool === 'erase' ? 'cursor-crosshair' : selectedTool === 'text' ? 'cursor-text' : selectedTool === 'image' ? 'cursor-copy' : ''}`}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onClick={handleCanvasClick}
            />

            {/* Images Render */}
            {pageState.images?.map((img: any) => (
                <div 
                    key={img.id}
                    className="absolute group border-2 border-transparent hover:border-cyan-500"
                    style={{ left: img.x, top: img.y, width: img.width, height: img.height }}
                >
                     {/* Resize Handle (Bottom-Right) */}
                    <div 
                        className="absolute bottom-0 right-0 w-4 h-4 bg-cyan-500 cursor-nwse-resize opacity-0 group-hover:opacity-100 z-20"
                        onMouseDown={(e) => {
                            e.stopPropagation();
                            const startX = e.clientX;
                            const startY = e.clientY;
                            const startW = img.width;
                            const startH = img.height;
                            
                            const onMove = (mv: MouseEvent) => {
                                updateImage(pageIndex, img.id, {
                                    width: Math.max(20, startW + (mv.clientX - startX)),
                                    height: Math.max(20, startH + (mv.clientY - startY))
                                });
                            };
                            const onUp = () => {
                                window.removeEventListener('mousemove', onMove);
                                window.removeEventListener('mouseup', onUp);
                            };
                            window.addEventListener('mousemove', onMove);
                            window.addEventListener('mouseup', onUp);
                        }}
                    />

                    {/* Move Handle (Top-Left) */}
                    <div 
                        className="absolute top-0 left-0 p-1 bg-cyan-500 text-white cursor-move opacity-0 group-hover:opacity-100 z-20"
                        onMouseDown={(e) => {
                            e.stopPropagation();
                            const startX = e.clientX;
                            const startY = e.clientY;
                            const startLeft = img.x;
                            const startTop = img.y;
                            
                            const onMove = (mv: MouseEvent) => {
                                updateImage(pageIndex, img.id, {
                                    x: startLeft + (mv.clientX - startX),
                                    y: startTop + (mv.clientY - startY)
                                });
                            };
                            const onUp = () => {
                                window.removeEventListener('mousemove', onMove);
                                window.removeEventListener('mouseup', onUp);
                            };
                            window.addEventListener('mousemove', onMove);
                            window.addEventListener('mouseup', onUp);
                        }}
                    >
                        <Move size={12} />
                    </div>

                    {/* Delete Button (Top-Right) */}
                    <button 
                         className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 z-30 shadow-sm"
                         onClick={(e) => {
                             e.stopPropagation();
                             deleteImage(pageIndex, img.id);
                         }}
                    >
                        <Trash2 size={12} />
                    </button>

                    <Image 
                        src={img.data} 
                        alt="user upload" 
                        fill
                        className="object-contain pointer-events-none" 
                        unoptimized
                    />
                </div>
            ))}

            {/* Render Texts */}
            {pageState.texts.map((item: any) => {
                if (editingText && editingText.id === item.id) return null;
                return (
                <div 
                    key={item.id}
                    className="absolute cursor-text group hover:ring-1 hover:ring-cyan-500 p-1 rounded select-none"
                    style={{ left: item.x, top: item.y }}
                    onClick={(e) => {
                        e.stopPropagation(); 
                         setEditingText({ x: item.x, y: item.y, text: item.text, id: item.id });
                    }}
                >
                    <div className="absolute inset-0 bg-white -z-10" />
                    <span 
                        className="font-sans text-black whitespace-nowrap"
                        style={{ fontSize: item.size, fontFamily: textStyle.font || 'Helvetica' }}
                    >
                        {item.text}
                    </span>
                </div>
            )})}

            {/* Editing Text Input */}
            {editingText && (
                <div 
                    className="absolute z-50 flex items-center group"
                    style={{ left: editingText.x, top: editingText.y }}
                >
                    <div className="absolute inset-0 bg-white -z-10 shadow-sm border border-cyan-400 rounded" />
                    <input 
                        autoFocus
                        value={editingText.text}
                        onChange={(e) => setEditingText(prev => prev ? ({ ...prev, text: e.target.value }) : null)}
                        onBlur={() => {
                            if(editingText.text.trim()) {
                                if(editingText.id) updateText(pageIndex, editingText.id, editingText.text);
                                else addTextToPage(pageIndex, editingText.text, editingText.x, editingText.y);
                            } else if (editingText.id) {
                                deleteText(pageIndex, editingText.id);
                            }
                            setEditingText(null);
                        }}
                        onKeyDown={(e) => { if(e.key === 'Enter') e.currentTarget.blur(); }}
                        style={{ 
                            fontSize: textStyle.size || 16,
                            fontFamily: textStyle.font || 'Helvetica',
                            minWidth: Math.max(100, (editingText.text.length + 1) * 12) + 'px'
                        }}
                        className="outline-none bg-transparent text-black px-1 m-0 rounded-none w-auto"
                        placeholder="Digite..."
                    />
                    <button 
                        onMouseDown={(e) => {
                            e.preventDefault();
                            if(editingText.id) deleteText(pageIndex, editingText.id);
                            setEditingText(null);
                        }}
                        className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-0.5 shadow hover:scale-110 transition-transform opacity-0 group-hover:opacity-100"
                    >
                         <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>
            )}
        </div>
    );
}
