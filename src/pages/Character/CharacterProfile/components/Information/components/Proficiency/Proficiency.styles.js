import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        height: "100%",
        width: "100%"
    },
    paper: {
        height: "100%",
        padding: ".2rem",
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
    },
    stat: {
        display: "flex",
        alignItems: "center",
        width: "100%"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',

    },
    resize: {
        fontSize: 14,
        textAlign: 'center'
    },
    textField: {
        "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none"
        },
        width: "25%",

        "& input[type=number]": {
            "-moz-appearance": "textfield"
        }
    }
});

export default useStyles;