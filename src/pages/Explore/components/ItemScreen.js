import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Collapse from '@material-ui/core/Collapse';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { Button } from '@material-ui/core';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </Typography>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

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
    const [open, setOpen] = useState(-1);
    const classes = useStyles();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const parseMetadata = (metadata) => {
        switch (metadata.key) {
            case "Tamaño":
                switch (metadata.value) {
                    case 1: return "Pequeño";
                    case 2: return "Mediano";
                    case 3: return "Grande";
                    case 6: return "Enorme";
                    default: return "Gigantesco";
                }
            default: return metadata.value
        }
    }

    return (
        <>
            {data &&
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell align="left">Nombre</TableCell>
                            <TableCell align="left">Descripción</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
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
                                        <TableCell>{item.description}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                            <Collapse in={open === index} timeout="auto" unmountOnExit>
                                                <Box margin={1}>
                                                    <Typography >Propiedades</Typography>
                                                    <Box style={{ display: "flex" }}>
                                                        <Box marginLeft={3} marginRight={3}>
                                                            {item.properties?.map(property => (
                                                                <Box>
                                                                    <Box component={'span'}><b>{property.key + ': '}</b></Box>
                                                                    <Box component={'span'}>{parseMetadata(property)}</Box>
                                                                </Box>
                                                            ))}
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
                                count={data.length}
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

function ItemScreen(props) {
    const [value, setValue] = useState(0);
    const [filterOpen, setFilterOpen] = useState(false);
    const [filter, setFilter] = useState({});

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleFilter = (data) => {
        let items = [...data || []];

        if (filter.name) {
            items = items.filter(item => item.name.includes(filter.name))
        }

        return items;
    }

    return (
        <>
            <Slide direction="right" in={true} mountOnEnter unmountOnExit>
                <Paper elevation={0}>
                    <Divider />
                    <Box style={{ display: "flex", justifyContent: "space-between" }}>
                        <Tabs variant="scrollable" value={value} onChange={handleChange} aria-label="simple tabs example">
                            <Tab label="Armas" {...a11yProps(0)} />
                            <Tab label="Armaduras" {...a11yProps(1)} />
                            <Tab label="Objetos" {...a11yProps(2)} />
                            <Tab label="Objetos mágicos" {...a11yProps(3)} />
                            <Tab label="Vehículos" {...a11yProps(4)} />
                        </Tabs>
                        <IconButton onClick={() => setFilterOpen(!filterOpen)}>
                            <FilterListIcon />
                        </IconButton>
                    </Box>
                    <Divider />
                    <Collapse in={filterOpen} unmountOnExit>
                        <Box style={{ padding: "1rem 1.2rem" }}>
                            <FormControl>
                                <InputLabel htmlFor="input-with-icon-adornment">Busca</InputLabel>
                                <Input
                                    value={filter.name || ""}
                                    onChange={(e) => setFilter({ ...filter, name: e.target.value })}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <SearchIcon />
                                        </InputAdornment>
                                    } />
                            </FormControl>
                            <Box component="div" style={{ textAlign: "right", marginTop: "1rem" }}>
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
                    <TabPanel value={value} index={0}>
                        <ItemTable
                            data={handleFilter(props.data?.weapons)} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <ItemTable
                            data={handleFilter(props.data?.armor)} />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <ItemTable
                            data={handleFilter(props.data?.items)} />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <ItemTable
                            data={handleFilter(props.data?.magic_items)} />
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <ItemTable
                            data={handleFilter(props.data?.vehicles)} />
                    </TabPanel>
                </Paper>
            </Slide>
        </>
    );
}

export default ItemScreen;