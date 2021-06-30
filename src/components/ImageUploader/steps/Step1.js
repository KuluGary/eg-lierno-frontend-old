import React, { useState } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import { TextField, Divider, Box } from "@material-ui/core";

function Step1({ setUpImg }) {
    const [url, setUrl] = useState("");
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        const userUrl = e.target.value;

        setUrl(userUrl);

        fetch(userUrl)
            .then((res) => res.blob())
            .then((blob) => {
                if (blob.type.match(/^(image)+\/[-\w.]+$/)) {
                    setError(false);
                    setUpImg(blob);
                } else {
                    setError(true);
                }
            })
            .catch(() => setError(true));
    };

    return (
        <>
            <DropzoneArea
                filesLimit={1}
                showPreviews={false}
                dropzoneText="Arrastra o añade tu imagen"
                onChange={(fileArray) => setUpImg(fileArray[0])}
                onDelete={() => setUpImg()}
            />
            <Box
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "1rem 0",
                }}
            >
                <Divider style={{ width: "30%" }} />
                <Box style={{ margin: "0 1rem", opacity: 0.5 }}>O</Box>
                <Divider style={{ width: "30%" }} />
            </Box>
            <TextField
                error={error}
                fullWidth
                value={url}
                variant="outlined"
                onChange={handleChange}
                placeholder="Introduce una URL válida"
                helperText={error && "URL inválida"}
            />
        </>
    );
}

export { Step1 };
