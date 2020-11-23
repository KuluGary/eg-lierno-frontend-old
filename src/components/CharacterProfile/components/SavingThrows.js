import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Radio from '@material-ui/core/Radio';

const useStyles = makeStyles({
    root: {
        height: "100%"
    },
    paper: {
        // margin: "0 .2rem 0 .2rem",
        margin: ".1rem",
        padding: ".2rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        // height: "100%"
    },
    stat: {
        margin: "0 1.5rem",
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

export default function SavingThrows(props) {
    const classes = useStyles();
    const checks = ["Fuerza", "Destreza", "Constitución", "Inteligencia", "Sabiduría", "Carisma"]

    useEffect(() => {

    }, [])

    const handleClick = (check) => {
        let newItems = {...props.saving};

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
            <Table className={classes.table} size="small">
            <TableHead>
                    <TableRow>
                        <TableCell size="small" colSpan={3}>
                            <div style={{ fontSize: "12px", textAlign: 'center' }}>
                                {'TIRADAS DE SALVACIÓN'}
                            </div>
                        </TableCell>
                    </TableRow>
                </TableHead>
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
                        <TableRow key={index}>
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
                                    {checks[index]}
                                </div>
                            </TableCell>
                            <TableCell align="right">
                                <div style={{ fontSize: "14px" }}>
                                    {bonus}
                                </div>
                            </TableCell>
                        </TableRow>
                    )})}
                </TableBody>
            </Table>
        </Paper>
    );
}