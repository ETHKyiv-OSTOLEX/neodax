import { CorePotentialChart } from "../../assets/landing/CorePotentialChart";
import { GiantGlobe } from "../../assets/landing/GiantGlobeAsset";
import { getPublicConfig } from "../../configs/app";
import React, { FC } from "react";

const CARDS_FIRST_ROW = [
    {
        title: "Non-custodial",
        description:
            "You don't need to trust NeoDAX with your funds. Only deposit a margin on chain and have a full control of your assets.",
    },
    {
        title: "Beyond Perpetuals",
        description:
            "On top of trading perpetuals, NeoDAX allows you to access real (spot) assets and withdraw them for Holding.",
    },
];

const CARDS_SECONDS_ROW = [
    {
        title: "5x Capital efficient",
        description: "NeoDAX allows you to trade with up to 5x to your collateral amount with spot settlement.",
    },
    {
        title: "Low Latency",
        description:
            "Hybrid architecture powered by Finex engine executing millions of operations per second and geolocated node.",
    },
];

export const CorePotential: FC = () => {
    const { appName } = getPublicConfig();

    const renderCard = ({ title, description }: (typeof CARDS_FIRST_ROW)[0]) => (
        <div key={"card" + title} className="w-full md-lg:w-[294px] flex flex-col gap-3">
            <h4 className="text-xl font-medium text-text-color-100">{title}</h4>
            <p className="text-sm font-normal text-text-color-60">{description}</p>
        </div>
    );
    return (
        <section className="flex-col-reverse items-center 2xl:flex-row flex justify-between gap-9 2xl:gap-6 max-w-full w-full 3xl:w-[1328px]">
            <div className="flex flex-col z-10 gap-9">
                <h3 className="text-[22px] max-lg:leading-[30px] lg:text-2xl font-medium text-text-color-100">
                    Unlock the full potential of trading with {appName}
                </h3>
                <div className="w-full flex flex-col items-center gap-6 md-lg:gap-9">
                    <div className="max-md-lg:flex-col flex items-center gap-6">{CARDS_FIRST_ROW.map(renderCard)}</div>
                    <div className="max-md-lg:flex-col flex items-center gap-6 relative">
                        {CARDS_SECONDS_ROW.map(renderCard)}
                        <div className="absolute bottom-[70px] -left-[700px] md:-left-[540px] pointer-events-none">
                            <div className="relative pointer-events-none">
                                <GiantGlobe className="absolute top-0 -left-0 max-w-[1090px] max-h-[1110px] md:max-w-[1220px] md:max-h-[1240px] pointer-events-none z-0" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="z-10">
                <CorePotentialChart
                    className="w-[340px] h-[221px] md:h-[320px] md:w-[490px] 3xl:w-[612px] 3xl:h-[400px]"
                    appName={appName}
                />
            </div>
        </section>
    );
};
