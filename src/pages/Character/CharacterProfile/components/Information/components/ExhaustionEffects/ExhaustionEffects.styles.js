import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        width: "100%",
        height: "100%"
    },
    paper: {
        padding: "1rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        height: "100%",
        width: "100%"
    },
    stat: {
        textAlign: "center",
        width: "100%"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',

    },
    label: {
        fontSize: 11
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