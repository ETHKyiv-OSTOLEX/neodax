import Link from "next/link";
import React, { useCallback, useMemo } from "react";
import { FOOTER_ITEMS, getSocialIcon } from "./footerItems";

type TFooterLinkItem = {
    title: string;
    url: string;
};

export interface CustomFooterProps {
    footerLogoIcon?: JSX.Element;
}

export const CustomFooter: React.FC<CustomFooterProps> = ({ footerLogoIcon }) => {
    const renderLinkItem = useCallback(
        (item: TFooterLinkItem) => (
            <Link
                className="font-normal text-text-color-100 text-sm whitespace-nowrap"
                href={item.url}
                key={item.title}
            >
                {item.title}
            </Link>
        ),
        []
    );

    const renderLinks = useCallback(
        (links: TFooterLinkItem[]) => (
            <div className="flex flex-col items-start gap-3">{links.map(renderLinkItem)}</div>
        ),
        []
    );

    const renderSocial = useCallback(
        (social: { title: string; url: string }, i: number) => (
            <Link key={i} href={social.url} target="_blank" rel="noopener noreferrer" className="after:hidden">
                {getSocialIcon(social.title, "var(--text-color-30)")}
            </Link>
        ),
        []
    );

    const renderSocials = useMemo(() => {
        const socials = FOOTER_ITEMS.socials;

        return (
            <div className="flex lg:items-center max-lg:gap-[18px] gap-6 max-lg:flex-col max-lg:items-start">
                <div className="flex items-center gap-6">{socials?.slice(0, 4).map(renderSocial)}</div>
                <div className="flex items-center gap-6">{socials?.slice(4).map(renderSocial)}</div>
            </div>
        );
    }, []);

    return (
        <footer className="flex w-full items-center justify-center border-t border-divider-color-20 px-[18px] md:px-8 md-lg:px-12 lg:px-[84px] max-md:mb-16 bg-footer-background-color">
            <div className="max-w-full w-full 3xl:w-[1328px] flex flex-col items-start">
                <div className="w-full flex max-md-lg:flex-col items-start md-lg:items-center gap-12 md-lg:gap-16 lg:gap-[120px] 3xl:gap-[164px] border-b border-divider-color-20 py-[72px]">
                    <div className="flex flex-col items-start gap-4">
                        <div className="flex flex-col items-start gap-1">
                            <div className="h-10 w-[110px]">{footerLogoIcon}</div>
                            <p className="font-normal text-sm leading-6 text-text-color-60 whitespace-nowrap">
                                A better way of decentralised trading
                            </p>
                        </div>
                        {renderSocials}
                    </div>
                    <div className="w-full flex max-md-lg:flex-col items-start md-lg:items-center gap-3 max-md-lg:justify-normal max-2xl:justify-between 2xl:gap-[120px] 3xl:gap-[164px]">
                        {renderLinks(FOOTER_ITEMS.links.legal)}
                        {renderLinks(FOOTER_ITEMS.links.articles)}
                        {renderLinks(FOOTER_ITEMS.links.docs)}
                    </div>
                </div>
                <div className="flex items-center justify-center gap-2.5 w-full py-6">
                    <span className="text-text-color-50 font-medium text-xs">
                        © {new Date().getFullYear()} All rights reserved.
                    </span>
                    <div className="flex items-center gap-1.5">
                        <span className="text-text-color-70 font-normal text-xs">Powered by</span>{" "}
                        <div className="h-5 ">{footerLogoIcon}</div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
