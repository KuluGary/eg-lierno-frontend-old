import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root: {
        width: "100%",
        paddingLeft: "4px"
    },
    paper: {
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
        // padding: ".5rem 1rem .5rem .5rem",
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