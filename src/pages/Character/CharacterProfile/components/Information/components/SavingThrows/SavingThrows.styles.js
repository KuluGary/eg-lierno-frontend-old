import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        height: "100%",
        width: "100%"
    },
    paper: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center'
    },
    stat: {
        textAlign: "center"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none'
    },
    subtitleContainer: {
        padding: ".1rem 1rem",
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center",
        width: "100%"
    },
    subtitle: {
        fontSize: "11px",
        opacity: .5,
        margin: ".2rem"
    }
});

export default useStyles;