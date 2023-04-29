import {
    UseMutateAsyncFunction,
    UseMutationResult,
    useMutation,
} from "@tanstack/react-query";
import { apiRequest, ApiRequestParams } from "../api-request";
import { MUTATION_TYPES } from "./identifiers";

export function useMutations(
    path: string,
    options?: Omit<ApiRequestParams, "data"> & { type: string }
): [
    UseMutateAsyncFunction<any, any, any, any>,
    Omit<UseMutationResult<any, any, any, any>, "mutateAsync">
] {
    const { type } = options || {};

    const mutationFn = async (data: any) => {
        const optionsWithData = { ...options, data };

        switch (type) {
            case MUTATION_TYPES.create:
                return apiRequest("post", path, optionsWithData);
            case MUTATION_TYPES.update:
                return apiRequest("patch", path, optionsWithData);
            case MUTATION_TYPES.replace:
                return apiRequest("put", path, optionsWithData);
            case MUTATION_TYPES.delete:
                return apiRequest("delete", path, optionsWithData);
            default:
                return Promise.reject(`Incorrect mutations HTTP verb: ${type}`);
        }
    };

    const mutationOtions = {
        mutationKey: [path, type],
    };

    const { mutateAsync, ...meta } = useMutation(mutationFn, mutationOtions);

    return [mutateAsync, meta];
}
