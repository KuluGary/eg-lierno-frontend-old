import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import { makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { StringUtil } from "../../../helpers/string-util";
import { useWidth } from '../../../helpers/media-query';
import Image from "../../ItemsUi/Image";

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
    // const [page] = useState(0);
    const { page } = props
    // const [rowsPerPage] = useState(5);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { characters, profile, handleChangePage, handleChangeRowsPerPage } = props;
    const open = Boolean(anchorEl);
    const width = useWidth();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <div>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        {(width !== "xs") && <TableCell className={classes.smallCell}></TableCell>}
                        <TableCell>Nombre</TableCell>
                        {(width !== "xs" && props.index === 1) && <TableCell>Jugador</TableCell>}
                        <TableCell>Clase</TableCell>
                        {(width !== "xs" && props.index === 0) && <TableCell>Alineamiento</TableCell>}
                        {(width !== "xs") && <TableCell>Trasfondo</TableCell>}
                        {(width !== "xs") && <TableCell></TableCell>}
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(characters && profile) && characters.length > 0 && characters
                        .slice(page * props.rowsPerPage, page * props.rowsPerPage + props.rowsPerPage)
                        .map(char => (
                            <TableRow hover key={char._id} component={Link} to={'/characters/' + char._id} className={classes.link}>
                                {(width !== "xs") &&
                                    <TableCell className={classes.smallCell}>
                                        <Image
                                            mode="background"
                                            usage="avatar"
                                            src={char.flavor.portrait}
                                            style={{
                                                backgroundImage: `url(${char.flavor.portrait})`,
                                                width: "5vw",
                                                height: "5vw",
                                                backgroundSize: "cover",
                                                borderRadius: 10
                                            }}
                                        />
                                    </TableCell>}
                                <TableCell>{char.flavor.traits.name}</TableCell>
                                {(width !== "xs" && props.index === 1) && <TableCell>{char.player_name}</TableCell>}
                                <TableCell>{char.stats.classes.map(charClass => StringUtil.generizaClase(charClass.className, char.flavor.traits.pronoun)).join(", ")}</TableCell>
                                {(width !== "xs" && props.index === 0) && <TableCell>{char.stats.alignment}</TableCell>}
                                {(width !== "xs") && <TableCell>{char.stats.background.name}</TableCell>}
                                {(width !== "xs") && <TableCell>{char.flavor.personality.personalityTraits}</TableCell>}
                                <TableCell align="right">
                                    {props.profile && props.profile._id === char.player &&
                                        <Link>
                                            <IconButton onClick={(e) => {
                                                setSelectedData(char._id)
                                                return handleMenu(e)
                                            }}>
                                                <MoreVertIcon />
                                            </IconButton>
                                        </Link>
                                    }
                                </TableCell>
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
