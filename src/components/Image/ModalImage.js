import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog';

export default function ModalImage(props) {
    const [open, setOpen] = useState(false);
    const { imgSrc, style, onError, className } = props;

    return (
        <>
            <Dialog
                open={open}
                onClose={() => setOpen(false)} 
                PaperComponent={'span'}
                scroll="body"
                >
                <img
                    src={imgSrc || imgSrc}
                    style={{ height: "100%", maxHeight: "100vh", minHeight: "80vh" }} />
            </Dialog>
            <img
                src={imgSrc}
                onClick={setOpen}
                style={{...style, cursor: "pointer"}}
                onError={onError}
                className={className} />
        </>
    )
}
