import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        // fontWeight: 600,
    },
    title: {
        marginTop: theme.spacing(2),
    },
    formControl: {
        // margin: theme.spacing(1),
        minWidth: "100%",
    },
    formControlMargin: {
        marginTop: 0
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));

export default useStyles;