import {
    ClearportAccount,
    Toolbar,
    appTitle,
    isBrowser,
    klineFetch,
    openOrdersFetch,
    setCurrentMarket,
    useAppDispatch,
    useAppSelector,
    useSetMobileDevice,
    withClearportAuth,
} from "@openware/neodax-web-sdk";
import classnames from "classnames";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { posthog } from "posthog-js";
import { FC, JSX, useCallback, useEffect, useMemo, useRef } from "react";
import { useIntl } from "react-intl";
import { ChartAndOrderBookWidget } from "../../components";
import { getPublicConfig } from "../../configs/app";

const TradingChart = dynamic(() => import("@openware/neodax-web-sdk"), {
    ssr: false,
});

const OrdersWithPositions = dynamic(
    () => import("@openware/neodax-web-sdk").then((mod: any) => mod.OrdersWithPositions),
    {
        ssr: false,
    }
);

const OrderBookWidget = dynamic(() => import("@openware/neodax-web-sdk").then((mod: any) => mod.OrderBookWidget), {
    ssr: false,
});

const OrderFormWidget = dynamic(() => import("@openware/neodax-web-sdk").then((mod: any) => mod.OrderFormWidget), {
    ssr: false,
});

const TradingByMarket: FC<{}> = (): JSX.Element => {
    const orderFormRef = useRef<HTMLDivElement | null>(null);

    const toolbarRef = useRef<HTMLDivElement | null>(null);

    const intl = useIntl();
    const { defaultAppTitle } = getPublicConfig();

    const router = useRouter();
    const { marketID } = router.query;
    const markets = useAppSelector((state) => state.markets.markets);
    const currentMarket = useAppSelector((state) => state.markets.currentMarket);

    const marketSelectorActive = useAppSelector((state) => state.globalSettings.marketSelectorActive);
    const isMobile = useSetMobileDevice();
    const isHorizontalMobile = useSetMobileDevice(true);

    const translate = useCallback((id: string) => intl.formatMessage({ id }), [intl]);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!markets.length) {
            dispatch(klineFetch());
            dispatch(openOrdersFetch());
        }
    }, [dispatch, markets.length]);

    useEffect(() => {
        if (isBrowser() && currentMarket) {
            const pageViewData = {
                type: "paveView",
                name: "trade_view",
                params: {
                    market: currentMarket.id,
                },
            };

            posthog?.capture("page_view", pageViewData);

            localStorage.setItem("last_market", currentMarket.id);
        }
    }, [currentMarket]);

    useEffect(() => {
        if (currentMarket && currentMarket.id === marketID) {
            return;
        }

        if (!marketID) {
            return;
        }

        const marketIDFromRoute = (marketID as string).toLowerCase();
        const marketFromRoute = markets.find((market) => market.id.toLowerCase() === marketIDFromRoute);
        const [fallbackMarket] = markets;
        if (marketFromRoute) {
            // TODO: only use it in browser
            dispatch(setCurrentMarket(marketFromRoute || fallbackMarket));
        } else {
            fallbackMarket?.id && router.push(`/trading/${fallbackMarket.id}`);
        }
    }, [markets, marketID, currentMarket, dispatch, router]);

    const cnWrapper = useMemo(() => {
        return classnames("w-full overflow-y-hidden h-full flex flex-col", {
            "blur-sm": marketSelectorActive,
        });
    }, [marketSelectorActive]);

    const orderBookHeightStyle = useMemo(() => {
        if (orderFormRef.current && toolbarRef.current) {
            const formAndConnectHeight = orderFormRef.current.offsetHeight + toolbarRef.current.offsetHeight + 20; // orderform height + connect widget height + paddings and gap
            return `calc(100vh - ${formAndConnectHeight}px)`;
        }

        return "100%";
    }, [orderFormRef.current, toolbarRef.current]);

    const renderDesktop = useMemo(() => {
        return (
            <div className={cnWrapper}>
                <div className="toolbar p-1 w-full h-1/6 max-h-16 relative">
                    <div
                        ref={toolbarRef}
                        className="toolbar w-full h-full max-h-16 border border-divider-color-20 rounded shadow bg-body-background-color flex items-center justify-between overflow-y-hidden no-scrollbar gap-4  overflow-x-auto"
                    >
                        <Toolbar desktopHeaderToolbarClasses="py-2 flex justify-center items-center w-full min-w-fit md:text-xs overflow-x-auto overflow-y-hidden no-scrollbar bg-body-background-color" />
                        <ClearportAccount
                            connectButtonCustomizationProps={{
                                connectButtonClassName:
                                    "h-[34px] sm:h-[42px] mr-1 sm:mr-2 shadow-sm rounded-md flex items-center justify-between border border-neutral-control-color-70 bg-neutral-control-color-0 hover:bg-neutral-control-color-20 active:bg-neutral-control-color-0 py-[7px] sm:py-[9px] pl-2 sm:pl-3 pr-2.5 sm:pr-4",
                            }}
                            userInfoCustomizationProps={{
                                userInfoContainerClassName:
                                    "pl-1.5 sm:pl-3 py-1.5 sm:py-2 w-full h-full flex items-center justify-between gap-1.5 sm:gap-3 hover:cursor-pointer",
                                changeNetworkDropdownCustomizationProps: {
                                    dropdownContainerClassName:
                                        "absolute shadow z-[20] top-12 right-16 bg-main-background-color rounded min-w-[160px] sm:min-w-[200px] w-fit flex flex-col",
                                },
                            }}
                            containerClassnames="pr-3 flex items-center justify-center flex-shrink-0"
                        />
                    </div>
                </div>
                <div className="flex flex-row h-5/6 flex-grow">
                    <div className="flex flex-col h-full w-full md:w-3/5 xl:w-7/12 flex-grow">
                        <div className="toolbar w-full h-4/6 px-1">
                            <TradingChart />
                        </div>
                        <div className="toolbar w-full h-2/6 p-1">
                            <OrdersWithPositions />
                        </div>
                    </div>
                    <div className="flex flex-col h-full md:w-2/5 max-xl:max-w-[256px] xl:w-64 2xl:w-72 pr-1 gap-1">
                        <div ref={orderFormRef} className="toolbar w-full h-auto">
                            <OrderFormWidget />
                        </div>
                        <div style={{ height: orderBookHeightStyle }} className="toolbar w-full">
                            <OrderBookWidget />
                        </div>
                    </div>
                </div>
            </div>
        );
    }, [cnWrapper, orderBookHeightStyle, orderFormRef?.current?.offsetHeight, toolbarRef?.current?.offsetHeight]);

    const renderMobile = useMemo(() => {
        return (
            <div className="w-full mb-10">
                <Toolbar />
                <div className={cnWrapper}>
                    <div className="flex flex-col w-full flex-grow">
                        <ChartAndOrderBookWidget />
                    </div>
                </div>
            </div>
        );
    }, [cnWrapper]);

    return (
        <>
            <Head>
                <title>{appTitle(defaultAppTitle, translate("page.tab.header.trading"))}</title>
            </Head>
            {!isMobile && !isHorizontalMobile ? renderDesktop : renderMobile}
        </>
    );
};

export const getServerSideProps = async () => {
    return { props: {} };
};

export default withClearportAuth(TradingByMarket);
