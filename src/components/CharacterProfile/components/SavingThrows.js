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
        margin: 0,
        padding: "1rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        height: "100%"
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
    }
});

export default function SavingThrows(props) {
    const classes = useStyles();
    const checks = ["Fuerza", "Destreza", "Constitución", "Inteligencia", "Sabiduría", "Carisma"]

    useEffect(() => {

    }, [])

    return (
        <Paper variant="outlined" className={classes.paper}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell align="left">Tipo</TableCell>
                        <TableCell align="right">Bonus</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.keys(props.saving).map((check, index) => (
                        <TableRow key={index}>
                            <TableCell size="small" padding="none" className={classes.smallCell}>
                                <Radio
                                    checked={props.saving[check].proficient}
                                    size="small"
                                    disabled
                                />
                            </TableCell>
                            <TableCell>
                                {checks[index]}
                            </TableCell>
                            <TableCell align="right">
                                {props.saving[check].bonus}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}