import React, { useCallback, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useAddContent, useGetContent } from "./action-hooks/useContent";
import { useLogin } from "./action-hooks/useLogin";
import Cookies from "universal-cookie";
import PloneClient from "./PloneClient";

PloneClient.initialize({
    baseURL: "http://localhost:55001/plone",
    headers: {
        Authorization: "Bearer abcd0123456789",
    },
});

function App() {
    const [token, setToken] = useState("");
    const cookies = new Cookies();
    const [data, { isLoading: isLoadingContent }] = useGetContent(
        {
            path: "/",
        },
        {
            enabled: true,
            onSuccess: (data) => {
                console.log("from onsuccess function", data);
            },
        }
    );

    // console.log("data", data?.title ?? "");

    const [addContent, mutationOptions] = useAddContent({
        path: "/",
    });
    const addContentCall = useCallback(async () => {
        const result = await addContent({
            "@type": "Document",
            title: "My Page",
        });
    }, [addContent]);

    const [doLogin, { isLoading: isLoggingIn }] = useLogin();

    const makeLoginApiCall = useCallback(async () => {
        const result = await doLogin({ login: "admin", password: "secret" });
        setToken(result.token);
    }, [doLogin]);

    cookies.set("auth_token", token);
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                {isLoadingContent && <span>Loading...</span>}
                {isLoggingIn && <span>Updating...</span>}
                <button type="submit" onClick={makeLoginApiCall}>
                    Make Login API Call
                </button>
                <button type="submit" onClick={addContentCall}>
                    Add content data API Call
                </button>
            </header>
        </div>
    );
}

export default App;
