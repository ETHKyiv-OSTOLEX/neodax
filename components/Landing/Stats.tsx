import React from "react";

const CARDS_FIRST = [
    {
        title: ">3,500",
        subtitle: "Clearing Channels",
    },
    {
        title: ">$136M",
        subtitle: "Trading Volume",
    },
];

const CARDS_SECOND = [
    {
        title: "1,244",
        subtitle: "Trading Instruments",
    },
    {
        title: "99,98%",
        subtitle: "Successful Settlements",
    },
];

export const LandingStats = () => {
    const renderStats = (item: (typeof CARDS_FIRST)[0]) => {
        return (
            <div key={item.title} className="flex flex-col items-center gap-2 justify-center">
                <h5 className="text-text-color-60 text-sm lg:text-base font-normal">{item.subtitle}</h5>
                <p className="text-6xl lg:text-8xl font-bold text-text-color-100">{item.title}</p>
            </div>
        );
    };
    return (
        <section className="flex flex-col items-center mt-[108px] lg:mt-24 gap-9 md:gap-[50px] max-w-full w-full 3xl:w-[1328px]">
            <div className="flex max-md:flex-col w-full md:justify-around z-10 gap-9 md:gap-6">
                {CARDS_FIRST.map(renderStats)}
            </div>
            <div className="flex max-md:flex-col w-full md:justify-around z-10 gap-9 md:gap-6">
                {CARDS_SECOND.map(renderStats)}
            </div>
        </section>
    );
};
