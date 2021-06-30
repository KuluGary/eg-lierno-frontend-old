import React, { useState, useEffect } from "react";
import Api, { apolloClient } from "../../helpers/api";
import Auth from "../../helpers/auth";
import { Link, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { GoogleLogin } from "react-google-login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle /* faFacebook */ } from "@fortawesome/free-brands-svg-icons";
import { LOGIN_MUT } from "helpers/graphql/mutations/auth";
import { useMutation } from "@apollo/client";
import { addProfile } from "shared/actions/index";
import { compose } from "redux";
import { connect } from "react-redux";

import { grey } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import {
    TextField,
    FormControlLabel,
    Checkbox,
    CircularProgress,
    Box,
    Typography,
    Container,
    Slide,
    InputAdornment,
    Button,
    Avatar,
    CssBaseline,
    Divider,
    IconButton,
} from "@material-ui/core";

import {
    LockOutlined as LockOutlinedIcon,
    Visibility,
    VisibilityOff,
} from "@material-ui/icons";

function Copyright(props) {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            Gary Cuétara {new Date().getFullYear()}
            {". Versión #" + props.version}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    link: {
        textDecoration: "none",
        color: !localStorage.getItem("theme")
            ? theme.palette.primary.main
            : theme.palette.primary.light,
        float: "right",
    },
    progress: {
        color: grey[400],
    },
}));

const mapStateToProps = state => ({ profile: state.profile });

const mapDispatchToProps = dispatch => ({ addProfile: profile => dispatch(addProfile(profile)) });

function Login(props) {
    const classes = useStyles();
    const [username, setUserName] = useState("");
    const [password, setPassWord] = useState("");
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorState, setError] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [setLogin] = useMutation(LOGIN_MUT);    

    useEffect(() => {
        console.log(props.isAuthenticated);
        if (props.isAuthenticated) {
            props.history.push("/");
        }
    }, [props.isAuthenticated]);

    const login = async (e) => {
        e.preventDefault();

        if (username && password) {
            const user = {
                username,
                password,
            };

            setLoading(true);

            setLogin({ variables: { ...user } })
                .then(({ data }) => {
                    console.log(data);
        
                    if (data.login.user) {
                        if (!data.login.user.isActive) {
                            toast.error("Este usuario no está activado. Revisa tu bandeja de entrada.");
                            setLoading(false);
                        } else {
                            props.addProfile(data.login.user);
                            props.authenticate();
                            props.history.push("/");                    
                        }
                    } else {
                        setError(data.login.errors[0].error);
                        setLoading(false);
                    }
                })
            // const response = await setLogin({ variables: { ...user } });





            // Api.fetchInternal('/auth/login', {
            //     method: "POST",
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(user)
            // })
            //     .then(({ token, message, ...res }) => {
            //         if (token) {
            //             Auth.setToken(token)
            //                 .then(() => {
            //                     props.authenticated();
            //                     props.history.push(props.location.state?.requestedPath ?? "/");
            //                 })
            //                 .catch(() => {
            //                     toast.error("Este usuario no está activado. Revisa tu bandeja de entrada.");
            //                     setLoading(false);
            //                 })
            //         } else {
            //             setError(message);
            //             setLoading(false);
            //         }
            //     })
            //     .catch(err => {
            //         setError(err.message)
            //         setLoading(false);
            //     })
        }
    };

    const responseGoogle = (response) => {
        const profile = response.profileObj;

        if (profile) {
            const user = {
                id: profile.googleId,
                username: profile.name,
                remember,
                metadata: {
                    first_name: profile.givenName,
                    last_name: profile.familyName,
                    email: profile.email,
                    avatar: profile.imageUrl,
                },
            };

            Api.fetchInternal("/auth/login/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            })
                .then(({ token, message }) => {
                    if (token) {
                        Auth.setToken(token)
                            .then(() => {
                                props.authenticated();
                                props.history.push(props.location.state?.requestedPath ?? "/");
                            })
                            .catch(() => {
                                toast.error(
                                    "Este usuario no está activado. Revisa tu bandeja de entrada."
                                );
                                setLoading(false);
                            });
                    } else {
                        setError(message);
                    }
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    };

    return (
        <>
            <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Entrar
                        </Typography>
                        <GoogleLogin
                            clientId={
                                "586863595362-p9idqhg5t832kl4l9pclj3o3knpvi7br.apps.googleusercontent.com"
                            }
                            className={classes.google}
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={"single_host_origin"}
                            render={(renderProps) => (
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="outlined"
                                    color="default"
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    className={classes.submit}
                                    startIcon={
                                        <FontAwesomeIcon
                                            style={{ color: "red" }}
                                            size="sm"
                                            icon={faGoogle}
                                        />
                                    }
                                >
                                    {loading ? (
                                        <CircularProgress className={classes.progress} size={24} />
                                    ) : (
                                        "Entrar con Google"
                                    )}
                                </Button>
                            )}
                        />
                        <form className={classes.form} noValidate onSubmit={login}>
                            <Box
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Divider style={{ width: "30%" }} />
                                <Box style={{ margin: "0 1rem", opacity: 0.5 }}>O</Box>
                                <Divider style={{ width: "30%" }} />
                            </Box>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                error={errorState}
                                id="email"
                                label="Nombre de usuario"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                onChange={(e) => setUserName(e.target.value)}
                                helperText={errorState && errorState}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                error={errorState}
                                name="password"
                                label="Contraseña"
                                // type="password"
                                type={showPassword ? "text" : "password"}
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) => setPassWord(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Link to="/recover" className={classes.link} variant="span">
                                {"Recuperar contraseña"}
                            </Link>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={remember}
                                        onChange={() => setRemember(!remember)}
                                    />
                                }
                                label="Recuérdame"
                            />
                            <Button
                                type="submit"
                                // variant="outlined"
                                // autoFocus
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={loading}
                                className={classes.submit}
                            >
                                {loading ? (
                                    <CircularProgress className={classes.progress} size={24} />
                                ) : (
                                    "Entrar"
                                )}
                            </Button>
                        </form>
                    </div>
                    <Box mt={8}>
                        <Copyright version={props.version} />
                    </Box>
                </Container>
            </Slide>
        </>
    );
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Login)
