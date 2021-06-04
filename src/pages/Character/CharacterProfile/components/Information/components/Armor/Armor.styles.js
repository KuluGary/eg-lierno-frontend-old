import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        height: "100%",
        paddingLeft: ".1rem",
        width: "100%"
    },
    paper: {
        height: "100%",
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "start", 
    },
    header: {
        width: "100%",
        margin: ".4rem"
    },
    subtitleContainer: {
        textAlign: "center",
    },
    subtitle: {
        fontSize: '11px', 
        opacity: .5, 
        margin: ".2rem"
    },
    divider: {
        width: "100%",
        margin: ".2rem 0"
    },
    stat: {
        textAlign: "center",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0 .5rem"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',
    },
    resize: {
        fontSize: 21,
        textAlign: 'center'
    },
    textField: {
        "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none"
        },

        "& input[type=number]": {
            "-moz-appearance": "textfield"
        }
    }
});

export default useStyles;