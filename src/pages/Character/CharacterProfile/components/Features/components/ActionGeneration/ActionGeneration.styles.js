import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        width: "100%",
    },
    paper: {
        // padding: "1rem",
        height: "100%",
    },
    action: {
        margin: "1rem 0",
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',
    },
    fullWidthDivier: {
        margin: ".5rem 0"
    },
    image: {
        maxHeight: "75vh",
        float: "right",
        display: "block",
        margin: "1rem",
        borderRadius: 20
    },
    resize: {
        fontSize: 11
    },
    title: {
        fontSize: 14
    },
    numberInput: {
        textAlign: 'center',
        "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none"
        },

        "& input[type=number]": {
            "-moz-appearance": "textfield"
        }
    },
    subtitleContainer: {
        padding: ".1rem 1rem",
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center"
    },
    subtitle: {
        fontSize: "11px",
        opacity: .5,
        margin: ".2rem"
    }
});

export default useStyles;