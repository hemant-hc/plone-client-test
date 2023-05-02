import {
    UseMutateAsyncFunction,
    UseMutationResult,
    useMutation,
    MutationOptions,
    UseMutationOptions,
    MutationFunction,
} from "@tanstack/react-query";
import { apiRequest, ApiRequestParams } from "../api-request";
import { MUTATION_TYPES } from "./identifiers";

export type TUseMutationsOptions<
    TData = any,
    TError = any,
    TVariables = any
> = UseMutationOptions<TData, TError, TVariables> &
    Omit<ApiRequestParams, "data"> & {
        type: string;
    };

export function useMutations<TData = any, TError = any, TVariables = any>(
    path: string,
    options?: Omit<ApiRequestParams, "data"> & { type: string },
    mutationOptions?: TUseMutationsOptions
): [
    UseMutateAsyncFunction<TData, TError, TVariables>,
    Omit<UseMutationResult<TData, TError, TVariables>, "mutateAsync">
] {
    const { type, ...restOptions } = options || {};

    const mutationFn: MutationFunction<TData, TVariables> = async (
        data: TVariables
    ) => {
        const optionsWithData = { ...restOptions, data };
        console.log("post", path, optionsWithData);
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

    const mutationKeyAndOptions: UseMutationOptions<TData, TError, TVariables> =
        {
            mutationKey: [path, type],
            ...mutationOptions,
        };

    const { mutateAsync, ...meta } = useMutation<TData, TError, TVariables>(
        mutationFn,
        mutationKeyAndOptions
    );

    return [mutateAsync, meta];
}
