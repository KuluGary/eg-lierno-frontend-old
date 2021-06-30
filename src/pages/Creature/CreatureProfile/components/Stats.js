import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Grid, TextField, Paper, Tooltip } from '@material-ui/core';
import useStyles from './Stats.styles';
import { stats } from 'assets/json/customizable_stats';

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        fontSize: theme.typography.pxToRem(14)
    }
}))(Tooltip)

export default function Stats(props) {
    const classes = useStyles();

    return (
        props.stats && (
            Object.keys(props.stats).map((stat, index) => (
                <HtmlTooltip disableFocusListener title={stats[stat].description}>
                    <Grid item lg={props.mode === "npc" ? 2 : 1} xs={5}>
                        <Paper elevation={1} variant="outlined" className={classes.stat}>
                            <Typography variant="body2" style={{ fontSize: 10 }}>{stats[stat].name}</Typography>
                            <Typography variant="h6" style={{ fontSize: 30 }}>{props.stats && (Math.floor((props.stats[stat] - 10) / 2))}</Typography>
                            <Paper elevation={2} variant="outlined" style={{ display: "inline-block", padding: "0 .5rem", maxWidth: "80%" }}>
                                <TextField
                                    type="number"
                                    className={classes.textField}
                                    disabled={!props.editable}
                                    fullWidth
                                    value={props.stats[stat]}
                                    InputProps={{
                                        classes: {
                                            input: classes.resize,
                                        }
                                    }}
                                    onChange={(event) => props.changeStats("abilityScores", { ...props.stats, [stat]: event.target.value })}
                                />
                            </Paper>
                        </Paper>
                    </Grid>
                </HtmlTooltip>
            ))
        )
    );
}