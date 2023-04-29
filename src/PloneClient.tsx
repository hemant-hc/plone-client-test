import React from "react";

interface PloneClientContextValue {
    baseURL: string;
    headers: Record<string, string>;
    [key: string]: any;
}

// export const PloneClientContext =
//     React.createContext<PloneClientContextValue | null>(null);

// class PloneClient {
//     // static contextType = PloneClientContext;
//     context!: React.Context<PloneClientContextValue>;

//     initialize(
//         baseURL: string,
//         headers: Record<string, string>,
//         ...otherConfig: any[]
//     ) {
//         const context = {
//             baseURL,
//             headers,
//             ...otherConfig,
//         };

//         this.context = React.createContext<PloneClientContextValue>(context);
//     }
// }

// export default PloneClient;

const PloneClientContext = React.createContext<PloneClientContextValue>({
    baseURL: "",
    headers: {},
});

class PloneClient {
    ploneClientConfig: PloneClientContextValue;
    PloneClientProvider: ({
        children,
    }: {
        children: React.ReactNode;
    }) => React.ReactNode;

    constructor(ploneClientConfig: PloneClientContextValue) {
        this.ploneClientConfig = ploneClientConfig;
        this.PloneClientProvider = this.getProvider();
    }

    getProvider =
        () =>
        ({ children }: { children: React.ReactNode }) => {
            return (
                <PloneClientContext.Provider value={this.ploneClientConfig}>
                    {children}
                </PloneClientContext.Provider>
            );
        };
}

export default PloneClient;
