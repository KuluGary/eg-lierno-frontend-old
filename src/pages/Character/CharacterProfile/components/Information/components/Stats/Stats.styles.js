import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        height: "100%"
    },
    paper: {
        padding: "1rem 0",
        display: "flex",
        alignItems: 'center',
        height: "100%"
    },
    stat: {
        padding: ".5rem 0",
        height: "100%",
        textAlign: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',

    },
    resize: {
        fontSize: 11,
        textAlign: 'center'
    },
    textField: {
        "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none"
        },

        "& input[type=number]": {
            "-moz-appearance": "textfield"
        },
    }
});

export default useStyles;