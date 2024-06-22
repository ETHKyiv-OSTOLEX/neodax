import React, { FC } from "react";
import { TStrapiNewsType } from "./GetLatestNews";

interface LatestNewsProps {
    news: TStrapiNewsType[];
}

const LatestNews: FC<LatestNewsProps> = ({ news }) => {
    const renderNews = (item: TStrapiNewsType) => {
        return (
            <div
                key={item.id}
                className="w-full lg:max-w-[400px] border border-divider-color-10 p-[18px] rounded bg-body-background-color"
            >
                <h4 className="text-base font-semibold text-text-color-100">{item.title}</h4>
                <p className="text-text-color-80 font-normal text-sm mt-1 mb-2 line-clamp-2 break-all text-ellipsis">{item.description}</p>
                <a
                    href={`https://yellow.com/news/${item.slug}`}
                    className="text-secondary-control-color-80 tex-sm font-semibold flex items-center group hover:text-secondary-control-color-90 duration-200"
                >
                    Read more
                    <svg className="ml-2" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                            className="fill-current group-hover:fill-secondary-control-color-90"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10.2929 3.29289C10.6834 2.90237 11.3166 2.90237 11.7071 3.29289L17.7071 9.29289C18.0976 9.68342 18.0976 10.3166 17.7071 10.7071L11.7071 16.7071C11.3166 17.0976 10.6834 17.0976 10.2929 16.7071C9.90237 16.3166 9.90237 15.6834 10.2929 15.2929L14.5858 11L3 11C2.44772 11 2 10.5523 2 10C2 9.44771 2.44772 9 3 9H14.5858L10.2929 4.70711C9.90237 4.31658 9.90237 3.68342 10.2929 3.29289Z"
                            fill="var(--secondary-control-color-80)"
                        />
                    </svg>
                </a>
            </div>
        );
    };

    return (
        <section className="w-full lg:max-w-[400px] max-md:px-[18px]">
            <h3 className="text-2xl font-medium text-text-color-100 mb-6">Latest News</h3>
            <div className="flex flex-wrap max-lg:items-center lg:flex-col lg:items-start gap-6">
                {news.map(renderNews)}
            </div>
        </section>
    );
};

export default LatestNews;
