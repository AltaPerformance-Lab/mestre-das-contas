export default function PreloadLinks() {
  return (
    <>
      {/* Preconnect para recursos críticos */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link 
        rel="preconnect" 
        href="https://fonts.gstatic.com" 
        crossOrigin="anonymous" 
      />
      
      {/* DNS Prefetch para recursos secundários */}
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      
      {/* Preconnect para AdSense (quando ativar) */}
      <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
      <link rel="dns-prefetch" href="https://adservice.google.com" />
    </>
  );
}
