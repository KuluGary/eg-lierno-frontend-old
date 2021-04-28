import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
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
        textAlign: "center",
        width: "100%"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',
    },
    resize: {
        fontSize: 11
    },
    cell: {
        padding: "0 .5rem",
        maxWidth: "4rem"
    },
    smallCell: {
        maxWidth: "2rem"
    },
    header: {
        width: "100%",
        margin: ".4rem 0"
    },
    subtitleContainer: {
        textAlign: "center",
    },
    subtitle: {
        fontSize: '11px', 
        opacity: .7, 
        margin: ".2rem"
    },
    divider: {
        width: "100%"
    },
});

export default useStyles;