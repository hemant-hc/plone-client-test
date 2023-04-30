import { useQuery } from "@tanstack/react-query";
import { apiRequest, ApiRequestParams } from "../api-request";
import ConfigContainerClient from "../PloneClient";

function getFetchQuery(path: string, options?: ApiRequestParams) {
    const { params } = options || {};

    const queryKey = [path, "get", "content", params];

    const fullPath = `${
        ConfigContainerClient.ploneClientConfig?.baseURL ?? ""
    }/${path}`;

    const augmentedOptions = {
        ...options,
        headers: {
            ...options?.headers,
            ...ConfigContainerClient.ploneClientConfig?.headers,
        },
    };

    return {
        queryKey,
        queryFn: () => apiRequest("get", fullPath, augmentedOptions),
    };
}

export function useFetchDetails(path: string, options?: ApiRequestParams) {
    const { data, ...meta } = useQuery(getFetchQuery(path, options));
    return [data, meta];
}
