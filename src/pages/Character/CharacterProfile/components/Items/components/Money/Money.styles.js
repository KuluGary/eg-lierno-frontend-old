import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        margin: "0 .1rem .2rem .1rem",
        display: "flex",
        flexWrap: "wrap",
        height:"100%"
    },
    paper: {
        padding: ".5rem",
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "center",
        width: "32%",
        margin: ".1rem",
        height:"100%"
    },
    stat: {
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        width: "100%"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',

    },
    resize: {
        fontSize: 8,
        textAlign: 'center'
    },
    textField: {
        textAlign: 'center',
        "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none"
        },

        "& input[type=number]": {
            "-moz-appearance": "textfield"
        }
    }
});

export default useStyles;