import { useMutations } from "../glue-layer";
import { MUTATION_TYPES } from "../glue-layer/identifiers";
import { z } from "zod";

export interface Login {
    token: string;
}

export const LoginArgsSchema = z.object({
    login: z.string(),
    password: z.string(),
});

const LOGIN_PATHS = {
    LOGIN: "/@login",
};

export const useLogin = () => {
    return useMutations(LOGIN_PATHS.LOGIN, {
        type: MUTATION_TYPES.create,
    });
};
