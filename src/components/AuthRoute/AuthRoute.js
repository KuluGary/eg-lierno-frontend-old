import React from "react";
import { Redirect, Route } from "react-router-dom";
import { CircularProgress, Paper } from '@material-ui/core'

function AuthRoute({
    Component,
    path,
    exact = false,
    isLoading,
    isAuthenticated,
}) {
    if (isLoading) {
        return (
            <Paper
                style={{
                    width: "80vw",
                    height: "80vh",
                    position: "relative",
                }}
                variant="outlined"
            >
                <CircularProgress
                    color="default"
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                    }}
                />
            </Paper>
        );
    }

    if (!isLoading && !isAuthenticated) {
        return (
            <Redirect
                to={{
                    pathname: "/login", // TODO: add unauthorized
                }}
            />
        );
    }

    return (
        <Route
            exact={exact}
            path={path}
            render={(props) => <Component {...props} />}
        />
    );
}

export default AuthRoute;
