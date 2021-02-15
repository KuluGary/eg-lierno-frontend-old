import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Divider, TextField, IconButton, /*Typography*/ } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
// import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles({
    root: {
        display: "flex",
        maxWidth: "80%",
        margin: "6rem 4rem",
        justifyContent: "center"
    },
    table: {
        // minWidth: 650,
        width: "100%"
    },
    avatar: {
        width: "20%",
        height: "20%"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none'
    },
    smallCell: {
        width: "2rem"
    },
});

const ItemTable = ({ data }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [items, setItems] = useState(data);
    const [open, setOpen] = useState(-1);
    const classes = useStyles();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <Box>
                <Box style={{ margin: 10 }}>
                    <TextField
                        onChange={(e) => setItems(data.filter(item => item.name.includes(e.target.value)))}
                        label={'Buscar por nombre'} />
                </Box>
                <Divider />
            </Box>
            {items &&
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Escuela</TableCell>
                            <TableCell>Tiempo de lanzamiento</TableCell>
                            <TableCell>Alcance</TableCell>
                            <TableCell>Componentes</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((item, index) => (
                                <>
                                    <TableRow hover key={item._id} className={classes.link} onClick={() => setOpen(open === index ? -1 : index)}>
                                        <TableCell>
                                            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                                                {open === index ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.stats?.school}</TableCell>
                                        <TableCell>{item.stats?.castingTime}</TableCell>
                                        <TableCell>{item.stats?.range}</TableCell>
                                        <TableCell>{item.stats?.components?.type}</TableCell>
                                    </TableRow>                                    
                                </>))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 15]}
                                colSpan={12}
                                labelRowsPerPage={'Filas por página: '}
                                labelDisplayedRows={
                                    ({ from, to, count }) => {
                                        return '' + from + '-' + to + ' de ' + count
                                    }
                                }
                                count={items.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            }
        </>
    )
}

function ClassScreen(props) {
    return (
        <>
            <Slide direction="right" in={true} mountOnEnter unmountOnExit>
                <Paper elevation={0}>
                    <Divider />
                    <ItemTable
                        data={props.data} />
                </Paper>
            </Slide>
        </>
    );
}

export default ClassScreen;