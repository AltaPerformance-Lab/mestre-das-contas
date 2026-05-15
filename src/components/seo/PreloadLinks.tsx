export default function PreloadLinks() {
  return (
    <>
      {/* DNS Prefetch para recursos externos que serão carregados em lazy */}
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
      <link rel="dns-prefetch" href="https://adservice.google.com" />
      <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net" />
    </>
  );
}
