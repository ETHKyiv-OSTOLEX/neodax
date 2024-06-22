import { Component, ErrorInfo, ReactNode } from "react";
import * as Sentry from "@sentry/nextjs";
import Image from "next/image";

interface Props {
    children?: ReactNode | undefined;
    isAdmin?: boolean;
}

interface State {
    hasError: boolean;
    caughtError?: Error;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        caughtError: undefined,
    };

    public static getDerivedStateFromError(_Error: Error): State {
        return { hasError: true, caughtError: _Error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        if (!this.props?.isAdmin) {
            console.error(
                `%cAn ${error?.name} has occured! \nContact the authorities for more details.`,
                "background: #FFE7E7; color: #D10000; width: 200px;"
            );
        } else {
            console.error("Uncaught error:", error, errorInfo);
        }

        Sentry.captureException(error);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col h-full w-full pr-6 pl-6">
                    <div className="flex justify-center items-center h-screen">
                        <div className="w-1/3 h-full relative">
                            <Image alt="Server error" src="/images/500.svg" layout="fill" />
                        </div>
                        <div className="h-full flex items-center">
                            <div className="flex flex-col">
                                <div className="text-text-color-90 text-5xl font-gilmer-bold">
                                    WILL BE BACK SHORTLY{" "}
                                </div>
                                <div className="mt-5 mb-5 w-[500px] text-2xl text-text-color-90">
                                    Our website is temporarily unavailable due to maintenance.
                                    <br />
                                    Please visit us again shortly.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return <>{this.props.children}</>;
    }
}

export default ErrorBoundary as any;
