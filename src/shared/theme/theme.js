export const theme = (darkMode) => ({
    typography: {
        h1: {
            fontSize:"2.1rem"
        },
        h2: {
            fontSize: "2rem"
        },
        h3: {
            fontSize: "1.75rem"
        },
        h4: {
            fontSize: "1.5rem"
        },
        h5: {
            fontSize: "1.25rem"
        },
        h6: {
            fontSize: "1.1rem"
        }
    },
    overrides: {
        MuiInputBase: {
            root: {
                "&$disabled": {
                    opacity: 1,
                    color: "inherit"
                }
            }
        },
        MuiInput: {
            underline: {
                "&$disabled": {
                    '&:before': {
                        borderBottomStyle: "dashed"
                    },
                }
            }
        },
        MuiRadio: {
            root: {
                "&$disabled": {
                    opacity: 1,
                    color: "inherit"
                }
            }
        },
        MuiTableRow: {
            root: {
                "&$selected": {
                    "&$hover": {
                        backgroundColor: darkMode ? "rgba(255, 255, 255, 0.16)" : "rgba(0, 0, 0, 0.08)"
                    }
                }
            }
        }
    },
})