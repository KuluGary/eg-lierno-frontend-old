import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Auth from "../../helpers/auth"

function AuthRoute({ Component, path, exact = false, requiredRoles }) {
    const isAuthed = Auth.loggedIn();
    const userHasRequiredRole = requiredRoles.some(Auth.hasRole);
    console.log(userHasRequiredRole);
    const message = userHasRequiredRole ? 'Por favor accede a tu cuenta para ver esta página.'
        : "No estás autorizado para entrar en esta página.";

    return (
        <Route
            exact={exact}
            path={path}
            render={(props) => isAuthed && userHasRequiredRole ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: "/login", // TODO: add unauthorized
                            state: {
                                message,
                                requestedPath: path
                            }
                        }}
                    />
                )}
        />
    )
}

export default AuthRoute;
