
import React from 'react';
import SunEditor from 'suneditor-react'

const buttonList = {
    classic: [["font", "fontSize", "formatBlock"], ["bold", "underline", "italic", "strike", "removeFormat"], ["fontColor", "hiliteColor"], ["outdent", "indent"], ["align", "horizontalRule", "list", "table"], ["link", "image"], ["fullScreen", "codeView"]],
    balloon: [["bold", "underline", "italic", "strike", "removeFormat"], ["align"], ["link",]]
}

const unwrap = (html, hasToUnwrap) => {
    if (!hasToUnwrap) return html;

    let unwrapped = html.substr('<p>'.length);
    unwrapped = unwrapped.substr(0, html.length - '<p></p>'.length - 1);
    return unwrapped;
};

const HTMLEditor = ({
    mode = "classic",
    setState,
    value,
    unwrapHtml = false
}) => {
    const isDarkMode = (localStorage.getItem("theme") === 'true');

    if (isDarkMode) {
        require('./css/darkTheme.css')
    } else {
        require('./css/lightTheme.css')
    }

    const handleChange = (content) => {
        setState(content);
    }

    return (
        <SunEditor
            lang="es"
            defaultValue={unwrap(value, unwrapHtml)}
            width="100%"
            height="100%"

            setDefaultStyle="font-family: sans-serif; font-size: 1rem;height: 100%"
            onChange={handleChange}
            setOptions={{
                mode,
                buttonList: buttonList[mode],
                attributesWhitelist: {
                    all: 'style'
                }
            }} />
    );
};
export default HTMLEditor;


