import React, { useEffect, useState } from 'react'

import { Map } from "immutable";
import { withStyles } from '@material-ui/core/styles';
import { stateToHTML } from 'draft-js-export-html';
import useStyles from "./HTMLEditor.styles";

import {
    Box,
    Divider,
    Tooltip,
    Paper,
    Popper,
    Fade,
    InputBase
} from "@material-ui/core";

import {
    ToggleButton,
    ToggleButtonGroup
} from '@material-ui/lab';

import {
    FormatBold as FormatBoldIcon,
    FormatItalic as FormatItalicIcon,
    FormatListBulleted as FormatListBulletedIcon,
    FormatListNumbered as FormatListNumberedIcon,
    FormatUnderlined as FormatUnderlinedIcon,
    StrikethroughS as StrikethroughSIcon,
    TextFields as TextFieldsIcon,
    Title as TitleIcon,
    Code as CodeIcon
} from '@material-ui/icons';

import {
    ContentState,
    DefaultDraftBlockRenderMap,
    Editor,
    EditorState,
    RichUtils,
    convertFromHTML,
    getSafeBodyFromHTML
} from 'draft-js';

const blockRenderMap = Map({
    'small': {
        element: 'small',
        aliasedElements: ['small']
    },
    'html': {
        element: 'html'
    }
});

const options = {
    blockRenderers: {
        'small': (block) => {
            return "<p><small>" + block.getText() + "</small></p>"
        },
        'html': (block) => {
            return block.getText()
        }
    }
}

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
    },
}))(Tooltip);

const StyledToggleButtonGroup = withStyles((theme) => ({
    grouped: {
        borderRadius: 0,
        borderTop: 'none',
        borderBottom: 'none',
        '&:first-child': {
            borderLeft: 'none'
        },
        '&:last-child': {
            borderRight: 'none'
        }
    },
}))(ToggleButtonGroup);

const ToolBar = ({
    toggleInlineStyle,
    toggleBlockType,
    iconSize,
    editorState,
    showHtml
}) => {
    const blockType = RichUtils.getCurrentBlockType(editorState);
    const inlineStyle = editorState.getCurrentInlineStyle();

    return (
        <>
            <StyledToggleButtonGroup color="default">
                <HtmlTooltip title="Negrita">
                    <ToggleButton
                        disabled={showHtml}
                        selected={inlineStyle.has("BOLD")}
                        data-style="BOLD"
                        onMouseDown={toggleInlineStyle}>
                        <FormatBoldIcon fontSize={iconSize} />
                    </ToggleButton>
                </HtmlTooltip>
                <HtmlTooltip title="Itálica">
                    <ToggleButton
                        disabled={showHtml}
                        selected={inlineStyle.has("ITALIC")}
                        data-style="ITALIC"
                        onMouseDown={toggleInlineStyle}>
                        <FormatItalicIcon fontSize={iconSize} />
                    </ToggleButton>
                </HtmlTooltip>
                <HtmlTooltip title="Tachado">
                    <ToggleButton
                        disabled={showHtml}
                        selected={inlineStyle.has("STRIKETHROUGH")}
                        data-style="STRIKETHROUGH"
                        onMouseDown={toggleInlineStyle}>
                        <StrikethroughSIcon fontSize={iconSize} />
                    </ToggleButton>
                </HtmlTooltip>
                <HtmlTooltip title="Subrayado">
                    <ToggleButton
                        disabled={showHtml}
                        selected={inlineStyle.has("UNDERLINE")}
                        data-style="UNDERLINE"
                        onMouseDown={toggleInlineStyle}>
                        <FormatUnderlinedIcon fontSize={iconSize} />
                    </ToggleButton>
                </HtmlTooltip>
                <HtmlTooltip title="Título">
                    <ToggleButton
                        disabled={showHtml}
                        selected={blockType === "header-four"}
                        data-block="header-four"
                        onMouseDown={toggleBlockType}>
                        <TitleIcon fontSize={iconSize} />
                    </ToggleButton>
                </HtmlTooltip>
                <HtmlTooltip title="Lista desordenada">
                    <ToggleButton
                        disabled={showHtml}
                        selected={blockType === "unordered-list-item"}
                        data-block="unordered-list-item"
                        onMouseDown={toggleBlockType}>
                        <FormatListBulletedIcon fontSize={iconSize} />
                    </ToggleButton>
                </HtmlTooltip>
                <HtmlTooltip title="Lista numérica">
                    <ToggleButton
                        disabled={showHtml}
                        selected={blockType === "ordered-list-item"}
                        data-block="ordered-list-item"
                        onMouseDown={toggleBlockType}>
                        <FormatListNumberedIcon fontSize={iconSize} />
                    </ToggleButton>
                </HtmlTooltip>
                <HtmlTooltip title="Subtítulo">
                    <ToggleButton
                        disabled={showHtml}
                        selected={blockType === "small"}
                        data-block="small"
                        onMouseDown={toggleBlockType}>
                        <TextFieldsIcon fontSize={iconSize} />
                    </ToggleButton>
                </HtmlTooltip>
                <HtmlTooltip title="Ver HTML">
                    <ToggleButton
                        selected={showHtml}
                        data-block="html"
                        onMouseDown={toggleBlockType}>
                        <CodeIcon fontSize={iconSize} />

                    </ToggleButton>
                </HtmlTooltip>
            </StyledToggleButtonGroup>
        </>
    )
}

export default function HTMLEditor({
    setState,
    value,
    iconSize = "default",
    placeholder = "",
    mode = "normal"
}) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [openMiniEditor, setOpenMiniEditor] = useState(null);
    const [editorState, setEditorState] = useState(
        value ? EditorState.createWithContent(
            ContentState.createFromBlockArray(
                convertFromHTML(value, getSafeBodyFromHTML, extendedBlockRenderMap)

            ))
            : EditorState.createEmpty()
    );
    const [showHtml, setShowHtml] = useState(false);
    const [parsedText, setParsedText] = useState(stateToHTML(editorState.getCurrentContent()))

    useEffect(() => {
        setState(stateToHTML(editorState.getCurrentContent(), options));
    }, [editorState])

    const onChange = (editorState) => {
        setEditorState(editorState);
        setParsedText(stateToHTML(editorState.getCurrentContent()));
    }

    const onChangeHTML = (event) => {
        const value = event.target.value;

        setParsedText(value);
        setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(
            convertFromHTML(value, getSafeBodyFromHTML, extendedBlockRenderMap)
        )))
    }

    const toggleInlineStyle = (event) => {
        event.preventDefault();

        let style = event.currentTarget.getAttribute('data-style');
        setEditorState(RichUtils.toggleInlineStyle(editorState, style))
    }

    const toggleBlockType = (event) => {
        event.preventDefault();


        let block = event.currentTarget.getAttribute('data-block');
        console.log(block)

        if (block === "html") {
            return setShowHtml(!showHtml);
        } else {
            setEditorState(RichUtils.toggleBlockType(editorState, block))
        }
    }

    const handleCloseMiniEditor = () => setOpenMiniEditor(false);

    const handleOpenMiniEditor = () => {
        const selection = window.getSelection();

        // Resets when the selection has a length of 0
        if (!selection || selection.anchorOffset === selection.focusOffset) {
            handleCloseMiniEditor();
            return;
        }

        const getBoundingClientRect = () => selection.getRangeAt(0).getBoundingClientRect();

        setOpenMiniEditor(true);
        setAnchorEl({
            clientWidth: getBoundingClientRect().width,
            clientHeight: getBoundingClientRect().height,
            getBoundingClientRect,
        });
    };

    const id = openMiniEditor ? 'faked-reference-popper' : undefined;

    return (
        <Paper variant="outlined" className={classes.root} onMouseLeave={handleCloseMiniEditor}>
            {mode === "dense" && <Popper id={id} open={openMiniEditor} anchorEl={anchorEl} transition placement="bottom-start">
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper style={{ display: "flex", justifyContent: "center" }} variant="outlined">
                            <ToolBar
                                editorState={editorState}
                                toggleInlineStyle={toggleInlineStyle}
                                toggleBlockType={toggleBlockType}
                                iconSize={iconSize}
                                showHtml={showHtml} />
                        </Paper>
                    </Fade>
                )}
            </Popper>}
            <Paper variant="outlined" className={classes.editorBox}>
                {mode === "normal" &&
                    <>
                        <Box style={{ display: "flex", justifyContent: "center" }}>
                            <ToolBar
                                editorState={editorState}
                                toggleInlineStyle={toggleInlineStyle}
                                toggleBlockType={toggleBlockType}
                                iconSize={iconSize}
                                showHtml={showHtml} />
                        </Box>
                        <Divider className={classes.divider} />
                    </>}
                <Box className={classes.editor} onMouseUp={mode === "dense" && handleOpenMiniEditor}>
                    {!showHtml && <Editor
                        placeholder={placeholder}
                        editorState={editorState}
                        onChange={onChange}
                        blockRenderMap={extendedBlockRenderMap} />}
                    {showHtml && <InputBase
                        fullWidth
                        multiline
                        onChange={onChangeHTML}
                        className={classes.input}
                        value={parsedText}
                    />
                    }
                </Box>
            </Paper>
        </Paper>
    )
}
