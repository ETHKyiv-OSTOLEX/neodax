import axios from "axios";
import qs from "qs";

export type TStrapiNewsType = {
    id: number;
    title: string;
    slug: string;
    description?: string;
    target: string;
    createdAt: string;
};

type TStrapiNewsDataItem = {
    id: number;
    attributes: TStrapiNewsType;
};

type TStrapiMeta = {
    pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
    };
};

type TStrapiNewsResponse = {
    data: TStrapiNewsDataItem[];
    meta: TStrapiMeta;
};

export const getLatestNews = async (apiBaseUrl?: string) => {
    try {
        const newsResponse = await axios.get<TStrapiNewsResponse>("/api/articles", {
            baseURL: apiBaseUrl,
            params: {
                pagination: { limit: 3 },
                fields: ["title", "slug", "description", "target", "createdAt"],
                filters: { target: { $eqi: "neodax" }, type: { $eqi: "news" } },
                sort: "createdAt:desc",
            },
            paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "brackets" }),
        });

        const { data: newsResponseData, meta } = newsResponse?.data;

        return meta?.pagination?.total
            ? newsResponseData?.map((newsDataItem: TStrapiNewsDataItem) => ({
                  ...newsDataItem.attributes,
                  id: newsDataItem.id,
              }))
            : [];
    } catch (error) {
        console.log("Error while fetching news", error);

        return [];
    }
};
