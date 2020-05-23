import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { addClasses } from "../../../shared/actions/index";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
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
        maxHeight: "75vh", 
        float: "right",
        display: "block",
        margin: "1rem",
        padding: ".5rem 1rem .5rem .5rem"
    },
});

const mapStateToProps = state => {
    return { classes: state.classes }
}

const mapDispatchToProps = dispatch => {
    return { addClasses: classes => dispatch(addClasses(classes)) };
}

function Features(props) {
    const classes = useStyles();
    const [characterClasses, setCharacterClasses] = useState();
    const { features } = props;

    useEffect(() => {
        if (!props.classes) {
            Api.fetchInternal('/classes/')
                .then(res => {
                    props.addClasses(res)
                    let characterClassArray = features.classes.map(apiClass => apiClass.classId)
                    let selectedClasses = res.filter(apiClass => characterClassArray.includes(apiClass._id))
                    console.log(selectedClasses)
                    setCharacterClasses(selectedClasses)
                })
        } else {
            let characterClassArray = features.classes.map(apiClass => apiClass.classId)
            let selectedClasses = props.classes.filter(apiClass => characterClassArray.includes(apiClass._id))
            setCharacterClasses(selectedClasses)
        }
    }, [])

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Box className={classes.profileBox}>
                {characterClasses && characterClasses.length > 0 && <img className={classes.image} src={characterClasses[0].image} />}
                    <Box>
                        {characterClasses && characterClasses.length > 0 && characterClasses.map(characterClass => (
                            <Box>
                                <Typography variant="h6">
                                    {characterClass.name}
                                </Typography>
                                <Divider />
                                <Box component="p">
                                    {characterClass.description}
                                </Box>
                                <Divider />
                            </Box>
                        ))}
                        
                    </Box>
                    {features.additionalAbilities.map(ability => (
                        <Box component="p">
                            <Typography display="inline" variant="subtitle2">{ability.name + '. '}</Typography>
                            <span dangerouslySetInnerHTML={{ __html: ability.description }} />
                        </Box>
                    ))}
                    {features.actions.length > 0 &&
                        <Box>
                            <Typography variant={'h6'}>Acciones</Typography>
                            <Divider className={classes.fullWidthDivier} />
                            <Box >
                                {features.actions.map(action => (
                                    <Box component="p">
                                        <Typography display="inline" variant="subtitle2">{action.name + '. '}</Typography>
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
                                        <Typography display="inline" variant="subtitle2">{reaction.name + '. '}</Typography>
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
                                        <Typography display="inline" variant="subtitle2">{bonusAction.name + '. '}</Typography>
                                        <span dangerouslySetInnerHTML={{ __html: bonusAction.description }} />
                                    </Box>
                                ))}
                            </Box>
                        </Box>}
                </Box>
            </Paper>
        </div >
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Features);