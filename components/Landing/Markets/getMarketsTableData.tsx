import {
    ArrowRightIcon,
    Decimal,
    Market,
    TAsset,
    Ticker,
    formatSignificantWithSeparators,
} from "@openware/neodax-web-sdk";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

const USDSymbol = "$";

interface IgetMarketsTableDataProps {
    mergedData: {
        market: Market;
        ticker: Ticker;
        baseAsset: TAsset;
    }[];
    isMobile?: boolean;
    marketsLength: number;
}

export const getMarketsTableData = ({ isMobile, mergedData, marketsLength }: IgetMarketsTableDataProps) => {
    const getTableData = () => {
        return mergedData.map(({ baseAsset, ticker, market }) => {
            const isPriceChangeNegative = ticker?.price_change_percent < 0;

            const baseTableData = [
                <Link
                    href={`/trading/${market.id}`}
                    key={"market_name"}
                    className="flex items-center pl-2.5 w-[100px] gap-3 no-underline"
                >
                    <Image
                        src={baseAsset?.logoURI ?? ""}
                        width={32}
                        height={32}
                        alt={market?.base_unit}
                        className="rounded-full w-8 h-8 flex-shrink-0"
                    />
                    <div className="w-full flex items-center justify-start">
                        <span className="text-text-color-100 text-sm font-medium">
                            {market?.base_unit?.toUpperCase()}
                        </span>
                        <span className="text-text-color-60 text-sm font-medium">
                            /{market?.quote_unit?.toUpperCase()}
                        </span>
                    </div>
                </Link>,
                <div
                    key={1}
                    className="text-text-color-100 text-sm text-right font-medium whitespace-nowrap min-w-[120px] sm:min-w-[160px]"
                >
                    {USDSymbol}
                    {ticker?.last ? formatSignificantWithSeparators(String(ticker.last)) : 0}
                </div>,
                <div key={2} className="w-full flex items-center justify-center">
                    <div
                        className={classNames(
                            "md:ml-4 2xl:ml-12 font-medium pl-1 pr-2 py-0.5 rounded-sm flex justify-center gap-0.5 items-center w-fit",
                            isPriceChangeNegative ? "bg-system-red-10" : "bg-system-green-10"
                        )}
                    >
                        <ArrowRightIcon
                            className={classNames(
                                "duration-0 w-3 h-3 flex-shrink-0 stroke-1",
                                isPriceChangeNegative
                                    ? "fill-system-red-60 rotate-90"
                                    : "fill-system-green-60 -rotate-90"
                            )}
                        />
                        <div className="text-text-color-100 text-sm text-center">
                            <Decimal fixed={2} thousSep=",">
                                {Math.abs(ticker?.price_change_percent ?? 0)}
                            </Decimal>
                            %
                        </div>
                    </div>
                </div>,
            ];

            if (!isMobile) {
                baseTableData.push(
                    <div key={3} className="text-text-color-100 text-sm text-right font-medium pr-4 whitespace-nowrap">
                        {USDSymbol}
                        {ticker?.volume ? formatSignificantWithSeparators(String(ticker.volume)) : 0}
                    </div>
                );
            }

            return baseTableData;
        });
    };

    const getLoadingSkeletonData = () => {
        const skeletonItems = [];
        for (let i = 0; i < marketsLength; i++) {
            const baseLoadingSkeletonItems = [
                <Skeleton
                    key={"Skeleton0"}
                    width={100}
                    height={32}
                    borderRadius={2}
                    containerClassName="w-full h-8 flex items-center"
                    baseColor="var(--neutral-control-color-10)"
                    highlightColor="var(--neutral-control-color-40)"
                />,
                <Skeleton
                    key={"Skeleton1"}
                    width={120}
                    height={32}
                    borderRadius={2}
                    className="min-w-[120px] sm:min-w-[160px]"
                    containerClassName="w-full h-8 flex items-center justify-end"
                    baseColor="var(--neutral-control-color-10)"
                    highlightColor="var(--neutral-control-color-40)"
                />,
                <Skeleton
                    key={"Skeleton2"}
                    width={64}
                    height={32}
                    borderRadius={2}
                    className="md:ml-4 2xl:ml-12 min-w-[64px]"
                    containerClassName="w-full h-8 flex items-center justify-center"
                    baseColor="var(--neutral-control-color-10)"
                    highlightColor="var(--neutral-control-color-40)"
                />,
            ];

            if (!isMobile) {
                baseLoadingSkeletonItems.push(
                    <Skeleton
                        key={"Skeleton3"}
                        width={120}
                        height={32}
                        borderRadius={2}
                        className="md:ml-4 2xl:ml-12 min-w-[120]"
                        containerClassName="w-full h-8 flex items-center justify-end pr-4"
                        baseColor="var(--neutral-control-color-10)"
                        highlightColor="var(--neutral-control-color-40)"
                    />
                );
            }

            skeletonItems.push(baseLoadingSkeletonItems);
        }

        return skeletonItems;
    };

    return { getTableData, getLoadingSkeletonData };
};
