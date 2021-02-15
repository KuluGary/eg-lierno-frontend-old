import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Slide from '@material-ui/core/Slide';
import Api from "../../helpers/api";
import Auth from "../../helpers/auth";
import { toast } from 'react-toastify';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
                Gary Cuétara{' '}
            {new Date().getFullYear()}
            {'.'}
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
    }
}));

export default function Register(props) {
    const classes = useStyles();
    const [username, setUserName] = useState('');
    const [password, setPassWord] = useState('');
    const [passwordVerification, setPasswordVerification] = useState();
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [setRegistered] = useState(false);
    const [errorState, setError] = useState({});

    useEffect(() => {
        if (Auth.loggedIn()) {
            props.history.push("/")
        }
    }, [])

    const register = (e) => {
        e.preventDefault();
        const user = {
            username,
            password,
            metadata: {
                first_name: name,
                last_name: lastName,
                email
            }
        }

        if (!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g.test(user.metadata.email)) {
            return setError({
                email: "Este no es un email válido."
            })
        }

        if (!/^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d).*$/g.test(user.password)) {
            return setError({
                password: "Esta contraseña no es válida. Debe contener al menos una letra, un número y una longitud de 6 carácteres."
            })
        }

        if (password !== passwordVerification) {
            return setError({
                passwordVerification: "Tus contraseñas no son iguales. Por favor, asegúrate de repetir tu contraseña correctamente."
            })
        }

        setError({});

        Api.fetchInternal('/auth/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then((res) => {
                toast.success(res.message);
                props.history.push("/");
                setRegistered(true);
            })
            .catch(err => toast.error(err.message))
    }

    return (
        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
            <Container component="main" maxWidth="xs" onSubmit={register}>
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Registrarse
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="Nombre"
                                    autoFocus
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Apellido"
                                    name="lastName"
                                    autoComplete="lname"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Cuenta de e-mail"
                                    error={errorState.email}
                                    name="email"
                                    autoComplete="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    helperText={errorState.email && errorState.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Nombre de Usuario"
                                    name="username"
                                    autoComplete="username"
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    error={errorState.password}
                                    label="Contraseña"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={(e) => setPassWord(e.target.value)}
                                    helperText={errorState.password && errorState.password}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password2"
                                    error={errorState.passwordVerification}
                                    label="Repite tu contraseña"
                                    type="password"
                                    id="password2"
                                    autoComplete="current-password"
                                    onChange={(e) => setPasswordVerification(e.target.value)}
                                    helperText={errorState.passwordVerification && errorState.passwordVerification}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Registrarse
                        </Button>
                    </form>
                </div>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
        </Slide>
    );
}
