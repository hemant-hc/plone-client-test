import { ApiRequestParams } from "../api-request";
import { useMutations, useFetchDetails } from "../glue-layer";
import { MUTATION_TYPES } from "../glue-layer/identifiers";

interface Content {
    "@id"?: string;
    title: string;
}

type getContentArgs = {
    path: string;
    version?: string;
    page?: number;
    fullObjects?: boolean;
};

export const useGetContent = ({
    path,
    version,
    page,
    fullObjects,
}: getContentArgs) => {
    const options: ApiRequestParams = {
        params: {
            ...(version && { version }),
            ...(fullObjects && { fullobjects: fullObjects }),
        },
    };

    if (version) {
        path = `${path}/@history/${version}`;
    }

    return useFetchDetails(path, options);
};

interface IAddContentArgs {
    path: string;
}

export const useAddContent = ({ path }: IAddContentArgs) => {
    return useMutations("/", {
        type: MUTATION_TYPES.create,
    });
};
