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
    stat: {
        margin: "0 1.5rem",
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',
    },
    img: {
        width: "100%"
    },
    trait: {
        maxHeight: "7rem"
    },
    row: {
        '&:hover': {
            cursor: 'pointer'
        }
    }
});

export default useStyles;