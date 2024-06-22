import React from "react";

interface IFaqIconProps {
    className?: string;
    fillColor?: string;
}

export const ArrowDownIcon: React.FC<IFaqIconProps> = ({
    className,
    fillColor = "var(--neutral-control-layer-color-40)",
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            stroke={fillColor}
            strokeWidth={3}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
    );
};

export const CloseFaqIcon: React.FC<IFaqIconProps> = ({
    className,
    fillColor = "var(--neutral-control-layer-color-40)",
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            stroke={fillColor}
            strokeWidth={3}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    );
};
