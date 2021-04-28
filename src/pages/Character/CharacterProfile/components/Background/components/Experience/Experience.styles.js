import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    paper: {
        display: "flex",
        flexDirection: "row",
        alignItems: 'center'
    },
    stat: {
        margin: "0 1.5rem",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: 'start',
        width: "100%"      
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',

    }
});

export default useStyles;