import React, { useCallback, useMemo } from "react";
import { TFaqData } from ".";
import { ArrowDownIcon, CloseFaqIcon } from "./faqIcons";

interface IFaqItemProps {
    selectedFaqs: TFaqData[];
    faqItem: TFaqData;
    setSelectedFaq: React.Dispatch<React.SetStateAction<TFaqData[]>>;
}

export const FaqItem: React.FC<IFaqItemProps> = ({ selectedFaqs, faqItem, setSelectedFaq }) => {
    const handleSelectItem = useCallback(
        () =>
            setSelectedFaq((prev) => {
                const isInList = prev?.find((prevItem) => prevItem.id === faqItem.id);

                if (isInList) {
                    return prev?.filter((prevItem) => prevItem.id !== faqItem.id);
                } else {
                    const newSelected = [...prev, faqItem];

                    return newSelected;
                }
            }),
        []
    );

    const isSelected = useMemo(
        () => selectedFaqs?.length && selectedFaqs?.find((selectedFaq) => selectedFaq?.id === faqItem?.id),
        [selectedFaqs, faqItem]
    );

    return isSelected ? (
        <div
            key={faqItem.title + faqItem.id}
            className="px-4 py-6 rounded bg-body-background-color shadow-lg my-2 w-full flex items-start gap-4"
        >
            <button
                onClick={handleSelectItem}
                className="bg-neutral-control-color-20 hover:bg-neutral-control-color-50 active:bg-neutral-control-color-40 p-[9px] flex items-center justify-center border border-neutral-control-color-50 hover:shadow-sm rounded-full"
            >
                <CloseFaqIcon className="w-4.5 h-4.5 flex flex-shrink-0" />
            </button>
            <div className="w-full flex flex-col items-start gap-1.5">
                <h3 className="font-bold text-base text-text-color-100">{faqItem.title}</h3>
                <p className="w-full font-normal text-sm text-text-color-100">{faqItem.answer}</p>
            </div>
        </div>
    ) : (
        <div
            key={faqItem.title + faqItem.id}
            className="w-full px-4 py-3 flex items-center gap-4 rounded bg-neutral-control-color-10 hover:bg-neutral-control-color-20"
        >
            <button
                onClick={handleSelectItem}
                className="p-[9px] rounded-full flex items-center justify-center border border-neutral-control-color-50 hover:bg-neutral-control-color-50 active:bg-neutral-control-color-40 hover:shadow-sm"
            >
                <ArrowDownIcon className="w-4.5 h-4.5 flex items-center justify-center flex-shrink-0" />
            </button>
            <h3 className="text-base font-normal text-text-color-100">{faqItem.title}</h3>
        </div>
    );
};
