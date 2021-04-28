import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    title: {
        marginTop: theme.spacing(2),
    },
    formControl: {
        // minWidth: "100%",
        margin: theme.spacing(0.5)
    },
    chip: {
        margin: theme.spacing(0.5),
    }
}));

export default useStyles;