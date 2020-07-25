import React, { useState, useEffect } from 'react';
import { Redirect, Link, useHistory, withRouter } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { grey } from '@material-ui/core/colors';
import Api from "../../helpers/api";
import Auth from "../../helpers/auth";
import Slide from '@material-ui/core/Slide';

function Copyright(props) {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
                Gary Cuétara{' '}
            {new Date().getFullYear()}
            {'. Versión #' + props.version}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    link: {
        textDecoration: 'none'
    },
    progress: {
        color: grey[400]
    }
}));

function Login(props) {
    const classes = useStyles();
    const [username, setUserName] = useState('');
    const [password, setPassWord] = useState('');
    const [remember, setRemember] = useState(false);
    const [hasLoggedIn, setLoggedIn] = useState(false)
    const [loading, setLoading] = useState(false);
    const [errorState, setError] = useState(false);

    useEffect(() => {
        if (Auth.loggedIn()) {
            props.history.push("/")
        }
    }, [])

    const login = (e) => {
        e.preventDefault();
        if (username && password) {
            const user = {
                username,
                password
            }

            setLoading(true);

            Api.fetchInternal('/auth/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
                .then(res => res.token)
                .then(token => {
                    if (remember) {
                        localStorage.setItem('token', token);
                    } else {
                        sessionStorage.setItem('token', token);
                    }
                    props.history.push("/")
                    setLoggedIn(true);
                    setLoading(false);
                    props.authenticated();
                })
                .catch(err => {
                    setError(true)
                    setLoading(false);
                })
        }
    }

    return (
        <>
            {Auth.loggedIn() && <Redirect to="/" />}
            <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">Entrar</Typography>
                        <form className={classes.form} noValidate onSubmit={login}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                error={errorState}
                                id="email"
                                label="Cuenta de usuario"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                onChange={(e) => setUserName(e.target.value)}
                                helperText={errorState && 'El email o contraseña insertados no existen.'}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                error={errorState}
                                name="password"
                                label="Contraseña"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) => setPassWord(e.target.value)}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={remember}
                                        onChange={() => setRemember(!remember)} />
                                }
                                label="Recuérdame"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={loading}
                                className={classes.submit}>
                                {loading ? <CircularProgress className={classes.progress} size={24} /> : 'Entrar'}
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link to="/register" className={classes.link}>
                                        {"¿No tienes una cuenta? Regístrate"}
                                    </Link>
                                </Grid>
                            </Grid>
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

export default withRouter(Login)