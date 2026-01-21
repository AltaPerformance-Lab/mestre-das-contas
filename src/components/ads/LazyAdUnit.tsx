"use client";

import dynamic from 'next/dynamic';

// Dynamic import of the actual AdUnit component
// This ensures it only runs on the client side
const AdUnit = dynamic(() => import("./AdUnit"), { 
  ssr: false,
  loading: () => <div className="w-full h-32 bg-slate-50 animate-pulse rounded-lg" />
});

interface LazyAdUnitProps {
  slot: string;
  format?: string;
  variant?: string;
  className?: string;
}

export default function LazyAdUnit(props: LazyAdUnitProps) {
  return <AdUnit {...props} />;
}
