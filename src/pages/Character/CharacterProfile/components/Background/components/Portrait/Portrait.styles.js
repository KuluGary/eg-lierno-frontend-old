
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    root: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column"
    },
    paper: {
        padding: "1rem .5rem",
        paddingBottom: 0,
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: "100%"
    },
    stat: {
        textAlign: "center",
        width: "100%",
        height: "100%"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',

    },
    resize: {
        fontSize: 11
    },
    input: {
        margin: ".5rem 0 1rem 0"
    }
});

export default useStyles;