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
import { Divider, /* TextField ,*/ IconButton, Typography, Button } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from '@material-ui/core/Collapse';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FilterListIcon from '@material-ui/icons/FilterList';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { useWidth } from '../../../helpers/media-query';

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
    formControl: {
        margin: "1rem 1.2rem"
    }
});

const ItemTable = ({ data }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [items] = useState(data);
    const [open, setOpen] = useState(-1);
    const [filterOpen, setFilterOpen] = useState(false);
    const [filter, setFilter] = useState({});
    const [schoolOptions] = useState([...new Set(data.map(spell => spell.stats.school?.toLowerCase()))])
    const [levelOptions] = useState([...new Set(data.map(spell => spell.stats.level).sort())])
    const classes = useStyles();
    const width = useWidth();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilter = (data) => {
        let items = [...data || []];

        if (filter.name) {
            items = items.filter(item => item.name.includes(filter.name))
        }

        if (filter.school) {
            items = items.filter(item => item.stats?.school?.toLowerCase() === filter.school.toLowerCase())
        }

        if (filter.hasOwnProperty("level")) {
            items = items.filter(item => parseInt(item.stats?.level) === parseInt(filter.level))
        }

        return items;
    }

    const handleLevel = (level) => {
        if (level > 0) {
            return `Nivel ${level}`;
        }

        return 'Truco'
    }

    return (
        <>
            <Box>
                <Box style={{ textAlign: "right" }}>
                    <IconButton onClick={() => setFilterOpen(!filterOpen)} >
                        <FilterListIcon />
                    </IconButton>
                </Box>
                <Divider />
                <Collapse in={filterOpen} unmountOnExit>
                    <Box >
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="input-with-icon-adornment">Busca</InputLabel>
                            <Input
                                onChange={(e) => setFilter({ ...filter, name: e.target.value })}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <SearchIcon />
                                    </InputAdornment>
                                } />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Nivel</InputLabel>
                            <Select
                                style={{ textTransform: "capitalize" }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={filter.level || levelOptions[0]}
                                onChange={(e) => setFilter({ ...filter, level: parseInt(e.target.value) })}>
                                {levelOptions.map(item => <MenuItem value={item} style={{ textTransform: "capitalize" }}>{handleLevel(item)}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Escuela</InputLabel>
                            <Select
                                style={{ textTransform: "capitalize" }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={filter.school || schoolOptions[0]}
                                onChange={(e) => setFilter({ ...filter, school: e.target.value })}>
                                {schoolOptions.map(item => <MenuItem value={item} style={{ textTransform: "capitalize" }}>{item}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <Box component="div" style={{ textAlign: "right", margin: "1rem" }}>
                            <Button
                                color="default"
                                variant="outlined"
                                onClick={() => setFilter({})}>
                                Borrar
                                </Button>
                        </Box>
                    </Box>
                    <Divider />
                </Collapse>
            </Box>
            {items &&
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Nivel</TableCell>
                            {width !== "xs" && <TableCell>Escuela</TableCell>}
                            {width !== "xs" && <TableCell>Tiempo de lanzamiento</TableCell>}
                            {width !== "xs" && <TableCell>Alcance</TableCell>}
                            {width !== "xs" && <TableCell>Componentes</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {handleFilter(items)
                            .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase(), "en", { 'sensitivity': 'base' }))
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
                                        <TableCell>{handleLevel(item.stats?.level)}</TableCell>
                                        {width !== "xs" && <TableCell>{item.stats?.school}</TableCell>}
                                        {width !== "xs" && <TableCell>{item.stats?.castingTime}</TableCell>}
                                        {width !== "xs" && <TableCell>{item.stats?.range}</TableCell>}
                                        {width !== "xs" && <TableCell>{item.stats?.components?.type}</TableCell>}
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                            <Collapse in={open === index} timeout="auto" unmountOnExit>
                                                <Box margin={1}>
                                                    <Typography >Propiedades</Typography>
                                                    <Box style={{ display: "flex" }}>
                                                        <Box marginLeft={3} marginRight={3}>
                                                            <Box component="p" style={{ marginBottom: ".5rem" }}>
                                                                {(item.stats?.level > 0 ? (`Nivel ${item.stats.level}, ${item.stats?.school?.toLowerCase()}`) : `Truco,  ${item.stats?.school?.toLowerCase()}`)}
                                                            </Box>
                                                            <Box component="div">
                                                                <b>Componentes: </b>
                                                                {(`${item.stats?.components?.type} ` + (item.stats?.components?.description ? `(${item.stats?.components?.description})` : ""))}
                                                            </Box>
                                                            <Box component="div">
                                                                <b>Tiempo de lanzamiento: </b>
                                                                {(item.stats?.castingTime || `—`)}
                                                            </Box>
                                                            <Box component="div">
                                                                <b>Tiempo de lanzamiento: </b>
                                                                {(item.stats?.range || `—`)}
                                                            </Box>
                                                            <Box component="div">
                                                                <b>Duración: </b>
                                                                {(item.stats?.duration || `—`)}
                                                            </Box>
                                                            <p style={{ maxWidth: "50%" }} dangerouslySetInnerHTML={{ __html: item.stats.description }} />
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Collapse>
                                        </TableCell>
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
                                count={handleFilter(items).length}
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

function SpellScreen(props) {
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

export default SpellScreen;