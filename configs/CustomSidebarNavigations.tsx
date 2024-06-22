import { SidebarIcons, navigationAppItem } from "@openware/neodax-web-sdk";

export const customSidebarNavigations: navigationAppItem[] = [
    {
        name: "wallet",
        path: "https://wallet.yellow.com/",
        target: "_blank",
        activeIcon: (
            <SidebarIcons
                name="wallet"
                className="neutral-control-layer-color-40 flex-shrink-0 h-6 w-6"
                primaryColor="var(--navbar-control-layer-color-60)"
                secondaryColor="var(--navbar-control-layer-color-20)"
            />
        ),
        defaultIcon: (
            <SidebarIcons
                name="wallet"
                className="neutral-control-layer-color-40 flex-shrink-0 h-6 w-6"
                primaryColor="var(--neutral-control-layer-color-40)"
                secondaryColor="var(--neutral-control-layer-color-60)"
            />
        ),
        skipUseCurrentPath: true,
    },
];
