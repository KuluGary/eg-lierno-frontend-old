import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog';

export default function ModalImage(props) {
    const [open, setOpen] = useState(false);
    const { imgSrc, style, onError, className } = props;

    return (
      <>
        <Dialog open={open} onClose={() => setOpen(false)} PaperComponent={"span"} scroll="body" maxWidth={false}>
          <div
            onClick={() => setOpen(false)}
            style={{
              height: "90vh",
              width: "90vw",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={imgSrc || imgSrc}
              aria-label={props.ariaLabel || "Imagen modal"}
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        </Dialog>
        <img
          src={imgSrc}
          onClick={setOpen}
          aria-label={props.ariaLabel || "Imagen"}
          style={{ ...style, cursor: "pointer" }}
          onError={onError}
          className={className}
        />
      </>
    );
}
