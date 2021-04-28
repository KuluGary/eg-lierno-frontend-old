import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        width: "100%",
        paddingLeft: "4px"
    },
    paper: {
        margin: 0,
        padding: "1rem",
        height: "100%"
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
        display: "block",
        margin: "0 auto",
        maxHeight: "100vh",
        maxWidth: "100%"
    }
});

export default useStyles;