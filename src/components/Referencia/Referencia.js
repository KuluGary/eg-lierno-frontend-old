import React from 'react';
import Slide from "@material-ui/core/Slide";

function Reference(props) {
    return (
        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
            <div style={{ height: "85vh" }}>
                <iframe
                    src="https://cylira.github.io/dnd5e-referencia/"
                    style={{
                        overflow: "hidden"/* Hide vertical scrollbar */
                    }}
                    width="100%"
                    height="100%"   
                    frameBorder="0"
                />
            </div>
        </Slide>
    )
}

export default Reference;