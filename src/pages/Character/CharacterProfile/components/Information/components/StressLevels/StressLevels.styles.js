import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        width: "100%",
        height: "100%"
    },
    paper: {
        padding: "1rem",
        height: "100%"
    },
    stat: {
        margin: "0 1.5rem",
        textAlign: "center"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',

    },
    resize: {
        fontSize: 11,
        textAlign: "center"
    },
    textField: {
        "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none"
        },
        maxWidth: "3rem",
        textAlign: "center",
        "& input[type=number]": {
            "-moz-appearance": "textfield"
        }
    }
});

export default useStyles;