import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { useWidth } from '../../helpers/media-query';
import Api from "../../helpers/api";

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

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

export default function MediaCard() {
    const classes = useStyles();
    const [characters, setCharacters] = useState([])
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const width = useWidth();

    useEffect(() => {
        const url = Api.getKey('base_url') + '/characters';

        Api.fetchInternal('/characters')
            .then(res => setCharacters(res))
    }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
            <Paper variant="outlined">
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {(width !== "xs") &&
                                <>
                                    <TableCell className={classes.smallCell}></TableCell>
                                </>}
                            <TableCell>Nombre</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {characters.length > 0 && characters
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(char => (
                                <TableRow component={Link} to={'/characters/' + char._id} className={classes.link}>
                                    {(width !== "xs") &&
                                        <>
                                            <TableCell className={classes.smallCell}>
                                                <div style={{
                                                    backgroundImage: `url(${char.character[0].image_url})`,
                                                    width: "5vw",
                                                    height: "5vw",
                                                    backgroundSize: "cover"
                                                }} />
                                            </TableCell>
                                        </>}
                                    <TableCell>{char.character[0].character_name}</TableCell>                                    
                                </TableRow>
                            ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={5, 10, 15}
                                colspan={12}
                                count={characters.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage} />
                        </TableRow>
                    </TableFooter>
                </Table>
            </Paper>
            {/* <div className={classes.root}>
                {characters && characters.map((char, index) => (
                    <Card className={classes.card} key={index}>
                        <CardActionArea component={Link} to={'/characters/' + char._id}>
                            <CardMedia
                                className={classes.media}
                                image={char.character[0].image_url}
                                title={char.character[0].character_name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {char.character[0].character_name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    <span>{char.character[0].subrace && char.character[0].subrace}&nbsp;{char.character[0].race}&nbsp;</span>
                                    {char.character[0].classes.map((charClass, index) => (
                                        <span key={index}>
                                            {charClass["class-name"]}({charClass["class-level"]})
                                        </span>
                                    ))}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </div> */}
        </Slide>
    );
}