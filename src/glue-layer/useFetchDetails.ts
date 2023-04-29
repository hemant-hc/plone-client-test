import { useQuery } from "@tanstack/react-query";
import { apiRequest, ApiRequestParams } from "../api-request";

function getFetchQuery(path: string, options?: ApiRequestParams) {
    const { params } = options || {};

    const queryKey = [path, "get", "content", params];

    return {
        queryKey,
        queryFn: () => apiRequest("get", path, options),
    };
}

export function useFetchDetails(path: string, options?: ApiRequestParams) {
    const { data, ...meta } = useQuery(getFetchQuery(path, options));
    return [data, meta];
}
