import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
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
        <Paper variant="outlined">
            <Box style={{ padding: "1rem" }}>
                <Box style={{ display: "flex", alignItems: "center" }}>
                    <Box style={{ margin: "0 .5rem" }}>
                        <NavLink to={'/campaigns'} className={classes.link}>
                            <ArrowBackIosIcon fontSize="small" />
                        </NavLink>
                    </Box>
                    <Box>
                        <Box>
                            <Typography variant="h5" display="inline">
                                {props.name}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="caption">
                                {props.game}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Divider />
            {props.children}
        </Paper>
    )

}

export default CampaignProfile;