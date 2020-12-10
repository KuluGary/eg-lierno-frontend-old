import React from 'react';
import Block from  "./Block";

export default function MediaCard(props) {
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