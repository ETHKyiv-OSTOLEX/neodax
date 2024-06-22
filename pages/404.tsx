import { useSetMobileDevice } from "@openware/neodax-web-sdk";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Custom404() {
    const isMobile = useSetMobileDevice(false, 1025);

    const renderDesktop = () => {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="h-full flex items-center">
                    <div className="flex flex-col">
                        <div className="text-text-color-90 text-6xl font-gilmer-bold">Ooops! Something went wrong.</div>
                        <div className="mt-5 mb-5 w-[457px] text-base text-text-color-90">
                            The page you are looking for might have been removed, had its name changed or is temporarily
                            unavailable.
                        </div>
                        <Link
                            className="border flex justify-center items-center text-sm font-metro-semibold border-primary-cta-layer-color-60 text-primary-cta-layer-color-60 bg-primary-cta-color-60 w-[214px] h-[40px] hover:bg-primary-cta-color-80"
                            href="/"
                        >
                            Refresh
                        </Link>
                    </div>
                </div>
                <div className="w-1/2 h-full relative">
                    <Image alt="Page Not Found" src="/images/404.svg" layout="fill" />
                </div>
            </div>
        );
    };

    const renderMobile = () => {
        return (
            <div className="flex flex-col items-center h-screen md:mt-6">
                <div className="w-full h-[338px] relative max-w-[338px]">
                    <Image alt="Page Not Found" src="/images/404.svg" layout="fill" />
                </div>
                <div className="text-text-color-90 text-[48px] font-gilmer-bold leading-[52px] mt-6 max-w-[338px]">
                    Ooops! Something went wrong.
                </div>
                <div className="mt-5 mb-5 text-base text-text-color-90 max-w-[338px]">
                    The page you are looking for might have been removed, had its name changed or is temporarily
                    unavailable.
                </div>
                <div className="w-full max-w-[338px]">
                    <Link
                        className="flex justify-center items-center text-sm font-semibold text-primary-cta-layer-color-60 bg-primary-cta-color-60 border border-primary-cta-layer-color-60 h-[40px] w-full"
                        legacyBehavior
                        href="/"
                    >
                        Refresh
                    </Link>
                </div>
            </div>
        );
    };

    return (
        <>
            <Head>
                <link rel="canonical" href="/404" />
                <meta property="og:url" content="/404" />
            </Head>
            <div className="flex flex-col h-full w-full pr-6 pl-6">{isMobile ? renderMobile() : renderDesktop()}</div>
        </>
    );
}

export async function getStaticProps(_context: any) {
    return {
        props: {},
        revalidate: 60,
    };
}
