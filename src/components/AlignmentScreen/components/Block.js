import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    block: {
        width: "20%",
        height: "20%",
        padding: "2rem",
        textAlign: "center",
        position: "relative",
        borderWidth: "1px",
        borderStyle: "dashed",
        borderColor: "#ccc",
    },
    characterContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        fontSize:".8rem",
        margin: ".2rem"
    },
});

export default function MediaCard(props) {
    const classes = useStyles();

    useEffect(() => {

    }, [])

    const checkIndex = () => {
        switch (props.column) {
            case 4:
                return { ...props.style, borderRight: "none", borderTop: "none" }
            default:
                return { ...props.style }
        }
    }

    return (
        <td onClick={() => props.changeAlignment(null, props.alignment)} className={classes.block}>
            <div className={classes.characterContainer}>
                {props.characters
                    .filter(character => character.alignment === props.alignment.stat)
                    .map(character => <div>{character.name}</div>)}
            </div>
            {props.alignment && props.alignment.friendlyName}
        </td>
    );
}