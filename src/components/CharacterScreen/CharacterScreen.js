import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { addCharacters, addProfile } from "../../shared/actions/index";
import Slide from '@material-ui/core/Slide';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useWidth } from '../../helpers/media-query';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Api from "../../helpers/api";
import { StringUtil } from "../../helpers/string-util";

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

const mapStateToProps = state => {
    return {
        characters: state.characters,
        profile: state.profile,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addCharacters: characters => dispatch(addCharacters(characters)),
        addProfile: profile => dispatch(addProfile(profile))
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

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function CharacterScreen(props) {
    const classes = useStyles();
    const [characters, setCharacters] = useState([]);
    const [profile, setProfile] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [value, setValue] = React.useState(0);
    const width = useWidth();

    useEffect(() => {
        if (!props.characters) {
            Api.fetchInternal('/characters')
                .then(res => {
                    props.addCharacters(res);
                    setCharacters(res)
                })
        } else {
            setCharacters(props.characters);
        }

        if (!props.profile) {
            Api.fetchInternal('/auth/me')
                .then(res => {
                    props.addProfile(res);
                    setProfile(res)
                })
        } else {
            setProfile(props.profile)
        }
    }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const CharacterTable = ({ characters }) => (
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    {(width !== "xs") && <TableCell className={classes.smallCell}></TableCell>}
                    <TableCell>Nombre</TableCell>
                    <TableCell>Clase</TableCell>
                    {(width !== "xs") && <TableCell>Alineamiento</TableCell>}
                    {(width !== "xs") && <TableCell>Trasfondo</TableCell>}
                    {(width !== "xs") && <TableCell></TableCell>}
                </TableRow>
            </TableHead>
            <TableBody>
                {(characters && profile) && characters.length > 0 && characters
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(char => (
                        <TableRow hover key={char._id} component={Link} to={'/characters/' + char._id} className={classes.link}>
                            {(width !== "xs") &&
                                <TableCell className={classes.smallCell}>
                                    <div style={{
                                        backgroundImage: `url(${char.flavor.portrait})`,
                                        width: "5vw",
                                        height: "5vw",
                                        backgroundSize: "cover",
                                        borderRadius: 10
                                    }} />
                                </TableCell>}
                            <TableCell>{char.flavor.traits.name}</TableCell>
                            <TableCell>{char.stats.classes.map(charClass => StringUtil.generizaClase(charClass.className, char.flavor.traits.pronoun)).join(", ")}</TableCell>
                            {(width !== "xs") && <TableCell>{char.stats.alignment}</TableCell>}
                            {(width !== "xs") && <TableCell>{char.stats.background.name}</TableCell>}
                            {(width !== "xs") && <TableCell>{char.flavor.personality.personalityTraits}</TableCell>}
                        </TableRow>))}
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
                        count={characters.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage} />
                </TableRow>
            </TableFooter>
        </Table>
    )

    return (
        <>
            {characters &&
                <Slide direction="right" in={true} mountOnEnter unmountOnExit>
                    <Paper variant="outlined">
                        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                            <Tab label="Mis Personajes" {...a11yProps(0)} />
                            <Tab label="Personajes de mis Campañas" {...a11yProps(1)} />
                        </Tabs>
                        <TabPanel value={value} index={0}>
                            {(characters && profile) && characters.length > 0 &&
                                <CharacterTable
                                    characters={characters.filter(character => character.player === profile._id)} />
                            }
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            {(characters && profile) && characters.length > 0 &&
                                <CharacterTable
                                    characters={characters.filter(character => character.player !== profile._id)} />
                            }                            
                        </TabPanel>
                    </Paper>
                </Slide>}
        </>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterScreen);