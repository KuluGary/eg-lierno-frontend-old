import { CircularProgress } from "@material-ui/core";
import React, { useCallback, useRef, useState, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

function Step2({ upImg, setCropImg }) {
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [fullImg, setFullImg] = useState();
    const [completedCrop, setCompletedCrop] = useState(null);
    const [crop, setCrop] = useState({
        unit: "%",
        width: 30,
        aspect: 1,
    });

    useEffect(() => {
        if (upImg) {
            const reader = new FileReader();
            reader.addEventListener("load", () => setFullImg(reader.result));
            reader.readAsDataURL(upImg);
        }
    }, []);

    useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
            return;
        }

        const image = imgRef.current;
        const canvas = previewCanvasRef.current;
        const crop = completedCrop;

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext("2d");
        const pixelRatio = window.devicePixelRatio;

        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = "high";

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height,
        );
    }, [completedCrop]);

    useEffect(() => {
        return () => {
            const canvas = previewCanvasRef.current;

            canvas.toBlob(
                (blob) => {
                    const file = new File([blob], upImg.name, {
                        type: upImg.type,
                    });
                    setCropImg(file);
                },
                upImg.type,
                1,
            );
        };
    }, []);

    const onLoad = useCallback((img) => {
        imgRef.current = img;
    }, []);

    if (!fullImg) return <CircularProgress />;

    return (
        <div>
            <div style={{ textAlign: "center" }}>
                Esta será la imagen que se utilice para tu avatar y tu token
            </div>
            <div style={{ textAlign: "center" }}>
                <ReactCrop
                    src={fullImg}
                    imageStyle={{ maxHeight: "40vh" }}
                    onImageLoaded={onLoad}
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    onComplete={(c) => setCompletedCrop(c)}
                />
                <div>
                    <canvas
                        ref={previewCanvasRef}
                        // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                        style={{
                            width: Math.round(completedCrop?.width / 2 ?? 0),
                            height: Math.round(completedCrop?.height / 2 ?? 0),
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export { Step2 };
