import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        height: "100%",
        width: "100%",
        flexDirection: "column"
    },
    paper: {
        padding: "1rem .5rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        height: "100%"
    },
    stat: {
        textAlign: "center",
        width: "100%"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',

    },
    subtitle: {
        fontSize: '11px', 
        opacity: .7, 
        margin: ".2rem"
    },
});

export default useStyles;