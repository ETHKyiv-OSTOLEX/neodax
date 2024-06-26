import { getPublicConfig } from "../../configs/app";
import { appTitle, PositionsWidget, useSetMobileDevice, withClearportAuth } from "@openware/neodax-web-sdk";
import classnames from "classnames";
import Head from "next/head";
import posthog from "posthog-js";
import { useCallback, useEffect } from "react";
import { useIntl } from "react-intl";

const PositionsPage: React.FC = () => {
    const intl = useIntl();
    const { defaultAppTitle } = getPublicConfig();

    const isMobile = useSetMobileDevice(false, 655);

    const translate = useCallback((id: string) => intl.formatMessage({ id }), [intl]);

    useEffect(() => {
        const pageViewData = {
            type: "paveView",
            name: "positions_view",
        };

        posthog?.capture("page_view", pageViewData);
    }, []);

    return (
        <>
            <Head>
                <title>{appTitle(defaultAppTitle, translate("page.tab.header.positions"))}</title>
            </Head>
            <div
                className={classnames(
                    "flex flex-col w-full h-screen max-h-screen bg-body-background-color",
                    isMobile ? "pb-20 pt-4 overflow-y-auto" : "p-4"
                )}
            >
                <PositionsWidget />
            </div>
        </>
    );
};

export const getServerSideProps = async () => {
    return { props: {} };
};

export default withClearportAuth(PositionsPage);
