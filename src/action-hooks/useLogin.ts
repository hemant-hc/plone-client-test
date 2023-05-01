import { ApiRequestParams } from "../api-request";
import { useMutations } from "../glue-layer";
import { MUTATION_TYPES } from "../glue-layer/identifiers";
import ConfigContainerClient from "../PloneClient";

export interface Login {
    token: string;
}

export type LoginArgs = {
    username: string;
    password: string;
    config: PloneClientConfig;
};

export type PloneClientConfig = {
    apiPath: string;
    token?: string;
};

const LOGIN_PATHS = {
    LOGIN: "/@login",
};

export const useLogin = () => {
    return useMutations(LOGIN_PATHS.LOGIN, {
        type: MUTATION_TYPES.create,
    });
};
