import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
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
                Gary Cuétara
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

export default function ValidateAccount(props) {
    const classes = useStyles();

    useEffect(() => {
        if (Auth.loggedIn()) {
            props.history.push("/")
        }
    }, [])

    const activateAccount = () => {
        const { token } = props.match.params;

        Api.fetchInternal("/auth/activate/" + token, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                toast.success(res.message);
                props.history.push("/")
            })
            .catch(err => toast.error(err.message))
    }

    return (
        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
            <Container component="main" maxWidth="xs" onSubmit={activateAccount}>
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <CheckCircleIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Activa tu cuenta
                    </Typography>
                    <Typography component="p" variant="p" style={{ margin: "1rem 0" }}>
                        ¡Ya solo queda un paso! Activa tu cuenta presionando el botón a continuación:
                    </Typography>
                    <form className={classes.form} noValidate>                        
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Activar mi cuenta
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link to="/login" className={classes.link}>
                                    ¿Ya tienes una cuenta? Entra.
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
        </Slide>
    );
}

