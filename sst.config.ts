// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "mestredascontas",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          region: "us-east-1",
          profile: process.env.AWS_PROFILE || "conta-rapida",
        },
      },
    };
  },
  async run() {
    new sst.aws.Nextjs("MestredasContasWeb", {
      domain: {
        name: "mestredascontas.com.br",
        redirects: ["www.mestredascontas.com.br"],
        // dns: true → SST gerencia os registros no Route 53 automaticamente
        dns: sst.aws.dns(),
      },
      environment: {
        NEXT_PUBLIC_ANALYTICS_ID: process.env.NEXT_PUBLIC_ANALYTICS_ID || "G-4ZPBQGPW5P",
        NEXT_PUBLIC_ADSENSE_ID: process.env.NEXT_PUBLIC_ADSENSE_ID || "pub-1492397877345140",
      },
    });
  },
});
