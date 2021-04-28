import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        width: "100%",
        paddingLeft: "4px"
        // paddingLeft: "4px"
    },
    container: {
        maxWidth: "45vw"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none'
    },
    flexGrid: {
        display: "flex",
        width: "100%"
    }
});

export default useStyles;