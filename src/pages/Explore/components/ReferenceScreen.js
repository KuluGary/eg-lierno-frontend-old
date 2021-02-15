import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Collapse from '@material-ui/core/Collapse';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import IconButton from '@material-ui/core/IconButton';
import { Divider, Button } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import references from '../../../assets/json/references.json';
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
});

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

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

export default function ReferenceScreen() {
    const [value, setValue] = useState(0);
    const [filterOpen, setFilterOpen] = useState(false);
    const [filter, setFilter] = useState({});
    const width = useWidth();

    const DataTable = ({ data }) => {
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

        const handleFilter = (data) => {
            let items = [...data || []];

            if (filter.title) {
                items = items.filter(item => item.title.includes(filter.title))
            }

            return items;
        }

        return (
            <>
                {data &&
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell align="left">Nombre</TableCell>
                                <TableCell></TableCell>
                                {width !== "xs" && <TableCell align="left">Descripción</TableCell>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {handleFilter(data)
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((item, index) => (
                                    <>
                                        <TableRow hover key={item._id} className={classes.link} onClick={() => setOpen(open === index ? -1 : index)}>
                                            <TableCell>
                                                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                                                    {open === index ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                </IconButton>
                                            </TableCell>
                                            <TableCell>{item.title}</TableCell>
                                            <TableCell>{item.subtitle}</TableCell>
                                            {width !== "xs" && <TableCell>{item.description}</TableCell>}
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                                                <Collapse in={open === index} timeout="auto" unmountOnExit>
                                                    <Box margin={1}>
                                                        <ul>
                                                            {item.bullets?.map(bullet => (
                                                                <li style={{ margin: "1rem 0" }} dangerouslySetInnerHTML={{ __html: bullet }} />
                                                            ))}
                                                        </ul>
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

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
            <Paper elevation={0}>
                <Divider />
                <Box style={{ display: "flex", justifyContent: "space-between" }}>
                    <Tabs variant="scrollable" value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab label="Acciones" {...a11yProps(0)} />
                        <Tab label="Acciones adicionales" {...a11yProps(1)} />
                        <Tab label="Estados" {...a11yProps(2)} />
                        <Tab label="Efectos ambientales" {...a11yProps(3)} />
                        <Tab label="Descanso" {...a11yProps(4)} />
                        <Tab label="Movimiento" {...a11yProps(5)} />
                        <Tab label="Acciones opcionales" {...a11yProps(6)} />
                        <Tab label="Reacciones" {...a11yProps(7)} />
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
                                value={filter.title || ""}
                                onChange={(e) => setFilter({ ...filter, title: e.target.value })}
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
                    <DataTable
                        data={references?.action} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <DataTable
                        data={references?.bonus_action} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <DataTable
                        data={references?.condition} />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <DataTable
                        data={references?.environment} />
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <DataTable
                        data={references?.rest} />
                </TabPanel>
                <TabPanel value={value} index={5}>
                    <DataTable
                        data={references?.movement} />
                </TabPanel>
                <TabPanel value={value} index={6}>
                    <DataTable
                        data={references?.optional} />
                </TabPanel>
                <TabPanel value={value} index={7}>
                    <DataTable
                        data={references?.reaction} />
                </TabPanel>
            </Paper>
        </Slide>
    )
}
