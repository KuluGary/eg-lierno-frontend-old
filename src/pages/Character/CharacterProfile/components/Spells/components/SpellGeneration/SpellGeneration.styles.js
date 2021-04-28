import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    container: {
        width: "100%",
        paddingLeft: "4px"
    },
    avatar: {
        borderRadius: 10,
        width: "4rem"
    },
    resize: {
        fontSize: 8,
        textAlign: 'center'
    },
    textField: {
        "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none"
        },

        "& input[type=number]": {
            "-moz-appearance": "textfield"
        }
    },
    subListHeader: {
        margin: ".5rem"
    }
});

export default useStyles;