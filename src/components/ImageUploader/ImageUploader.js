import React from 'react';
import { DropzoneDialog } from 'material-ui-dropzone';
import { toast } from 'react-toastify';
import Api from "helpers/api";

export default function ImageUploader({ open, setOpen, setImage }) {
    const handleSave = (files) => {
        console.log(files)
        if (files.length) {
            const apiUrl = `https://api.imgur.com/3/image`;
            const headers = new Headers();
            const formData = new FormData();

            headers.append("Authorization", `Client-ID ${Api.envVar("IMGUR_CLIENT_ID")}`);
            headers.append("content-length", files[0]?.size)
            formData.append('image', files[0]);
            formData.append('type', "file");            
            formData.append('name', files[0].name);

            const requestOptions = {
                method: "POST",
                headers,
                body: formData
            };

            fetch(apiUrl, requestOptions)
                .then(res => res.json())
                .then(({ data, status }) => {
                    if (status.success) {     
                        console.log(data.link, setImage)
                        setImage(data?.link)
                        toast.success("Imagen subida correctamente.")
                    } else {
                        toast.error(data?.error);
                    }

                    setOpen(false)
                })
                .catch(() => {
                    setOpen(false)
                })
        }
    }

    return (
        <DropzoneDialog
            open={open}
            dropzoneText={'Arrastra una imagen'}
            dialogTitle={'Sube una imagen de tu personaje'}
            cancelButtonText={'Cancelar'}
            submitButtonText={'Guardar'}
            onSave={handleSave}
            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
            maxFileSize={5000000}
            onClose={() => setOpen(false)}
        />
    )
}
