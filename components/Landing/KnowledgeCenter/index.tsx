import React, { FC } from "react";
import docs from "./index.json";

export const KnowledgeCenter: FC = () => {
    const renderItem = (item: (typeof docs)[0]) => {
        return (
            <a
                href={item.link}
                key={item.id}
                className="py-4 first:pt-0 border-b border-divider-color-20 text-text-color-80 last:border-none last:pb-0 hover:text-text-color-100 transition-all duration-300 ease-in-out hover:underline"
            >
                <p className="text-sm font-normal">{item.title}</p>
            </a>
        );
    };

    return (
        <section className="max-lg:hidden max-w-[400px]">
            <h3 className="text-2xl font-medium text-text-color-100 mb-6">Knowledge Center</h3>
            <div className="flex flex-col border border-divider-color-20 px-6 py-6 rounded max-w-[400px] w-[400px] bg-body-background-color">
                {docs.map(renderItem)}
            </div>
        </section>
    );
};
