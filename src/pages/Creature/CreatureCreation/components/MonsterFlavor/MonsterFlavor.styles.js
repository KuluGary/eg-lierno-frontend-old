import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formControl: {
        // margin: theme.spacing(1),
        minWidth: "100%",
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    image: {
        border: `1px solid ${theme.palette.divider}`,
        float: "left",
        width: "100%",
        borderRadius: 4
    }
}));

export default useStyles;