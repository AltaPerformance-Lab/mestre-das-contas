export default function PreloadLinks() {
  return (
    <>
      {/* Preconnect prioritário para Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* DNS Prefetch para recursos externos que serão carregados em lazy */}
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
      <link rel="dns-prefetch" href="https://adservice.google.com" />
      <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net" />
    </>
  );
}
