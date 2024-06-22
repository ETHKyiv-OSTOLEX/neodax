// const { withSentryConfig } = require("@sentry/nextjs");

// Need to add All websocket connection ursl to connect-src section (Finex urls from peers json)
// const ALLOWED_CONNECTION_URLS = [
//     process.env.NEXT_PUBLIC_CLEARPORT_SOCKET_URL,
//     process.env.NEXT_PUBLIC_POSTHOG_HOST,
//     process.env.NEXT_PUBLIC_API_BASE_URL,
//     "wss://terminal-clearport.v4.uat.opendax.app", // Terminal ws
//     "wss://kayen.v4.uat.opendax.app/ws", // UAT Finex websocket url
//     "wss://kayen.io/ws", // Kayen Finex websocket url
//     "https://api.pimlico.io",
//     "https://auth.privy.io",
//     "wss://www.walletlink.org",
//     "https://rpc.linea.build",
//     "https://cdn.jsdelivr.net",
//     "https://linea-mainnet.infura.io",
//     "https://rpc.goerli.linea.build",
//     "https://linea-goerli.infura.io",
//     "https://rpc.ankr.com",
//     "https://polygon-mumbai.rpc.privy.systems",
//     "https://mainnet.infura.io",
//     "https://token-repository.dappradar.com",
//     "https://assets.coingecko.com",
//     "https://polygon-rpc.com",
//     "https://polygon-mainnet.infura.io",
//     "https://eu.posthog.com"
// ];

// const ContentSecurityPolicyDev = `
//     default-src 'self';
//     connect-src 'self'
//     ${ALLOWED_CONNECTION_URLS.join(" ")};
//     script-src 'self' 'unsafe-inline' 'unsafe-eval';
//     style-src 'self' https://fonts.googleapis.com 'unsafe-inline';
//     img-src * blob: data: https://cdn.jsdelivr.net;
//     font-src 'self' https://fonts.gstatic.com;
//     object-src 'none';
//     child-src 'self';
//     frame-src 'self' https://auth.privy.io https://verify.walletconnect.com https://verify.walletconnect.org blob:;
//     upgrade-insecure-requests;
//     block-all-mixed-content`;

// const ContentSecurityPolicyProduction = `
//     default-src 'self';
//     connect-src 'self'
//     ${ALLOWED_CONNECTION_URLS.join(" ")};
//     script-src 'self' 'unsafe-inline';
//     style-src 'self' https://fonts.googleapis.com 'unsafe-inline';
//     img-src * blob: data: https://cdn.jsdelivr.net;
//     font-src 'self' https://fonts.gstatic.com;
//     object-src 'none';
//     child-src 'self';
//     frame-src 'self' https://auth.privy.io https://verify.walletconnect.com https://verify.walletconnect.org blob:;
//     upgrade-insecure-requests;
//     block-all-mixed-content`;

// const ContentSecurityPolicy =
//     process.env.NODE_ENV === "development" ? ContentSecurityPolicyDev : ContentSecurityPolicyProduction;

const securityHeaders = [
    // {
    //     key: "content-security-policy",
    //     value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
    // },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
    // sentry: {
    //     // See the sections below for information on the following options:
    //     //   'Configure Source Maps':
    //     //     - disableServerWebpackPlugin
    //     //     - disableClientWebpackPlugin
    //     //     - hideSourceMaps
    //     //     - widenClientFileUpload
    //     //   'Configure Legacy Browser Support':
    //     //     - transpileClientSDK
    //     //   'Configure Serverside Auto-instrumentation':
    //     //     - autoInstrumentServerFunctions
    //     //     - excludeServerRoutes
    //     //   'Configure Tunneling to avoid Ad-Blockers':
    //     //     - tunnelRoute
    //     //   'Disable the Sentry SDK Debug Logger to Save Bundle Size':
    //     //     - disableLogger
    // },
    reactStrictMode: true,
    images: {
        domains: ["cdn.jsdelivr.net"],
        unoptimized: true,
    },
    publicRuntimeConfig: {
        appName: process.env.NEXT_PUBLIC_APP_NAME,
        clearportSocketUrl: process.env.NEXT_PUBLIC_CLEARPORT_SOCKET_URL,
        defaultChain: process.env.NEXT_PUBLIC_DEFAULT_CHAIN,
        projectId: atob(process.env.NEXT_PUBLIC_PROJECT_ID ?? ""),
        supportedChains: process.env.NEXT_PUBLIC_SUPPORTED_CHAINS,
        apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
        safetyCurrency: process.env.NEXT_PUBLIC_SAFETY_CURRENCY,
        posthogKey: process.env.NEXT_PUBLIC_POSTHOG_KEY,
        posthogHost: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        nodeEnv: process.env.NEXT_PUBLIC_NODE_ENV,
        gitCommitSha: process.env.NEXT_PUBLIC_GIT_COMMIT_SHA,
        privyAppId: atob(process.env.NEXT_PUBLIC_PRIVY_APP_ID ?? ""),
        pimlicoApiKey: atob(process.env.NEXT_PUBLIC_PIMLICO_API_KEY ?? ""),
        siteMode: process.env.NEXT_PUBLIC_SITE_MODE,
        brokerUrl: process.env.NEXT_PUBLIC_BROKER_URL,
        devMode: process.env.NEXT_PUBLIC_APP_DEV_MODE,
        defaultAppTitle: process.env.NEXT_PUBLIC_DEFAULT_APP_TITLE,
        peersPath: process.env.NEXT_PUBLIC_PEERS_PATH ?? "",
        totalChannels: process.env.NEXT_PUBLIC_TOTAL_CHANNELS ?? 0,
        strapiBaseUrl: process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337",
        metaDescription: process.env.NEXT_PUBLIC_META_DESCRIPTION ?? "",
        landingPageMode: process.env.NEXT_PUBLIC_LANDING_PAGE_MODE ?? false,
        allowedMarkets: (process.env.NEXT_PUBLIC_MARKET_PAIRS ?? "")
            ?.toLowerCase()
            ?.split(",")
            ?.filter((market) => market.trim() !== ""),
        walletDomainUrl: process.env.NEXT_PUBLIC_WALLET_DOMAIN_URL ?? "",
        walletPageMode: Boolean(process.env.NEXT_PUBLIC_WALLET_PAGE_MODE ?? '')
    },
    webpack: (config) => {
        config.resolve.fallback = { fs: false };

        return config;
    },
};

// const sentryWebpackPluginOptions = {
//     // Additional config options for the Sentry webpack plugin. Keep in mind that
//     // the following options are set automatically, and overriding them is not
//     // recommended:
//     //   release, url, configFile, stripPrefix, urlPrefix, include, ignore

//     org: "yellow-network",
//     project: "javascript-nextjs",

//     // An auth token is required for uploading source maps.
//     authToken: "",

//     silent: true, // Suppresses all logs

//     // For all available options, see:
//     // https://github.com/getsentry/sentry-webpack-plugin#options.
//   };

//   module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
module.exports = nextConfig;
