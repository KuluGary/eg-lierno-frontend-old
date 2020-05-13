import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid'
import Api from "../../../helpers/api";

const useStyles = makeStyles({
    root: {
        width: "100%"
    },
    paper: {
        margin: 0,
        padding: "1rem",
        height: "100%"
    },
    action: {
        margin: "1rem 0",
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',

    },
    fullWidthDivier: {
        margin: ".5rem 0"
    },
    image: {
        display: "block",
        margin: "0 auto",
        maxHeight: "100vh",
        maxWidth: "100%"
    }
});

export default function Race(props) {
    const classes = useStyles();
    const { raceId, subraceIndex } = props;
    const [race, setRace] = useState();

    useEffect(() => {
        Api.fetchInternal('/race/' + raceId)
            .then(res => setRace(res))
    }, [])

    return (
        <div className={classes.root}>
            {race &&
                <Paper variant="outlined" className={classes.paper}>
                    <Grid container spacing={1}>
                        <Grid item md={6} sm={12}>

                            <Box>
                                <Box>
                                    <Typography variant="h6">
                                        {race.name}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        {race.subraces[subraceIndex].name}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box>
                                <Box>
                                    {race.description}
                                </Box>
                            </Box>
                            {race.racialFeatures.length > 0 &&
                                <Box component="p">
                                    <Typography variant={'h6'}>Rasgos raciales</Typography>
                                    <Divider className={classes.fullWidthDivier} />
                                    <Box>
                                        {race.racialFeatures.map(feature => (
                                            <Box component="p">
                                                <Typography display="inline" variant="subtitle2">{feature.name + '. '}</Typography>
                                                <span dangerouslySetInnerHTML={{ __html: feature.effect }} />
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>}
                        </Grid>
                        <Grid item md={6}>
                            <img
                                className={classes.image}
                                src={race.imageUrl} />
                        </Grid>
                    </Grid>
                </Paper>}
        </div >
    );
}