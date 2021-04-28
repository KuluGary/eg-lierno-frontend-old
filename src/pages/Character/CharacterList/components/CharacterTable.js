import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { StringUtil } from "helpers/string-util";
import { useWidth } from 'helpers/media-query';
import Image from "components/Image/Image";
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';


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

export default function CharacterTable(props) {
    const classes = useStyles();
    const [selectedData, setSelectedData] = useState();
    const { page } = props
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { characters, profile, handleChangePage, handleChangeRowsPerPage } = props;
    const open = Boolean(anchorEl);
    const width = useWidth();
    const theme = useTheme();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <div>
            <Table className={classes.table}>
                <TableBody>
                    {(characters && profile) && characters.length > 0 && characters
                        .slice(page * props.rowsPerPage, page * props.rowsPerPage + props.rowsPerPage)
                        .map(char => (
                            <TableRow hover key={char._id} component={Link} to={'/characters/' + char._id} className={classes.link}>
                                {(width !== "xs") &&
                                    <TableCell style={{ padding: "1.5rem" }}>
                                        <Box style={{ display: "flex", justifyContent: "space-between" }}>
                                            <Box style={{ display: "flex", alignItems: "center" }}>
                                                <Image
                                                    mode="background"
                                                    usage="avatar"
                                                    src={char.flavor.portrait}
                                                    containerStyle={{
                                                        border: `1px solid ${theme.palette.divider}`,
                                                        borderRadius: "100%",
                                                        width: "4vw",
                                                        height: "4vw",
                                                    }}
                                                    style={{
                                                        backgroundImage: `url(${char.flavor.portrait})`,
                                                        width: "4vw",
                                                        height: "4vw",
                                                        backgroundSize: "cover",
                                                        borderRadius: "100%"
                                                    }} />
                                                <Box style={{ margin: "0 1rem" }}>
                                                    <Box component="div" >
                                                        <Typography variant="body1" style={{ fontWeight: "500", fontSize: "1rem" }}>
                                                            {char.flavor.traits.name}
                                                        </Typography>
                                                    </Box>
                                                    <Box component="div">
                                                        <Typography variant="caption">
                                                            {char.stats.race?.name && char.stats.race.name + ', '}
                                                            {char.stats.classes.length > 0 ?
                                                                char.stats.classes.map(charClass => `${StringUtil.generizaClase(charClass.className, char.flavor.traits.pronoun)} nivel ${charClass.classLevel}`).join(", ") :
                                                                `${StringUtil.generizaClase("Novato", char.flavor.traits.pronoun)} nivel 0`
                                                            }
                                                        </Typography>
                                                    </Box>
                                                    <Box component="div">
                                                        <Typography variant="caption">
                                                            {char.stats.background.name}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                            {props.profile && props.profile._id === char.player &&
                                                <Link>
                                                    <IconButton onClick={(e) => {
                                                        setSelectedData(char._id)
                                                        return handleMenu(e)
                                                    }}>
                                                        <MoreHorizIcon />
                                                    </IconButton>
                                                </Link>
                                            }
                                        </Box>
                                        <Box style={{ marginTop: "1rem" }}>
                                            <Typography variant="body2">{char.flavor.psychologicalDescription}</Typography>
                                        </Box>
                                    </TableCell>}
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
                            rowsPerPage={props.rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage} />
                    </TableRow>
                </TableFooter>
            </Table>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={() => props.history.push('/characters/' + selectedData)}>Editar</MenuItem>
                <MenuItem onClick={() => {
                    handleClose();
                    props.deleteCharacter(selectedData)
                }}>Eliminar</MenuItem>
            </Menu>
        </div>
    )
}
