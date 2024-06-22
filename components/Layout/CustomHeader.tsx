import { ClearportAccount, useSetMobileDevice } from "@openware/neodax-web-sdk";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC } from "react";

export interface HeaderOptions {
    customHeaderContent?: React.ReactNode;
    /**
     * Response from server for detecting mobile device
     */
    responseIsMobile?: boolean;
}

export interface CustomHeaderProps {
    options?: HeaderOptions;
    headerLogoIcon?: JSX.Element;
    show?: boolean;
}

export const AppHeader: FC<CustomHeaderProps> = ({ options, headerLogoIcon, show = true }: CustomHeaderProps) => {
    const router = useRouter();

    const logoClickHandler = () => {
        router.asPath === "/" ? window.scrollTo({ top: 0, behavior: "smooth" }) : null;
    };

    if (!show) {
        return <></>;
    }

    return (
        <header className="w-full flex justify-between px-[18px] md:px-6 lg:px-9 py-2.5 bg-navbar-background-color">
            <Link className="h-11 w-32 cursor-pointer block" href="/" onClick={logoClickHandler}>
                {headerLogoIcon}
            </Link>
            <ClearportAccount
                containerClassnames="rounded flex items-center justify-center"
                connectButtonCustomizationProps={{
                    customConnectLabel: "Connect",
                    showNotificationCenterButton: false,
                    connectButtonClassName:
                        "h-[42px] shadow-sm rounded-[20px] flex items-center justify-between border border-neutral-control-color-70 bg-neutral-control-color-0 hover:bg-neutral-control-color-20 active:bg-neutral-control-color-0 py-[9px] pl-3 pr-4",
                    connectButtonWalletIconClassName: "w-6 h-6 flex-shrink-0",
                    connectButtonTextClassName: "ml-2 text-base text-neutral-control-layer-color-70",
                    openNotificationCenterButtonClassName:
                        "rounded border border-neutral-control-color-70 bg-neutral-control-color-0 hover:bg-neutral-control-color-20 active:bg-neutral-control-color-0 p-2.5",
                    connectButtonSkeletonClassName: "w-ful h-full",
                    connectButtonSkeletonContainerClassName:
                        "h-[42px] shadow-sm rounded-[20px] flex items-center justify-between border border-neutral-control-color-70 bg-neutral-control-color-0 min-w-[120px]",
                }}
                userInfoCustomizationProps={{
                    userAddressTextClassName:
                        "py-0.5 font-medium text-[10px] leading-3 sm:text-xs sm:leading-4 text-text-color-100 whitespace-nowrap",
                    userInfoContainerClassName:
                        "py-1.5 sm:py-2 w-full h-full flex items-center justify-between gap-1.5 sm:gap-3 hover:cursor-pointer relative",
                }}
            />
        </header>
    );
};

export const CustomHeader = React.memo(AppHeader);
