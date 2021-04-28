import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        height: "100%",
        width: "100%"
    },
    paper: {
        padding: "1rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        height: "100%"
    },
    stat: {
        textAlign: "center"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',

    }
});

export default useStyles;