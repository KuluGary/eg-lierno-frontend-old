import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

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
    bold: {
        fontWeight: 800
    },
    fullWidthDivier: {
        margin: ".5rem 0"
    },
});

export default function Features(props) {
    const classes = useStyles();
    const { features } = props;

    useEffect(() => {

    }, [])

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Box>
                    <Box>
                        {features.additionalAbilities.map(ability => (
                            <Box component="p">
                                <span className={classes.bold}>{ability.name + '. '}</span>
                                <span dangerouslySetInnerHTML={{ __html: ability.description }} />
                            </Box>
                        ))}
                    </Box>
                </Box>
                {features.actions.length > 0 &&
                    <Box>
                        <Typography variant={'h6'}>Acciones</Typography>
                        <Divider className={classes.fullWidthDivier} />
                        <Box >
                            {features.actions.map(action => (
                                <Box component="p">
                                    <span className={classes.bold}>{action.name + '. '}</span>
                                    <span dangerouslySetInnerHTML={{ __html: action.description }} />
                                </Box>
                            ))}
                        </Box>
                    </Box>}
                {features.reactions.length > 0 &&
                    <Box>
                        <Typography variant={'h6'}>Reacciones</Typography>
                        <Divider className={classes.fullWidthDivier} />
                        <Box>
                            {features.reactions.map(reaction => (
                                <Box component="p">
                                    <span className={classes.bold}>{reaction.name + '. '}</span>
                                    <span dangerouslySetInnerHTML={{ __html: reaction.description }} />
                                </Box>
                            ))}
                        </Box>
                    </Box>}
                {features.bonusActions.length > 0 &&
                    <Box component="p">
                        <Typography variant={'h6'}>Acciones adicionales</Typography>
                        <Divider className={classes.fullWidthDivier} />
                        <Box>
                            {features.bonusActions.map(bonusAction => (
                                <Box component="p">
                                    <span className={classes.bold}>{bonusAction.name + '. '}</span>
                                    <span dangerouslySetInnerHTML={{ __html: bonusAction.description }} />
                                </Box>
                            ))}
                        </Box>
                    </Box>}
            </Paper>
        </div >
    );
}