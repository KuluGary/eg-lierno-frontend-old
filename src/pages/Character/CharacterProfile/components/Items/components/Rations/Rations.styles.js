
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    paper: {
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        margin: ".5rem 0",
        height: "100%"
    },
    stat: {
        margin: "0 1.0rem",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: 'space-between',
        width: "100%"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',

    }
});

export default useStyles;