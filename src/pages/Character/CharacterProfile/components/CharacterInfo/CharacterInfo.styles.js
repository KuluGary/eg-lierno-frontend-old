import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%",
        paddingRight: 8,
        paddingLeft: 0
    },
    paper: {
        margin: 0,
        padding: "1rem",
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        height: "100%"
    },
    info: {
        margin: "0 1rem"
    },
    stat: {
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        maxWidth: "20%",
        alignItems: "center"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',
    },
    buttonFont: {
        fontSize: ".7rem"
    },
    button: {
        padding: ".3rem"
    },
    input: {
        padding: "0px 14px",
        width: "100%",
        margin: ".5rem",
    },
    avatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));

export default useStyles;