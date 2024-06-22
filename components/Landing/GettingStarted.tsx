import { GettingStartedAssets } from "../../assets/landing/GettingStartedAssets";
import React, { FC } from "react";

const CARDS = [
    {
        title: "Set up your wallet",
        description: "Sign up with email and get your non-custodial Smart Wallet created within seconds",
        imageIndex: 0,
    },
    {
        title: "Fund your Channel",
        description: "Fund your Smart Wallet and use it to deposit collateral and open channel",
        imageIndex: 1,
    },
    {
        title: "Start Trading",
        description: "Long or short your favorite pairs without prepayment. Batch settle with Atomic Swap",
        imageIndex: 2,
    },
];

export const GettingStarted: FC = () => {
    const renderCard = (card: (typeof CARDS)[0]) => {
        return (
            <div key={card.title} className="flex flex-col gap-4 bg-body-background-color shadow-lg p-6 w-full rounded">
                <GettingStartedAssets index={card.imageIndex} />
                <div className="flex flex-col w-full items-start gap-3">
                    <h4 className="text-xl font-semibold text-text-color-100 flex items-end gap-1">
                        {card.title}
                        <span className="text-primary-cta-color-80 text-2xl">.</span>
                    </h4>
                    <p className="text-text-color-60 text-sm">{card.description}</p>
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-full w-full 3xl:w-[1328px] flex flex-col gap-6">
            <h3 className="text-2xl font-medium text-text-color-100">Getting started</h3>
            <div className="flex flex-col lg:flex-row md:justify-between gap-6">{CARDS.map(renderCard)}</div>
        </div>
    );
};
