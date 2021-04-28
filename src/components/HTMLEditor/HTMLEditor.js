import { ContentState, DefaultDraftBlockRenderMap, Editor, EditorState, RichUtils, convertFromHTML, getSafeBodyFromHTML } from 'draft-js';
import React, { useEffect, useState } from 'react'

import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import { IconButton, Tooltip } from '@material-ui/core';
import { Map } from "immutable";
import Paper from '@material-ui/core/Paper';
import StrikethroughSIcon from '@material-ui/icons/StrikethroughS';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import TitleIcon from '@material-ui/icons/Title';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { stateToHTML } from 'draft-js-export-html';

const useStyles = makeStyles((theme) => ({
    editor: {
        padding: ".8rem",
        "& .DraftEditor-root": {
            "& .public-DraftEditorPlaceholder-root": {
                fontSize: theme.typography.body1.fontSize,
                color: theme.palette.text.secondary,
                position: "absolute",
                zIndex: 0
            }
        }
    }
}))

const blockRenderMap = Map({
    'small': {
        element: 'small',
        aliasedElements: ['small']
    }
});

const options = {
    blockRenderers: {
        'small': (block) => {
            return "<p><small>" + block.getText() + "</small></p>"
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

export default function HTMLEditor({
    setState,
    value,
    iconSize = "default",
    placeholder = ""
}) {
    const classes = useStyles();
    const [editorState, setEditorState] = useState(
        value ? EditorState.createWithContent(
            ContentState.createFromBlockArray(
                convertFromHTML(value, getSafeBodyFromHTML, extendedBlockRenderMap)

            ))
            : EditorState.createEmpty()
    );


    useEffect(() => {
        setState(stateToHTML(editorState.getCurrentContent(), options));
    }, [editorState])

    const onChange = (editorState) => {
        setEditorState(editorState)
    }

    const toggleInlineStyle = (event) => {
        event.preventDefault();

        let style = event.currentTarget.getAttribute('data-style');
        setEditorState(RichUtils.toggleInlineStyle(editorState, style))
    }

    const toggleBlockType = (event) => {
        event.preventDefault();

        let block = event.currentTarget.getAttribute('data-block');
        setEditorState(RichUtils.toggleBlockType(editorState, block))
    }

    return (
        <Paper variant="outlined" className={classes.root}>
            <Paper variant="outlined" className={classes.editorBox}>
                <Box style={{ display: "flex", justifyContent: "center" }}>
                    <HtmlTooltip title="Negrita">
                        <IconButton
                            data-style="BOLD"
                            onMouseDown={toggleInlineStyle}>
                            <FormatBoldIcon fontSize={iconSize} />
                        </IconButton>
                    </HtmlTooltip>
                    <HtmlTooltip title="Itálica">
                        <IconButton
                            data-style="ITALIC"
                            onMouseDown={toggleInlineStyle}>
                            <FormatItalicIcon fontSize={iconSize} />
                        </IconButton>
                    </HtmlTooltip>
                    <HtmlTooltip title="Tachado">
                        <IconButton
                            data-style="STRIKETHROUGH"
                            onMouseDown={toggleInlineStyle}>
                            <StrikethroughSIcon fontSize={iconSize} />
                        </IconButton>
                    </HtmlTooltip>
                    <HtmlTooltip title="Subrayado">
                        <IconButton
                            data-style="UNDERLINE"
                            onMouseDown={toggleInlineStyle}>
                            <FormatUnderlinedIcon fontSize={iconSize} />
                        </IconButton>
                    </HtmlTooltip>
                    <HtmlTooltip title="Título">
                        <IconButton
                            data-block="header-four"
                            onMouseDown={toggleBlockType}>
                            <TitleIcon fontSize={iconSize} />
                        </IconButton>
                    </HtmlTooltip>
                    <HtmlTooltip title="Lista desordenada">
                        <IconButton
                            data-block="unordered-list-item"
                            onMouseDown={toggleBlockType}>
                            <FormatListBulletedIcon fontSize={iconSize} />
                        </IconButton>
                    </HtmlTooltip>
                    <HtmlTooltip title="Lista numérica">
                        <IconButton
                            data-block="ordered-list-item"
                            onMouseDown={toggleBlockType}>
                            <FormatListNumberedIcon fontSize={iconSize} />
                        </IconButton>
                    </HtmlTooltip>
                    <HtmlTooltip title="Subtítulo">
                        <IconButton
                            data-block="small"
                            onMouseDown={toggleBlockType}>
                            <TextFieldsIcon fontSize={iconSize} />
                        </IconButton>
                    </HtmlTooltip>
                </Box>
                <Divider className={classes.divider} />
                <Box className={classes.editor}>
                    <Editor
                        placeholder={placeholder}
                        editorState={editorState}
                        onChange={onChange}
                        blockRenderMap={extendedBlockRenderMap} />
                </Box>
            </Paper>
        </Paper>
    )
}
