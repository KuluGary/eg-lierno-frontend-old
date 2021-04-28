import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    paper: {
        padding: ".4rem 0",
        display: "flex",
        flexDirection: "row",
        alignItems: 'center'
    },
    stat: {
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: 'start',
        width: "100%"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none'
    }
});

export default useStyles;