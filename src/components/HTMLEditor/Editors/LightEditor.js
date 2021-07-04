import React from "react";
import SunEditor from "suneditor-react";
import "../css/lightTheme.css"

function LightEditor(props) {
    return (
        <div className="light-editor">
            <SunEditor {...props} />;
        </div>
    );
}

export { LightEditor };
