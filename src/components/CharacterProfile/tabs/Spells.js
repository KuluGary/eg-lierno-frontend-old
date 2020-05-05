import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Api from '../../../helpers/api';

const useStyles = makeStyles({
    root: {
        width: "100%"
    },
    paper: {
        margin: 0,
        padding: "1rem",
        height: "100%"
    },
    stat: {
        margin: "0 1.5rem",
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',
    },
    img: {
        width: "100%"
    },
    trait: {
        marginLeft: "1rem"
    },
    bold: {
        fontWeight: 800
    },
    row: {
        '&:hover': {
            cursor: 'pointer'
        }
    }
});

export default function Armor(props) {
    const classes = useStyles();
    const { spellIds } = props;
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState();
    const [tableItems, setTableItems] = useState([]);
    const [spells, setSpells] = useState();
    const [selectedSpell, setSelectedSpell] = useState();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        Api.fetchInternal('/spells', {
            method: "POST",
            body: JSON.stringify(spellIds)
        })
            .then(res => {
                setSpells(res)
                let cats = [];
                res.forEach(spell => !cats.includes(spell.stats.level) && cats.push(spell.stats.level))
                setCategories(cats.sort());
                setSelectedCategory(0);
                setTableItems(res.filter(spell => {
                    console.log(spell.stats.level, cats[0], spell.stats.level === cats[0])
                    return spell.stats.level === cats[0]
                }));
            })
    }, [])

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
                {value === index && <Box p={3}>{children}</Box>}
            </Typography>
        );
    }

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const handleChange = (event, newValue) => {
        setPage(0)
        setSelectedCategory(newValue);
        setTableItems(spells.filter(spell => spell.stats.level === newValue))
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div className={classes.root}>
            {tableItems.length > 0 &&
                <Grid container spacing={1} >
                    <Grid item xs={12} sm={12} md={6}>
                        <Paper variant="outlined" className={classes.paper}>
                            <Tabs
                                variant="scrollable"
                                value={selectedCategory}
                                onChange={handleChange}
                                aria-label="simple tabs example">
                                {categories.map((category, index) => (
                                    <Tab key={index} label={category === 0 ? "Trucos" : 'Nivel ' + category} {...a11yProps(category)} />
                                ))}
                            </Tabs>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            Nombre
                                        </TableCell>
                                        <TableCell>
                                            Escuela
                                        </TableCell>
                                        <TableCell>
                                            Tiempo de lanzamiento
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tableItems
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map(spell =>
                                            <TableRow className={classes.row} onClick={() => setSelectedSpell(spell)}>
                                                <TableCell className={classes.bold}>
                                                    {spell.name}
                                                </TableCell>
                                                <TableCell>
                                                    {spell.stats.school}
                                                </TableCell>
                                                <TableCell>
                                                    {spell.stats.castingTime}
                                                </TableCell>
                                            </TableRow>
                                        )}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={5, 10, 15}
                                            colspan={12}
                                            count={tableItems.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onChangePage={handleChangePage}
                                            onChangeRowsPerPage={handleChangeRowsPerPage} />
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <Paper variant="outlined" className={classes.paper}>
                            {selectedSpell &&
                                <Box>
                                    <Typography variant='h6'>{selectedSpell.name}</Typography>
                                    <Typography variant='subtitle1'>{(selectedSpell.stats.level > 0 ? ('Nivel ' + selectedSpell.stats.level) : 'Truco') + ', ' + selectedSpell.stats.school}</Typography>
                                    {selectedSpell.stats.components.type &&
                                        <Box>
                                            <Box component="p">
                                                <Box className={classes.bold} component="span">{'Componentes. '}</Box>
                                                <Box component="span">{selectedSpell.stats.components.type}</Box>
                                                {selectedSpell.stats.components.description && <Box component="span">{', ' + selectedSpell.stats.components.description}</Box>}
                                            </Box>
                                        </Box>
                                    }
                                    {selectedSpell.stats.castingTime &&
                                        <Box>
                                            <Box component="p">
                                                <Box className={classes.bold} component="span">{'Tiempo de lanzamiento. '}</Box>
                                                <Box component="span">{selectedSpell.stats.castingTime}</Box>
                                            </Box>
                                        </Box>
                                    }
                                    {selectedSpell.stats.range &&
                                        <Box>
                                            <Box component="p">
                                                <Box className={classes.bold} component="span">{'Alcance. '}</Box>
                                                <Box component="span">{selectedSpell.stats.range}</Box>
                                            </Box>
                                        </Box>
                                    }

                                    {selectedSpell.stats.duration &&
                                        <Box>
                                            <Box component="p">
                                                <Box className={classes.bold} component="span">{'Duración. '}</Box>
                                                <Box component="span">{selectedSpell.stats.duration}</Box>
                                            </Box>
                                        </Box>
                                    }
                                    <p dangerouslySetInnerHTML={{ __html: selectedSpell.stats.description }} />
                                </Box>}
                        </Paper>
                    </Grid>
                </Grid>
            }
        </div >
    );
}