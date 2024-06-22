import Link from "next/link";
import React, { FC, lazy, Suspense } from "react";

const HeroIcon = lazy(() => import("../../assets/landing/Hero"));

const HeroSection: FC = () => {
    return (
        <section className="bg-primary-cta-color-60 w-full flex items-center justify-center px-[18px] md:px-8 lg:px-12 py-[60px] min-[520px]:py-8">
            <div className="max-w-full w-full 3xl:w-[1328px]">
                <div className="flex items-center justify-between gap-8 lg:gap-16">
                    <div className="max-lg:max-w-[480px] max-lg:min-w-[340px] lg:max-w-[600px] flex flex-col items-start gap-6">
                        <h1 className="font-bold text-3xl md:text-5xl lg:text-6xl text-primary-cta-layer-color-60">
                            Revolutionizing Your Trading Journey
                        </h1>
                        <p className="text-lg font-[400] text-primary-cta-layer-color-60">
                            Trade digital assets without ever worrying about your funds. DEX Security. CEX User
                            Experience.
                        </p>
                        <Link
                            href="/trading"
                            className="py-2.5 w-[165px] flex items-center justify-center text-sm text-neutral-control-layer-color-90 bg-neutral-control-color-0 border border-neutral-control-color-70 hover:border-neutral-control-color-80 hover:bg-neutral-control-color-80 duration-200"
                        >
                            Start Trading
                        </Link>
                    </div>
                    <Suspense fallback={null}>
                        <HeroIcon className="max-[720px]:hidden min-w-[220px] max-lg:max-h-[320px] lg:w-[572px] lg:h-[420px]" />
                    </Suspense>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
