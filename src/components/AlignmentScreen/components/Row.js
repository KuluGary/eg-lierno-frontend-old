import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Block from  "./Block";

const useStyles = makeStyles({
    root: {
        display: "flex"
    },
    paper: {
        margin: 0,
        padding: "1rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center'
    },
    stat: {
        margin: "0 1.5rem",
        textAlign: "center"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',

    }
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
        <tr>
            {props.alignments.map((alignment, index) => (
                <Block
                    key={index}
                    characters={props.characters}
                    alignment={alignment}
                    row={props.row}
                    column={index}
                    changeAlignment={props.changeAlignment}
                />
            ))}
        </tr>
    );
}