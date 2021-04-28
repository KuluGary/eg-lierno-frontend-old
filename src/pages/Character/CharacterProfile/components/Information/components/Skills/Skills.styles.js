import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        height: "100%"
    },
    paper: {
        // padding: ".2rem",
        // display: "flex",
        // flexDirection: "row",
        // justifyContent: 'center'
    },
    stat: {
        textAlign: "center"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',

    },
    smallCell: {
        width: "2rem"
    },
    radio: {
        padding: 0
    },
    resize: {
        fontSize: 11
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