import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import Radio from '@material-ui/core/Radio';
import { stats } from 'assets/json/customizable_stats.json';
import useStyles from "./SavingThrows.styles";

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
    }
}))(Tooltip);

export function SavingThrows(props) {
    const classes = useStyles();

    const handleClick = (check) => {
        let newItems = { ...props.saving };

        if (props.saving[check].expertise) {
            newItems[check].expertise = false;
            newItems[check].proficient = false;
        } else if (props.saving[check].proficient) {
            newItems[check].expertise = true;
        } else {
            newItems[check].proficient = true;
        }

        props.changeStats("savingThrows", newItems)
    }

    return (
        <Paper variant="outlined" className={classes.paper}>
            <Box className={classes.subtitleContainer}>
                <Typography variant="subtitle2" className={classes.subtitle} >{'HABILIDADES'}</Typography>
            </Box>
            <Divider />
            <Table className={classes.table} size="small">
                <TableBody>
                    {Object.keys(props.saving).map((check, index) => {
                        let bonus = 0;

                        if (props.saving[check].expertise) {
                            bonus = Math.floor((props.stats[check] - 10) / 2) + (props.proficiency * 2)
                        } else if (props.saving[check].proficient) {
                            bonus = Math.floor((props.stats[check] - 10) / 2) + (props.proficiency)
                        } else {
                            bonus = Math.floor((props.stats[check] - 10) / 2)
                        }

                        return (
                            <HtmlTooltip title={stats[check].description}>
                                <TableRow key={index} hover>
                                    <TableCell size="small" padding="none" className={classes.smallCell}>
                                        <Radio
                                            checked={props.saving[check].proficient}
                                            size={"small"}
                                            color="default"
                                            disabled={!props.editable}
                                            classes={{
                                                root: classes.radio
                                            }}
                                            onClick={() => handleClick(check)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <div style={{ fontSize: "12px" }}>
                                            {stats[check].name}
                                        </div>
                                    </TableCell>
                                    <TableCell align="right">
                                        <div style={{ fontSize: "14px" }}>
                                            {bonus}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </HtmlTooltip>
                        )
                    })}
                </TableBody>
            </Table>
        </Paper>
    );
}