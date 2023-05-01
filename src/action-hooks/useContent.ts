import { ApiRequestParams } from "../api-request";
import { useMutations, useFetchDetails } from "../glue-layer";
import { TGetFetchQueryOptions } from "../glue-layer/useFetchDetails";
import { MUTATION_TYPES } from "../glue-layer/identifiers";

type TComponents =
    | "actions"
    | "aliases"
    | "breadcrumbs"
    | "contextnavigation"
    | "navigation"
    | "types"
    | "workflow";

interface IGetContentResponse {
    "@components": {
        [key in TComponents]: {
            "@id": string;
        };
    };
    "@id": string;
    "@type": string;
    UID: string;
    allow_discussion: null;
    blocks: {
        [k in string]: {
            "@id": string;
        } & Record<string, unknown>;
    };
    blocks_layout: {
        items: string[];
    };
    contributors: [];
    creators: string[];
    description: string;
    effective: null;
    exclude_from_nav: boolean;
    expires: null;
    id: string;
    is_folderish: boolean;
    items: Array<{
        "@id": string;
        "@type": string;
        description: string;
        image_field: null;
        image_scales: null;
        review_state: string;
        title: string;
    }>;
    items_total: number;
    language: {
        title: string;
        token: string;
    };
    lock: {
        locked: boolean;
        stealable: boolean;
    };
    parent: {};
    relatedItems: [];
    review_state: null;
    rights: string;
    subjects: [];
    table_of_contents: null;
    title: string;
}

type getContentArgs = {
    path: string;
    version?: string;
    page?: number;
    fullObjects?: boolean;
};

export const useGetContent = (
    { path, version, page, fullObjects }: getContentArgs,
    options?: Pick<TGetFetchQueryOptions, "enabled" | "onSuccess" | "onError">
) => {
    options = {
        ...options,
    };
    if (version) {
        path = `${path}/@history/${version}`;
    }

    return useFetchDetails<IGetContentResponse>(path, {
        params: {
            ...(version && { version }),
            ...(fullObjects && { fullobjects: fullObjects }),
        },
        ...options,
    });
};

export interface Content {
    "@id"?: string;
    title: string;
}

interface IAddContentArgs {
    path: string;
}

export const useAddContent = ({ path }: IAddContentArgs) => {
    return useMutations(path, {
        type: MUTATION_TYPES.create,
    });
};
