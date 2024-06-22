import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from "next/document";
import React from "react";
import { CustomizationSettingsInterface, generateInitialCSS, getColorConfigFiles } from "../utils/themeUtils";

interface Props {
    lightColorsConfig: CustomizationSettingsInterface | null;
    darkColorsConfig: CustomizationSettingsInterface | null;
}

class MyDocument extends Document<Props> {
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps & Props> {
        const initialProps = await Document.getInitialProps(ctx);

        const { darkColorsConfig, lightColorsConfig } = getColorConfigFiles();

        return { ...initialProps, lightColorsConfig, darkColorsConfig };
    }

    render() {
        const { lightColorsConfig, darkColorsConfig } = this.props;
        const { htmlStyles, bodyStyles } = generateInitialCSS(lightColorsConfig, darkColorsConfig);

        return (
            // @ts-ignore
            <Html style={{ cssText: htmlStyles }}>
                <Head></Head>
                {/* @ts-ignore */}
                <body style={{ cssText: bodyStyles }}>
                    <Main />
                    <div id="modal_portal"></div>
                    <div id="overlay_portal"></div>
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
