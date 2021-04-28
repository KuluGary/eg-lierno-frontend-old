import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    root: {
        width: "100%",
        height: "100%"
    },
    paper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        height: "100%",
        width: "100%"
    },
    stat: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',
    },
    resize: {
        fontSize: 11
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
    },
    contentContainer: {
        display: "flex",
        flexDirection: "column",
        minHeight: "75%"
    },
    contentItem: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center"
    },
    contentText: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        margin: ".5rem",
        width: "100%"
    }
});

// const useStyles = makeStyles({
//     root: {
//         width: "95%",
//         height: "100%"
//     },
//     paper: {
//         padding: "1rem",
//         display: "flex",
//         flexDirection: "row",
//         justifyContent: 'center',
//         height: "100%",
//         width: "100%"
//     },
//     stat: {
//         textAlign: "center",
//         width: "100%"
//     },
//     link: {
//         color: 'inherit',
//         textDecoration: 'none',

//     },
//     textField: {
//         fontSize: 11,
//         textAlign: 'center',
//         "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
//             display: "none"
//         },

//         "& input[type=number]": {
//             "-moz-appearance": "textfield"
//         }
//     },
//     resize: {
//         fontSize: 11
//     }
// });

export default useStyles;