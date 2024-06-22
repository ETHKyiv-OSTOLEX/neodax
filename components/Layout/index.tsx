import {
    AccountCenter,
    Alerts,
    ButtonProps,
    DisconnectChannelButton,
    MarketSelectorWidget,
    OpenStreamModal,
    SettlementOverlay,
    Layout as SharedLayout,
    SidebarProps,
    SignChallengeTokenModal,
    WalletSendTransactionModal,
    WelcomeMessage,
    navigationApp,
    navigationAppItem,
    useAppSelector,
} from "@openware/neodax-web-sdk";
import { JSX, PropsWithChildren, useMemo } from "react";
import { customMobileNavigation, navigation, navigationLoggedIn } from "../../configs/navigation";

import { CustomFooter } from "./CustomFooter";
import { CustomHeader } from "./CustomHeader";
import ErrorBoundary from "../ErrorBoundary";
import Image from "next/image";
import classnames from "classnames";
import { customSidebarNavigations } from "../../configs/CustomSidebarNavigations";
import { getPublicConfig } from "../../configs/app";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";

export function Layout(props: PropsWithChildren<{ className?: string; withoutLayout?: boolean }>): JSX.Element {
    const markets = useAppSelector((state) => state.markets.markets);
    const user = useAppSelector((state) => state.user.user);
    const currentMarket = useAppSelector((state) => state.markets.currentMarket);
    const colorTheme = useAppSelector((state: any) => state.globalSettings.color);
    const isFinexAuthenticated = useAppSelector((state: any) => state.clearportAuth.isFinexAuthenticated);
    const isLoggedin = useMemo(
        () => user?.isJwtExist && isFinexAuthenticated,
        [user?.isJwtExist, isFinexAuthenticated]
    );

    const intl = useIntl();
    const router = useRouter();

    const { landingPageMode, walletPageMode } = getPublicConfig();

    const navigations = useMemo((): navigationApp[] => {
        const mainNavigation = isLoggedin ? navigationLoggedIn : navigation;
        const filteredNavigation = mainNavigation.filter((nav) => {
            if (nav.name === "Home" && !landingPageMode) {
                return false;
            }

            return true;
        });

        return [
            {
                app: "mainapp",
                pathnames: filteredNavigation.map<navigationAppItem>((nav: navigationAppItem) => {
                    if (nav.submenus?.length) {
                        return {
                            ...nav,
                            name: intl.formatMessage({
                                id: `page.sidebar.navigation.${nav.name.toLowerCase()}`,
                            }),
                            submenus: nav.submenus.map((submenu: any) => {
                                return {
                                    ...submenu,
                                    name: intl.formatMessage({
                                        id: `page.sidebar.navigation.${nav.name.toLowerCase()}.submenu.${submenu.name.toLowerCase()}`,
                                    }),
                                };
                            }),
                        };
                    }

                    let path = nav.path;
                    if (nav.path === "/trading" && markets?.length) {
                        if (currentMarket) {
                            path = `${nav.path}/${currentMarket.id}`;
                        } else {
                            path = `${nav.path}/${markets[0].id}`;
                        }
                    }

                    return {
                        ...nav,
                        name: intl.formatMessage({
                            id: `page.sidebar.navigation.${nav.name.toLowerCase()}`,
                        }),
                        path,
                    };
                }),
            },
            {
                app: "wallet",
                withSeperator: true,
                pathnames: customSidebarNavigations.map<navigationAppItem>((nav: navigationAppItem) => {
                    const showWalletPage = walletPageMode && nav.name === "wallet";
                    return {
                        ...nav,
                        name: intl.formatMessage({
                            id: `page.sidebar.navigation.${nav.name.toLowerCase()}`,
                        }),
                        path: showWalletPage ? "/wallet" : nav.path,
                        skipUseCurrentPath: true,
                        target: showWalletPage ? "_self" : nav.target,
                    };
                }),
            },
        ];
    }, [markets, intl, currentMarket, isLoggedin, landingPageMode, customSidebarNavigations, walletPageMode]);

    const mobileNavigation = useMemo((): navigationApp[] => {
        if (!customMobileNavigation) return [];

        const filteredNavigation = customMobileNavigation.filter((nav) => {
            if (nav.name === "Home" && !landingPageMode) {
                return false;
            }

            return true;
        });

        return [
            {
                app: "mainapp",
                pathnames: filteredNavigation.map<navigationAppItem>((nav: navigationAppItem) => {
                    if (nav.submenus?.length) {
                        return {
                            ...nav,
                            name: intl.formatMessage({
                                id: `page.sidebar.navigation.${nav.name.toLowerCase()}`,
                            }),
                            submenus: nav.submenus.map((submenu: any) => {
                                return {
                                    ...submenu,
                                    name: intl.formatMessage({
                                        id: `page.sidebar.navigation.${nav.name.toLowerCase()}.submenu.${submenu.name.toLowerCase()}`,
                                    }),
                                };
                            }),
                        };
                    }

                    return {
                        ...nav,
                        name: intl.formatMessage({
                            id: `page.sidebar.navigation.${nav.name.toLowerCase()}`,
                        }),
                        path:
                            nav.path === "/trading" && markets?.length
                                ? currentMarket
                                    ? `${nav.path}/${currentMarket.id}`
                                    : `${nav.path}/${markets[0].id}`
                                : nav.path,
                    };
                }),
            },
        ];
    }, [currentMarket, intl, landingPageMode, markets]);

    const Logo = useMemo(
        () => (
            <Image
                alt="Logo"
                height={110}
                width={40}
                src={`/images/${colorTheme !== "dark" ? "Light" : "Dark"}Logo.svg`}
                className="focus:outline-none focus:ring-none w-full h-full"
            />
        ),
        [colorTheme]
    );

    const buttonsList: ButtonProps[] = useMemo(
        () => [
            {
                name: "disconnect",
                component: <DisconnectChannelButton />,
                label: intl.formatMessage({
                    id: "page.body.sidebar.button.disconnect.label",
                }),
            },
        ],
        []
    );

    const sidebarProps: SidebarProps = {
        currentApp: "mainapp",
        navigations,
        mobileNavigation,
        navOverlayClasses: "relative bg-navbar-background-color flex-1 flex flex-col max-w-[260px] pt-5 pb-4",
        classNames: "bg-navbar-background-color sm:border-r border-divider-color-20",
        bottomClasses:
            "fixed w-screen bottom-0 z-30 flex-shrink-0 md:hidden max-md:flex h-16 bg-navbar-background-color border-t border-divider-color-20 w-full left-0",
        navActiveClassNames: "bg-navbar-control-bg-color-10 text-navbar-control-layer-color-60",
        navGroupActiveClassNames: "bg-navbar-control-bg-color-10 rounded-lg text-navbar-control-layer-color-60",
        navInactiveClassNames: "text-neutral-control-layer-color-60 hover:bg-navbar-control-bg-color-10",
        isLoggedin: false,
        colorTheme,
        logo: Logo,
        buttonsList,
        renderNavgroupSeperator: false,
    };

    if (props.withoutLayout) {
        return props.children as JSX.Element;
    }

    return (
        <SharedLayout
            containerClassName={props.className}
            sidebarProps={sidebarProps}
            customHeader={router.pathname === "/" && <CustomHeader headerLogoIcon={Logo} />}
            customFooter={router.pathname === "/" && <CustomFooter footerLogoIcon={Logo} />}
            mainClassName={classnames(
                "flex-1 flex flex-col relative focus:outline-none",
                router.pathname.includes("/network") ? "overflow-hidden" : "overflow-y-auto"
            )}
            headerProps={{ show: false }}
            wrapperClassname={"flex flex-col w-0 flex-1 h-screen"}
        >
            <ErrorBoundary isAdmin={false}>
                <Alerts />
                {props?.children}
                <MarketSelectorWidget />
                <AccountCenter />
                <SignChallengeTokenModal />
                <WelcomeMessage />
                <OpenStreamModal />
                <SettlementOverlay />
                <WalletSendTransactionModal />
            </ErrorBoundary>
        </SharedLayout>
    );
}
