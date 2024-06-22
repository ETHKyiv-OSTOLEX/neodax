import "react-loading-skeleton/dist/skeleton.css";
import "../styles/globals.css";
import "../styles/tailwind.css";
import "@openware/neodax-web-sdk/index.css";
import "../styles/scss/index.scss";
import "../styles/orderbook.css";

import { CoreProvider, appTitle } from "@openware/neodax-web-sdk";
import { JSX, useMemo } from "react";
import type { AppContext, AppProps } from "next/app";
import NextApp from "next/app";
import Head from "next/head";
import { Layout } from "../components";
import { PostHogProvider } from "posthog-js/react";
import { useRouter } from "next/router";
import { getPublicConfig } from "../configs/app";
import ErrorBoundary from "../components/ErrorBoundary";
import { CustomizationSettingsInterface, getColorConfigFiles } from "../utils/themeUtils";

interface CustomAppProps extends AppProps {
    pageProps: {
        lightColorsConfig?: CustomizationSettingsInterface;
        darkColorsConfig?: CustomizationSettingsInterface;
        [key: string]: any;
    };
}

function App({ Component, pageProps }: CustomAppProps): JSX.Element {
    const router = useRouter();
    const { defaultAppTitle, metaDescription } = getPublicConfig();

    const favicon = "/favicon.ico";

    const layoutProps = useMemo(() => {
        if (router?.pathname == "/settings") {
            return {
                className: "overflow-y-auto no-scrollbar mb-6 md:flex md:flex-grow md:overflow-hidden md:mb-0",
            };
        }
        if (router?.pathname.includes("/settings")) {
            return {
                className: "overflow-y-auto no-scrollbar",
            };
        }
    }, [router?.pathname]);

    return (
        <>
            <Head>
                <link rel="icon" type="image/svg+xml" href={favicon} />
                <meta name="viewport" content="width=device-width, initial-scale=1" charSet="UTF-8" />
                <title>{appTitle(defaultAppTitle)}</title>
                <meta name="description" content={metaDescription} />
            </Head>
            <ErrorBoundary>
                <CoreProvider
                    darkThemeConfig={pageProps.darkColorsConfig}
                    lightThemeConfig={pageProps.lightColorsConfig}
                >
                    <PostHogProvider>
                        <div className="bg-main-background-color">
                            <Layout {...layoutProps}>
                                <Component {...pageProps} />
                            </Layout>
                        </div>
                    </PostHogProvider>
                </CoreProvider>
            </ErrorBoundary>
        </>
    );
}

App.getInitialProps = async (context: AppContext) => {
    const ctx = await NextApp.getInitialProps(context);

    const { darkColorsConfig, lightColorsConfig } = getColorConfigFiles();

    return { ...ctx, pageProps: { ...ctx.pageProps, lightColorsConfig, darkColorsConfig } };
};

export default App;
