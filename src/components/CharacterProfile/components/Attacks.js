import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Radio from '@material-ui/core/Radio';
import Box from '@material-ui/core/Box';
import { useWidth } from "../../../helpers/media-query";

const useStyles = makeStyles({
    root: {
        height: "100%"
    },
    paper: {
        margin: 0,
        padding: "1rem",
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
    },
    box: {
        margin: "1rem"
    }
});

export default function Attacks(props) {
    const classes = useStyles();
    const width = useWidth();

    useEffect(() => {

    }, [])

    return (
        <Paper variant="outlined" className={classes.paper}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Nombre</TableCell>
                        <TableCell align="right">¿Proficiente?</TableCell>
                        {(width !== "xs") &&
                            <>
                                <TableCell align="center">Bonus</TableCell>
                                <TableCell align="left">Daño</TableCell>
                            </>
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.attacks["weapons-attacks"].map((attack, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                {attack.name}
                            </TableCell>
                            <TableCell align="center" size="small" padding="none" className={classes.smallCell}>
                                <Radio
                                    checked={attack.proficient}
                                    size="small"
                                    disabled
                                />
                            </TableCell>
                            {(width !== "xs") &&
                                <>
                                    <TableCell align="center" size="small" padding="none" className={classes.smallCell}>
                                        {attack["hit-bonus"]}
                                    </TableCell>
                                    <TableCell>
                                        {attack.range + ', ' + attack["damage-die"] + (attack["damage-bonus"] >= 0 ? "+" : '') + attack["damage-bonus"] + " " + attack["type"]}
                                    </TableCell>
                                </>
                            }
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Box className={classes.box}>
                <Typography variant="subtitle2">
                    {"Número de ataques: " + props.attacks["num-attacks"]}
                </Typography>
            </Box>
        </Paper>
    );
}