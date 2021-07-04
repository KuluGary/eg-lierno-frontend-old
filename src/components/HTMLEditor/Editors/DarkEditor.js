import React from "react";

import "../css/darkTheme.css";

function DarkEditor(props) {
    return (
        <div className="dark-editor">
            <SunEditor {...props} />
        </div>
    );
}

export { DarkEditor };
