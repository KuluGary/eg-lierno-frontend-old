import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Header from '../Header/Header'
import Api from '../../helpers/api'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: "100vh",
        width: "100vw"
    },
    profileBox: {
        maxWidth: "40%",
        margin: "0 auto",
        padding: "2rem"
    },
    avatar: {
        display: "block",
        margin: "0 auto",
        fontSize: "6rem",
        color: theme.palette.secondary.main,
    }
}));

export default function ProfileScreen() {
    const classes = useStyles();
    const [user, setUser] = useState();

    useEffect(() => {
        const url = Api.getKey('base_url') + '/me';

        Api.fetchInternal('/me')
            .then(res => setUser(res));
    }, [])

    return (
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
            <div className={classes.root}>
                <Paper className={classes.profileBox}>
                    <AccountCircle className={classes.avatar} fontSize={'inherit'} />
                <Typography variant="h6" className={classes.title}>
                    User: {user && user.metadata.first_name + ' ' + user.metadata.last_name} 
                </Typography>
                <Typography variant="h6" className={classes.title}>
                    Email: {user && user.metadata.email}
                </Typography>                
                </Paper>
            </div>
        </Slide>
    )
}