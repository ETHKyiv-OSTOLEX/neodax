import { BuiltWith } from "../components/Landing/BuildWith";
import { CorePotential } from "../components/Landing/CorePotential";
import { CoreTech } from "../components/Landing/CoreTech";
import { GettingStarted } from "../components/Landing/GettingStarted";
import HeroSection from "../components/Landing/HeroSection";
import { KnowledgeCenter } from "../components/Landing/KnowledgeCenter";
import { LandingFAQ } from "../components/Landing/FAQ";
import LatestNews from "../components/Landing/LatestNews";
import MarketsTable from "../components/Landing/Markets";
import { LandingStats } from "../components/Landing/Stats";
import { getPublicConfig } from "../configs/app";
import { TickersWidget, appTitle } from "@openware/neodax-web-sdk";
import Head from "next/head";
import { FC, JSX, useEffect } from "react";
import { SEOBlock } from "../components/Landing/SEO";
import { TStrapiNewsType, getLatestNews } from "../components/Landing/LatestNews/GetLatestNews";
import { useRouter } from "next/router";

interface HomeProps {
    news: TStrapiNewsType[];
}

const Home: FC<HomeProps> = ({ news }): JSX.Element => {
    const router = useRouter();
    const { defaultAppTitle, landingPageMode } = getPublicConfig();

    useEffect(() => {
        if (!landingPageMode) {
            router.push("/trading");
        }
    }, [landingPageMode, router]);

    if (!landingPageMode) {
        return <></>;
    }

    return (
        <>
            <Head>
                <title>{appTitle(defaultAppTitle, "")}</title>
            </Head>
            <main>
                <HeroSection />
                <div className="w-full flex items-center">
                    <TickersWidget />
                </div>
                <section className="px-0 md:px-8 md-lg:px-12 lg:px-[60px] pt-12 flex max-lg:flex-col justify-center max-lg:gap-12 lg:gap-6">
                    <MarketsTable />
                    <LatestNews news={news} />
                </section>
                <section className="mt-12 lg:mt-[72px] px-[18px] md:px-8 md-lg:px-12 lg:px-[60px] flex w-full items-center justify-center">
                    <GettingStarted />
                </section>
                <div className="mt-[108px] flex w-full items-center justify-center bg-neutral-control-color-10">
                    <CoreTech />
                </div>
                <div className="px-[18px] md:px-8 md-lg:px-12 mt-[108px] flex flex-col w-full items-center justify-center">
                    <CorePotential />
                    <LandingStats />
                    <BuiltWith />
                </div>
                <div className="px-[18px] md:px-8 md-lg:px-12 mt-[108px] lg:mt-[120px] flex mb-[98px] w-full items-center justify-center">
                    <div className="max-w-full w-full 3xl:w-[1328px] flex flex-col gap-[108px] lg:gap-24">
                        <div className="flex items-start justify-between w-full gap-6">
                            <LandingFAQ />
                            <KnowledgeCenter />
                        </div>
                        <SEOBlock />
                    </div>
                </div>
            </main>
        </>
    );
};

export const getServerSideProps = async () => {
    const { strapiBaseUrl } = getPublicConfig();

    const news = await getLatestNews(strapiBaseUrl);

    return { props: { news } };
};

export default Home;
