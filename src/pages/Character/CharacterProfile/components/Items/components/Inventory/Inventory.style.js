import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        margin: "0 .1rem .2rem .1rem",
    },
    paper: {
        padding: "1rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center'
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