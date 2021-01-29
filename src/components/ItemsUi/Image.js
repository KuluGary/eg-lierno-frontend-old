import React, { useState, useEffect } from 'react';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';
import Paper from '@material-ui/core/Paper';
import PersonIcon from '@material-ui/icons/Person';
import ModalImage from "./ModalImage";

export default function Image(props) {
    const [errored, setErrored] = useState(false);

    const onError = () => {
        if (!errored) {
            setErrored(true);
        }
    }

    useEffect(() => {
        setErrored(false);
    }, [props.src])

    if (errored || !props.src) {
        return (
            <Paper
                style={props.errorStyle ? { ...props.errorStyle, display: "flex", justifyContent: "center", alignItems: "center" } :
                    { ...props.style, display: "flex", justifyContent: "center", alignItems: "center" }}
                variant="outlined">
                {props.usage === "avatar" ?
                    <PersonIcon style={{ opacity: ".5" }} /> :
                    <BrokenImageIcon style={{ opacity: ".5" }} />}
            </Paper>
        )
    }

    switch (props.mode) {
        case 'background':
            return (
                <div>
                    <img
                        src={props.src}
                        className={props.className}
                        onError={onError}
                        style={{ display: "none" }} />
                    <div style={{
                        ...props.style
                    }} />
                </div>
            )
        case 'modal':
            return (
                <div>
                    <ModalImage
                        style={{ ...props.style }}
                        // className={classes.image}
                        imgSrc={props.src}
                        className={props.className}
                        onError={onError}
                    />                    
                </div>
            )
        default:
            return (
                <img
                    src={props.src}
                    onError={onError}
                    className={props.className}
                    style={{ ...props.style }} />
            )
    }
}
