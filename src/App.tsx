import React, { useCallback } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useGetContent } from "./action-hooks/useContent";
import { useLogin } from "./action-hooks/useLogin";

function App() {
    // const data = useGetContent({
    //     path: "/",
    // });
    // console.log("data", data);

    const [doLogin, { isLoading: isLoggingIn }] = useLogin();

    const makeLoginApiCall = useCallback(() => {
        return doLogin(
            JSON.stringify({ username: "hemant", password: "itsmeonly" })
        );
    }, [doLogin]);

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
                {isLoggingIn && <span>Loading...</span>}
                <button type="submit" onClick={makeLoginApiCall}>
                    Make Login API Call
                </button>
            </header>
        </div>
    );
}

export default App;
