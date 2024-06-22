import { CoreTechAssets, CoreTechClearing, CoreTechClearingSecond } from "../../assets/landing/CoreTechAssets";
import { CoreTechPoweredBy } from "../../assets/landing/CoreTechPoweredBy";
import Link from "next/link";
import React, { FC } from "react";

const CARDS = [
    {
        title: "Trading",
        description: "ECN Protocol,Connected Order Book,Order Matching Engine",
        onOrOfChain: "Off-chain",
        layer: 3,
        imageAlt: "High Frequency",
    },
    {
        title: "Clearing",
        description: "Distributed Clearing Protocol,Margin account on chain",
        onOrOfChain: "Off-chain",
        layer: 2,
        imageAlt: "Daily",
    },
    {
        title: "Settlement",
        description: "Smart Contract,State Channel Manager",
        onOrOfChain: "On-chain",
        layer: 1,
        imageAlt: "Weekly",
    },
];

export const CoreTech: FC = () => {
    const renderCard = (item: (typeof CARDS)[0]) => {
        return (
            <div className="flex flex-row items-center gap-4 lg:gap-6 flex-shrink-0">
                <div className="bg-neutral-control-color-30 p-4 flex items-center flex-col">
                    <CoreTechAssets
                        index={item.layer}
                        className="w-[80px] h-[50px] lg:w-[129px] lg:h-[80px] flex-shrink-0"
                    />
                    <h5 className="text-text-color-100 text-sm lg:text-xl mt-1 font-semibold">Layer {item.layer}</h5>
                    <p className="text-xs lg:text-base text-text-color-60 font-medium">{item.imageAlt}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h5 className="text-lg lg:text-xl text-text-color-100 font-semibold">
                        {item.title}{" "}
                        <span className="bg-primary-cta-color-20 text-primary-cta-color-90 font-normal rounded-full px-3 lg:px-4 py-[1px] lg:py-0.5 text-sm lg:text-base">
                            {item.onOrOfChain}
                        </span>
                    </h5>
                    <ul className="flex flex-col items-start">
                        {item.description.split(",").map((desc, index) => (
                            <li className="text-text-color-80 text-sm lg:text-base" key={`${item.title}-${index}`}>
                                {desc}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    };
    return (
        <section className="px-[18px] md:px-8 md-lg:px-12 max-w-full w-full 3xl:w-[1328px] py-[72px]">
            <h3 className="text-2xl font-medium text-text-color-100 mb-9 max-[820px]:text-center">Core Technology</h3>
            <div className="flex flex-col">
                <div className="pb-[168px] min-[820px]:pb-6 border-b border-divider-color-20 w-full max-[820px]:flex max-[820px]:justify-center">
                    <div className="relative">
                        {renderCard(CARDS[0])}
                        <div className="absolute max-[820px]:top-[156px] max-[820px]:left-0 min-[820px]:top-4 lg:top-[29px] min-[820px]:right-0 2xl:right-[122px]">
                            <CoreTechClearing className="w-[306px] h-[281px] lg:w-[366px] lg:h-[324px] flex-shrink-0" />
                        </div>
                    </div>
                </div>
                <div className="max-[820px]:flex max-[820px]:justify-center max-[820px]:pb-9 max-[820px]:pt-[178px] min-[820px]:py-6 border-b border-divider-color-20">
                    {renderCard(CARDS[1])}
                </div>
            </div>
            <div className="py-6 border-b border-divider-color-20 flex max-[820px]:flex-col max-[820px]:gap-[18px] items-center justify-between">
                {renderCard(CARDS[2])}
                <div className="2xl:pr-[122px]">
                    <CoreTechClearingSecond className="w-[306px] h-[94px] lg:w-[372px] flex-shrink-0" />
                </div>
            </div>
            <div className="mt-9 flex flex-row items-end max-[820px]:justify-center gap-4">
                <CoreTechPoweredBy />
                <Link
                    href="/"
                    className="no-underline w-[97px] h-[36px] text-sm flex items-center justify-center rounded bg-primary-cta-color-60 text-primary-cta-layer-color-60 hover:bg-primary-cta-color-80 hover:text-primary-cta-layer-color-80 duration-200"
                >
                    Learn More
                </Link>
            </div>
        </section>
    );
};
