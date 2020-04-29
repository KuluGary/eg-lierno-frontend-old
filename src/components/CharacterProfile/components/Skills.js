import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Radio from '@material-ui/core/Radio';

const useStyles = makeStyles({
    root: {
        height: "100%"
    },
    paper: {
        margin: "0 .5rem",
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

export default function Skills(props) {
    const classes = useStyles();

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
                    {Object.keys(props.skills).map((check, index) => (
                        <TableRow key={index}>
                            <TableCell size="small" padding="none" className={classes.smallCell}>
                                <Radio
                                    checked={props.skills[check].proficient}
                                    size="small"
                                    disabled
                                />
                            </TableCell>
                            <TableCell>
                                {props.skills[check].name}
                            </TableCell>
                            <TableCell align="right">
                                {props.skills[check].bonus}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}