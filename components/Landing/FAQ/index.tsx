import React, { useCallback, useMemo, useState } from "react";
import FaqData from "./faq.json";
import { FaqItem } from "./FaqItem";

export type TFaqData = {
    id: number;
    title: string;
    answer: string;
};

export const LandingFAQ = () => {
    const [selectedFaqs, setSelectedFaq] = useState<TFaqData[]>([]);

    const handleCollapseAll = useCallback(() => setSelectedFaq([]), []);

    const renderFaqItems = useMemo(
        () =>
            FaqData?.map((faqDataItem) => (
                <FaqItem
                    key={faqDataItem.id + faqDataItem.title}
                    faqItem={faqDataItem}
                    selectedFaqs={selectedFaqs}
                    setSelectedFaq={setSelectedFaq}
                />
            )),
        [selectedFaqs, FaqData, setSelectedFaq]
    );

    return (
        <div className="w-full flex flex-col gap-4 z-10 max-w-full lg:max-w-[calc(100%-424px)]">
            <h1 className="font-semibold text-[22px] max-lg:leading-[30px] lg:text-2xl text-text-color-100">
                Frequently Asked Questions
            </h1>
            <div className="w-full flex flex-col gap-3 items-start">
                <button
                    onClick={handleCollapseAll}
                    className="font-semibold text-sm leading-[22px] text-secondary-control-color-60 hover:text-secondary-control-color-90"
                >
                    Collapse All
                </button>
                <div className="w-full flex flex-col gap-1">{renderFaqItems}</div>
            </div>
        </div>
    );
};
