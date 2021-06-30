import React, { useEffect, useState } from "react";
import Api from "helpers/api";
import { CircularProgress, Box, Typography } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

function Step3({ upImg, cropImg, setImage, setDone }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (upImg && cropImg) {
            setLoading(true);
            const headers = new Headers();
            const formData = new FormData();

            formData.append("original", upImg);
            formData.append("crop", cropImg);

            const options = {
                method: "POST",
                headers,
                body: formData,
            };

            Api.fetchInternal("/image", options)
                .then(({ images }) => {
                    const imgObj = {};

                    for (const image of images) {
                        imgObj[image.type] = image.link;
                    }

                    setImage(imgObj);
                    setLoading(false);
                    setDone(true);
                })
                .catch((error) => console.error(error));
        }
    }, [upImg, cropImg]);

    if (loading)
        return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress color="default" />
            </div>
        );

    return (
        <Box
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
            }}
        >
            <Box style={{ textAlign: "center" }}>
                <CheckCircleIcon fontSize="large" />
                <Typography variant="h6">La imagen se ha guardado con éxito.</Typography>
            </Box>
        </Box>
    );
}

export { Step3 };
