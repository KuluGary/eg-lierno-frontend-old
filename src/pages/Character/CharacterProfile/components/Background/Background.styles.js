import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        width: "100%",
        paddingLeft: "4px",
    },
    paper: {
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
    image: {
        height: "35vh",
        float: "left",
        display: "block",
        margin: "0 auto",
        padding: "0 1rem .5rem 0"
    },
    trait: {
        margin: "0 1rem"
    },
    psychTrait: {
        margin: ".5rem 1rem"
    },
    physicalTraits: {
        marginBottom: "1rem"
    },
    profileBox: {
        padding: "1rem",
        minHeight: "60vh",
        height: "100%"
    },
    traitBox: {
        minHeight: "100%"
    }
});

export default useStyles;