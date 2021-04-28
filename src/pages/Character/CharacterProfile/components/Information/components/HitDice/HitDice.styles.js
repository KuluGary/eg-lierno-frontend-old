import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        height: "100%",
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
        fontSize: "11px",
        opacity: .5,
        margin: ".2rem"
    },
    divider: {
        width: "100%",
        margin: ".2rem 0"
    },
    statContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: "100%"
    },
    stat: {
        textAlign: "center",
        padding: "1rem 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    link: {
        color: "inherit",
        textDecoration: "none",

    },
    buttonFont: {
        fontSize: ".7rem"
    },
    button: {
        padding: ".3rem"
    },
    input: {
        padding: "0px 14px",
        width: "100%",
        margin: ".5rem",
    },
    resize: {
        fontSize: 21,
        textAlign: "center",
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