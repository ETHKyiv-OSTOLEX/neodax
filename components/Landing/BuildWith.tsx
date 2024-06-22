import { NeoDAXLogo } from "../../assets";
import { BuildWithSchema } from "../../assets/landing/BuildWithSchema";
import React from "react";

const LIST = [
    "Fully non-custodial for users and brokers",
    "Designed for the clearing network",
    "Simple, secure, yet extremely efficient",
    "Ultra low latency",
];

export const BuiltWith = () => {
    return (
        <section className="mt-[108px] md:mt-[129px] flex-col-reverse max-[840px]:gap-9 min-[840px]:flex-row flex 2xl:gap-6 justify-between items-center max-w-full w-full 3xl:w-[1328px]">
            <div className="flex flex-col gap-9 w-full min-[840px]:w-[612px] z-10">
                <div className="flex flex-col gap-6">
                    <h3 className="flex items-center gap-3">
                        <span className="text-2xl font-medium text-text-color-100 whitespace-nowrap">Build with</span>
                        <NeoDAXLogo classNames="max-h-[42px]" />
                    </h3>
                    <p className="text-xl font-semibold text-text-color-100 max-w-[340px]">
                        A bleeding-edge infrastructure for the new-generation broker platforms
                    </p>
                    <div className="flex flex-col gap-3">
                        {LIST.map((item, index) => (
                            <div key={index} className="flex items-center">
                                <div className="pl-5 border-l-4 border-primary-cta-color-60 py-2 text-normal text-text-color-100 text-base">
                                    {item}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <button className="w-[164px] bg-primary-cta-color-60 hover:bg-primary-cta-color-80 active:bg-primary-cta-color-90 shadow-sm hover:shadow py-2.5 text-primary-cta-layer-color-60 hover:text-primary-cta-layer-color-80 rounded text-sm font-semibold">
                    Build your Broker
                </button>
            </div>
            <div className="z-10">
                <BuildWithSchema className="w-full h-[160px] xs:h-[220px] xs:w-[340px] lg:h-[320px] lg:w-[490px] 2xl:w-[612px] 2xl:h-[400px]" />
            </div>
        </section>
    );
};
