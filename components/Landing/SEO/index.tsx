import React, { useCallback, useState } from "react";
import SEOtext from "./SEOtext.json";
import classNames from "classnames";

export const SEOBlock: React.FC = () => {
    const [showMore, setShowMore] = useState<boolean>(false);

    const toggleMore = useCallback(() => setShowMore((prev) => !prev), []);

    return (
        <div
            className={classNames("w-full flex flex-col items-start gap-1.5 max-w-full", {
                "3xl:max-w-[calc(100%-424px)]": !showMore,
            })}
        >
            <h1 className="font-semibold text-xl lg:text-2xl text-text-color-100">Block for SEO text</h1>
            <div className="font-normal text-base text-text-color-60 relative overflow-hidden">
                {showMore ? SEOtext.extended : SEOtext.initial}
                {!showMore && (
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-b from-transparent to-main-background-color pointer-events-none" />
                )}
            </div>
            <button
                onClick={toggleMore}
                className="text-sm font-semibold text-secondary-control-color-60 hover:text-secondary-control-color-90 active:text-secondary-control-color-80"
            >
                {showMore ? "Show less" : "More"}
            </button>
        </div>
    );
};
