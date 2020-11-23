import React, { useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Radio from '@material-ui/core/Radio';

const useStyles = makeStyles({
    root: {
        height: "100%"
    },
    paper: {
        // margin: ".2rem .2rem 0 .2rem",
        margin: ".1rem",
        marginBottom: 0,
        padding: ".2rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        // alignItems: 'center',
        height: "100%"
    },
    stat: {
        // margin: "0 1.5rem",
        textAlign: "center"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',

    },
    smallCell: {
        width: "2rem"
    },
    radio: {
        padding: 0
    }
});

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        //   backgroundColor: '#f5f5f9',
        //   color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        //   border: '1px solid #dadde9',
    },
}))(Tooltip);



export default function Skills(props) {
    const classes = useStyles();

    const handleClick = (check) => {
        let newItems = {...props.skills};

        if (props.skills[check].expertise) {
            newItems[check].expertise = false;
            newItems[check].proficient = false;
        } else if (props.skills[check].proficient) {
            newItems[check].expertise = true;
        } else {
            newItems[check].proficient = true;
        }

        props.changeStats("skills", newItems)
    }

    return (
        <Paper variant="outlined" className={classes.paper}>
            <Table className={classes.table} size="small">
                <TableHead>
                    <TableRow>
                        <TableCell size="small" colSpan={3}>
                            <div style={{ fontSize: "12px", textAlign: 'center' }}>
                                {'HABILIDADES'}
                            </div>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.keys(props.skills)
                        .sort((a, b) => props.skills[a].name.localeCompare(props.skills[b].name, 'en', { 'sensitivity': 'base' }))
                        .map((check, index) => {
                            let bonus = 0;

                            if (props.skills[check].expertise) {
                                bonus = Math.floor((props.stats[props.skills[check].modifier] - 10) / 2) + (props.proficiency * 2)
                            } else if (props.skills[check].proficient) {
                               bonus = Math.floor((props.stats[props.skills[check].modifier] - 10) / 2) + (props.proficiency)
                            } else {
                               bonus = Math.floor((props.stats[props.skills[check].modifier] - 10) / 2)
                            }

                            return (
                                <HtmlTooltip className={classes.tooltip} title={props.skills[check].description}>
                                    <TableRow key={index}>
                                        <TableCell size="small" padding="none" className={classes.smallCell}>
                                            <Radio
                                                checked={props.skills[check].proficient}
                                                size="small"
                                                onClick={() => handleClick(check)}
                                                color="default"
                                                disabled={!props.editable}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <div style={{ fontSize: "12px" }}>
                                                {props.skills[check].name}
                                            </div>
                                        </TableCell>
                                        <TableCell align="right">
                                            <div style={{ fontSize: "14px" }}>
                                                {/* {props.stats[props.skills[check].modifier] + (props.skills[check].proficient && props.proficiency * (props.skills[check].expertise ? 2 : 1))} */}
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