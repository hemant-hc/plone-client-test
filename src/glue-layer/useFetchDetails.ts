import {
    useQuery,
    UseQueryResult,
    UseQueryOptions,
} from "@tanstack/react-query";
import { apiRequest, ApiRequestParams } from "../api-request";
import ConfigContainerClient from "../PloneClient";

export type TGetFetchQueryOptions<
    TResponse = any,
    TError = {},
    TSelectedData = TResponse
> = UseQueryOptions<TResponse, TError, TSelectedData> &
    Pick<ApiRequestParams, "params" | "headers" | "checkUrl">;

function getFetchQuery<TResponse = any, TSelectedData = TResponse, TError = {}>(
    path: string,
    options?: Partial<TGetFetchQueryOptions<TResponse, TError, TSelectedData>>
) {
    const { params, headers, checkUrl, ...reactQueryOptions } = options || {};

    const queryKey = [path, "get", { params }];

    const fullPath = `${
        ConfigContainerClient.ploneClientConfig?.baseURL ?? ""
    }${path}`;

    const augmentedOptions = {
        params,
        checkUrl,
        headers: {
            ...headers,
            ...ConfigContainerClient.ploneClientConfig?.headers,
        },
    };

    return {
        ...reactQueryOptions,
        queryKey,
        queryFn: () => apiRequest("get", fullPath, augmentedOptions),
    };
}

export function useFetchDetails<
    TResponse = any,
    TSelectedData = TResponse,
    TError = {}
>(
    path: string,
    options?: TGetFetchQueryOptions<TResponse, TError, TSelectedData>
): [
    TSelectedData | undefined,
    Omit<UseQueryResult<TSelectedData, TError>, "data">
] {
    const { data, ...meta } = useQuery<TResponse, TError, TSelectedData>(
        getFetchQuery<TResponse, TSelectedData, TError>(path, options)
    );
    return [data, meta];
}
