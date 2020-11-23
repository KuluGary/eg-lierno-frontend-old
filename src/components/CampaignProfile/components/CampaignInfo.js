import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { NavLink } from "react-router-dom";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        verticalAlign: "center"
    },
    link: {
        color: "inherit",
        alignSelf: "flex-end"
    },
    game: {
        marginLeft: "2rem"
    }
}));

function CampaignProfile(props) {
    const classes = useStyles();

    return (
        <Box>
            <Box className={classes.container}>
                <NavLink to={'/campaigns'} className={classes.link}>
                    <ArrowBackIosIcon fontSize="small" />
                </NavLink>
                <Typography variant="h5" inline>
                    {props.name}
                </Typography>
            </Box>
            <Box className={classes.game}>
                <Typography variant="caption">
                    {props.game}
                </Typography>
            </Box>
        </Box>
    )

}

export default CampaignProfile;