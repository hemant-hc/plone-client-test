import { useMutations } from "../glue-layer";
import { MUTATION_TYPES } from "../glue-layer/identifiers";

export interface Login {
    token: string;
}

const LOGIN_PATHS = {
    LOGIN: "/@login",
};

export const useLogin = () => {
    return useMutations(LOGIN_PATHS.LOGIN, {
        type: MUTATION_TYPES.create,
    });
};
