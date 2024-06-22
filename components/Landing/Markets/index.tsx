import {
    ArrowRightIcon,
    Decimal,
    Market,
    TAsset,
    Table,
    TableCellData,
    Ticker,
    fetchAssets,
    formatSignificantWithSeparators,
    useAppDispatch,
    useAppSelector,
    useSetMobileDevice,
} from "@openware/neodax-web-sdk";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import { useRouter } from "next/router";
import { getMarketsTableData } from "./getMarketsTableData";

const MARKETS_SIZE = 10;

const MarketsTable: FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(true);

    const markets = useAppSelector((state) => state.markets.markets);
    const tickers = useAppSelector((state) => state.tickers.tickers);
    const assets = useAppSelector((state) => state.assets.assets);
    const assetsFetching = useAppSelector((state) => state.assets.isFetching);
    const currentChain = useAppSelector((state) => state.user.currentChainId);
    const isMobile = useSetMobileDevice(false, 750);

    useEffect(() => {
        if (!assets?.length && !assetsFetching) {
            setLoading(true);
            dispatch(fetchAssets(currentChain));
        }
    }, [assetsFetching, currentChain]);

    const tableHeader = useMemo(() => {
        const baseHeader = [
            <span key={0} className="text-left text-text-color-60 text-xs font-[600] block py-4 pl-6">
                Pair
            </span>,
            <span key={1} className="text-right text-text-color-60 text-xs font-[600] block py-2 px-2">
                Last Price
            </span>,
            <div key={2} className="flex items-center justify-center w-full">
                <span className="text-center text-text-color-60 text-xs font-[600] md:ml-4 2xl:ml-12 block py-2 px-2">
                    24h
                </span>
            </div>,
        ];
        if (!isMobile) {
            baseHeader.push(
                <span key={4} className="text-right text-text-color-60 text-xs font-[600] block py-2 pr-6">
                    24h Volume
                </span>
            );
        }

        return baseHeader;
    }, [isMobile]);

    const mergedData = useMemo(() => {
        const combined = markets.map((market: Market) => {
            const ticker: Ticker = tickers[market.id] || {};
            const asset: TAsset =
                assets.find((asset: TAsset) => asset.symbol?.toLowerCase() === market.base_unit?.toLowerCase()) ||
                ({} as TAsset);

            return { market, ticker, baseAsset: asset };
        });

        return combined
            .filter((item) => item.ticker && item.ticker.volume)
            .sort((a, b) => Number(b.ticker.volume) - Number(a.ticker.volume))
            .slice(0, MARKETS_SIZE);
    }, [markets, tickers, assets]);

    useEffect(() => {
        if (markets.length && tickers && assets.length && !assetsFetching && mergedData.length) {
            setLoading(false);
        }
    }, [markets, tickers, assets, assetsFetching, mergedData]);

    const marketsLength = useMemo(
        () => (markets?.length > 10 || !markets?.length ? MARKETS_SIZE : markets.length),
        [markets]
    );

    const handleRowClick = useCallback(
        (row: any[]) => {
            const marketElement: any = row?.find((rowItem: any) => rowItem?.key === "market_name");
            const marketHref = marketElement?.props?.href ?? undefined;

            router.push(marketHref ?? "trading");
        },
        [router]
    );

    const { getLoadingSkeletonData, getTableData } = getMarketsTableData({ isMobile, marketsLength, mergedData });

    return (
        <section className="w-full flex flex-col items-start gap-6 max-w-[904px]">
            <h3 className="text-2xl font-medium text-text-color-100 max-md:px-[18px]">Markets</h3>
            <Table
                data={loading ? getLoadingSkeletonData() : getTableData()}
                tableHeaderTitles={tableHeader}
                tableHeaderClassNames="bg-neutral-control-color-10 mdrounded-t border-b border-divider-color-20"
                tableHeaderRowClassnames=""
                onRowClick={handleRowClick}
                tableHeaderCellClassNames="md:rounded-t"
                dataCellClassnames="px-2 py-4 hover:cursor-pointer"
                classNames="md:rounded max-md:border-y md:border border-divider-color-20"
                lastElementClass="h-full"
                defaultRowClassName="bg-body-background-color border-b last:border-b-0 border-divider-color-20"
                tableDividerColor="border-divider-color-20"
                paddingHeaderClass=""
            />
        </section>
    );
};

export default MarketsTable;
