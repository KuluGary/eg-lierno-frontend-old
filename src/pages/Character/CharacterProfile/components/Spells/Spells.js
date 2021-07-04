import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
    Paper,
    Typography,
    Box,
    Grid,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableFooter,
    TableCell,
    TablePagination,
    Tabs,
    Tab,
    Checkbox,
    IconButton,
    Divider,
    Tooltip,
} from "@material-ui/core";

import {
    Add as AddIcon,
    Close as CloseIcon,
    SortByAlpha as SortByAlphaIcon,
    CheckCircleOutline as CheckCircleOutlineIcon,
} from "@material-ui/icons";

import Api from "helpers/api";

import {
    SpellCasting,
    SpellDC,
    SpellBonus,
    SpellSlots,
    SpellGeneration,
    SpellBurnout,
    OtherResource,
} from "./components";

import useStyles from "./Spells.styles";

const SORTBY = {
    ASC: 0,
    PREP: 1,
};

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        fontSize: theme.typography.pxToRem(14),
    },
}))(Tooltip);

export default function Spells(props) {
    const classes = useStyles();
    const [spellIds, setSpellIds] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();
    const [tableItems, setTableItems] = useState([]);
    const [spells, setSpells] = useState();
    const [selectedSpell, setSelectedSpell] = useState();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [sortType, setSortType] = useState(SORTBY.ASC);
    const prepared_casters = ["Druida", "Clérigo", "Mago"];

    useEffect(() => {
        setSpellIds(props.spellIds);

        Api.fetchInternal("/spells", {
            method: "POST",
            body: JSON.stringify(props.spellIds.map((spellId) => spellId.spellId)),
        }).then((res) => {
            setSpells(res);
            let cats = [];
            res.forEach((spell) => !cats.includes(spell.stats.level) && cats.push(spell.stats.level));
            setCategories(cats.sort());
            setSelectedCategory(cats[0]);
            setTableItems(
                res.filter((spell) => {
                    return spell.stats.level === cats[0];
                }),
            );
        });
    }, []);

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            "aria-controls": `simple-tabpanel-${index}`,
        };
    }

    const handleChange = (_, newValue) => {
        setPage(0);
        setSelectedCategory(newValue);
        setTableItems(spells.filter((spell) => spell.stats.level === newValue));
    };

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const addNewSpell = (id, item) => {
        if (!spellIds.includes(id)) {
            props.changeStats("spells", [...spellIds, { spellId: id, prepared: false }]);
            setSpellIds([...spellIds, { spellId: id, prepared: false }]);

            if (item.stats.level === selectedCategory) {
                setTableItems([...tableItems, item]);
            }

            setSpells([...spells, item]);
            let cats = [...categories];
            [...spells, item].forEach((spell) => !cats.includes(spell.stats.level) && cats.push(spell.stats.level));
            setCategories(cats.sort());
        }

        setDialogOpen(false);
    };

    const removeSpell = (id) => {
        let newSpells = [...spellIds];
        const index = spellIds.findIndex((item) => item.spellId === id);

        newSpells.splice(index, 1);

        props.changeStats("spells", newSpells);
        setSpellIds(newSpells);
        setSpells(spells.filter((spell) => spell._id !== id));
        setTableItems(tableItems.filter((item) => item._id !== id));
    };

    const prepareSpell = (id) => {
        let newSpells = [...spellIds];
        const index = newSpells.findIndex((spell) => spell.spellId === id);

        newSpells[index].prepared = !newSpells[index].prepared;
        props.changeStats("spells", newSpells);
        setSpellIds(newSpells);
    };

    const isPreparedClass = () => {
        return props.features.classes.some((i) => prepared_casters.includes(i.className));
    };

    const toggleSort = () => {
        switch (sortType) {
            case SORTBY.ASC:
                return setSortType(SORTBY.PREP);
            default:
                return setSortType(SORTBY.ASC);
        }
    };

    const SortButton = () => {
        switch (sortType) {
            case SORTBY.ASC:
                return (
                    <HtmlTooltip disableFocusListener title={"Mostrar preparados"}>
                        <IconButton onClick={toggleSort}>
                            <CheckCircleOutlineIcon fontSize="small" />
                        </IconButton>
                    </HtmlTooltip>
                );
            default:
                return (
                    <HtmlTooltip disableFocusListener title={"Ordenar alfabéticamente"}>
                        <IconButton onClick={toggleSort}>
                            <SortByAlphaIcon fontSize="small" />
                        </IconButton>
                    </HtmlTooltip>
                );
        }
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                <SpellGeneration open={dialogOpen} setDialogOpen={setDialogOpen} addNewSpell={addNewSpell} />
                <Grid item xs={12} container spacing={1}>
                    <Grid item lg={8} container spacing={1}>
                        <Grid item lg={2} className={classes.trait}>
                            <SpellCasting
                                ability={props.features.spellcastingAbility}
                                changeStats={props.changeStats}
                                editable={props.editable}
                            />
                        </Grid>
                        <Grid item lg={2} className={classes.trait}>
                            <SpellDC
                                ability={props.features["spellcastingAbility"]}
                                proficiency={props.proficiencyBonus}
                                abilityScores={props.features["abilityScores"]}
                            />
                        </Grid>
                        <Grid item lg={2} className={classes.trait}>
                            <SpellBonus
                                ability={props.features["spellcastingAbility"]}
                                proficiency={props.proficiencyBonus}
                                abilityScores={props.features["abilityScores"]}
                            />
                        </Grid>
                        <Grid item lg={2} className={classes.trait}>
                            <SpellSlots
                                spellSlots={props.features.spellSlots}
                                classes={props.features.classes}
                                changeStats={props.changeStats}
                                spellLevel={selectedCategory}
                                editable={props.editable}
                            />
                        </Grid>
                        <Grid item lg={2} className={classes.trait}>
                            <SpellBurnout burnout={props.features["spellBurnout"]} changeStats={props.changeStats} />
                        </Grid>
                        <Grid item lg={2} className={classes.trait}>
                            <OtherResource
                                extraResource={props.features["extraResource"]}
                                changeStats={props.changeStats}
                                editable={props.editable}
                            />
                        </Grid>

                        <Grid item lg={12} style={{ height: "calc(100% - 7rem)" }}>
                            <Paper variant="outlined" style={{ height: "100%" }}>
                                <Box style={{ display: "flex", justifyContent: "space-between" }}>
                                    <Tabs
                                        variant="scrollable"
                                        value={selectedCategory}
                                        onChange={handleChange}
                                        aria-label="simple tabs example"
                                    >
                                        {categories.map((category, index) => (
                                            <Tab
                                                key={index}
                                                label={category === 0 ? "Trucos" : "Nivel " + category}
                                                {...a11yProps(category)}
                                                value={category}
                                            />
                                        ))}
                                    </Tabs>
                                    <Box style={{ maxWidth: "35%", display: "flex" }}>
                                        {selectedCategory !== 0 && isPreparedClass() && <SortButton />}
                                        <IconButton disabled={!props.editable} onClick={() => setDialogOpen(true)}>
                                            <AddIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </Box>
                                <Divider />
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            {selectedCategory !== 0 && isPreparedClass() && (
                                                <TableCell>¿Preparado?</TableCell>
                                            )}
                                            <TableCell>Nombre</TableCell>
                                            <TableCell>Escuela</TableCell>
                                            <TableCell>Tiempo de lanzamiento</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {tableItems.length > 0 &&
                                            tableItems
                                                .sort((a, b) => {
                                                    if (sortType === SORTBY.ASC) {
                                                        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
                                                    } else {
                                                        const aPrepared = spellIds?.find(
                                                            (spellData) => spellData.spellId === a._id,
                                                        ).prepared;
                                                        const bPrepared = spellIds?.find(
                                                            (spellData) => spellData.spellId === b._id,
                                                        ).prepared;

                                                        return aPrepared === bPrepared ? 0 : aPrepared ? -1 : 1;
                                                    }
                                                })
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((spell) => (
                                                    <TableRow
                                                        key={spell._id}
                                                        hover
                                                        className={classes.row}
                                                        selected={spell._id === selectedSpell?._id}
                                                        onClick={() => setSelectedSpell(spell)}
                                                    >
                                                        {selectedCategory !== 0 && isPreparedClass() && (
                                                            <TableCell>
                                                                <Checkbox
                                                                    disabled={!props.editable}
                                                                    color={"default"}
                                                                    onClick={() => prepareSpell(spell._id)}
                                                                    checked={
                                                                        spellIds?.filter(
                                                                            (spellData) =>
                                                                                spellData.spellId === spell._id,
                                                                        )[0]?.prepared
                                                                    }
                                                                />
                                                            </TableCell>
                                                        )}
                                                        <TableCell className={classes.bold}>
                                                            <Typography variant={"subtitle2"} display="inline">
                                                                {spell.name}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>{spell.stats.school}</TableCell>
                                                        <TableCell>{spell.stats.castingTime}</TableCell>
                                                        <TableCell>
                                                            <IconButton
                                                                size="small"
                                                                disabled={!props.editable}
                                                                onClick={() => removeSpell(spell._id)}
                                                            >
                                                                <CloseIcon fontSize="small" />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TablePagination
                                                rowsPerPageOptions={[5, 10, 15]}
                                                colSpan={12}
                                                labelRowsPerPage={"Filas por página: "}
                                                labelDisplayedRows={({ from, to, count }) => {
                                                    return "" + from + "-" + to + " de " + count;
                                                }}
                                                count={tableItems.length}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                onChangePage={handleChangePage}
                                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                            />
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <Paper variant="outlined" className={classes.paper}>
                            {selectedSpell && (
                                <Box>
                                    <Typography variant="h6">{selectedSpell.name}</Typography>
                                    <Typography variant="subtitle1">
                                        {(selectedSpell.stats.level > 0
                                            ? "Nivel " + selectedSpell.stats.level
                                            : "Truco") +
                                            ", " +
                                            selectedSpell.stats.school}
                                    </Typography>
                                    {selectedSpell.stats.components.type && (
                                        <Box>
                                            <Box component="p">
                                                <Typography variant={"subtitle2"} display="inline">
                                                    {"Componentes. "}
                                                </Typography>
                                                <Box component="span">{selectedSpell.stats.components.type}</Box>
                                                {selectedSpell.stats.components.description && (
                                                    <Box component="span">
                                                        {", " + selectedSpell.stats.components.description}
                                                    </Box>
                                                )}
                                            </Box>
                                        </Box>
                                    )}
                                    {selectedSpell.stats.castingTime && (
                                        <Box>
                                            <Box component="p">
                                                <Typography variant={"subtitle2"} display="inline">
                                                    {"Tiempo de lanzamiento. "}
                                                </Typography>
                                                <Box component="span">{selectedSpell.stats.castingTime}</Box>
                                            </Box>
                                        </Box>
                                    )}
                                    {selectedSpell.stats.range && (
                                        <Box>
                                            <Box component="p">
                                                <Typography variant={"subtitle2"} display="inline">
                                                    {"Alcance. "}
                                                </Typography>
                                                <Box component="span">{selectedSpell.stats.range}</Box>
                                            </Box>
                                        </Box>
                                    )}

                                    {selectedSpell.stats.duration && (
                                        <Box>
                                            <Box component="p">
                                                <Typography variant={"subtitle2"} display="inline">
                                                    {"Duración. "}
                                                </Typography>
                                                <Box component="span">{selectedSpell.stats.duration}</Box>
                                            </Box>
                                        </Box>
                                    )}
                                    <p dangerouslySetInnerHTML={{ __html: selectedSpell.stats.description }} />
                                </Box>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
