import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import StrikethroughSIcon from '@material-ui/icons/StrikethroughS';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TitleIcon from '@material-ui/icons/Title';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

const ExpansionPanel = withStyles({
    root: {
        border: 'none',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
    root: {
        backgroundColor: 'none',
        borderBottom: 'none',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiExpansionPanelDetails);

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%",
        minHeight: "100vh"
    },
    editorBox: {
        maxWidth: "65vw",
        margin: "10px auto",
        padding: 10
    },
    divider: {
        maxWidth: "50%",
        margin: "0 auto"
    },
    titleInput: {
        maxWidth: "65vw",
        margin: "10px auto",
    },
    submitBox: {
        maxWidth: "75vw",
        // margin: "0 auto"
    },
    submitButton: {
        float: "right"
    },
    diaryEntry: {
        maxWidth: "65vw",
        margin: "10px auto",
        padding: 10
    }
}));

function DiaryScreen(props) {
    const classes = useStyles();
    const [editorState, setEditorState] = React.useState(
        EditorState.createEmpty(),
    );
    const [title, setTitle] = React.useState();

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

    const handleSubmit = () => {
        let diary = [...props.diary, {
            title,
            description: stateToHTML(editorState.getCurrentContent())
        }]

        setEditorState(EditorState.createEmpty());
        setTitle('');

        props.updateDiary(diary);

    }
    return (
        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
            <Paper variant="outlined" className={classes.root}>
                {props.diary && props.diary.map((entry, index) => (
                    <>
                        <ExpansionPanel>
                            {/* <Box component="div" className={classes.diaryEntry}> */}
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header">
                                <Typography variant="h5">{entry.title}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Box component="div">
                                    <span dangerouslySetInnerHTML={{ __html: entry.description }} />
                                </Box>
                            </ExpansionPanelDetails>
                            {/* </Box> */}
                        </ExpansionPanel>
                        <Divider className={classes.divider} />
                    </>
                ))}
                {props.campaignId === props.user &&
                    <>
                        <Box className={classes.titleInput}>
                            <TextField
                                fullWidth
                                id="outlined-search"
                                label="Título"
                                variant="outlined"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)} />
                        </Box>
                        <Paper variant="outlined" className={classes.editorBox}>
                            <Box style={{ display: "flex", justifyContent: "center" }}>
                                <IconButton
                                    data-style="BOLD"
                                    onMouseDown={toggleInlineStyle}>
                                    <FormatBoldIcon />
                                </IconButton>
                                <IconButton
                                    data-style="ITALIC"
                                    onMouseDown={toggleInlineStyle}>
                                    <FormatItalicIcon />
                                </IconButton>
                                <IconButton
                                    data-style="STRIKETHROUGH"
                                    onMouseDown={toggleInlineStyle}>
                                    <StrikethroughSIcon />
                                </IconButton>
                                <IconButton
                                    data-style="UNDERLINE"
                                    onMouseDown={toggleInlineStyle}>
                                    <FormatUnderlinedIcon />
                                </IconButton>
                                <IconButton
                                    data-block="header-four"
                                    onMouseDown={toggleBlockType}>
                                    <TitleIcon />
                                </IconButton>
                            </Box>
                            <Divider className={classes.divider} />
                            <Editor
                                autoFocus
                                className={classes.editor}
                                editorState={editorState}
                                onChange={onChange} />
                        </Paper>
                        <Box className={classes.submitBox}>
                            <Button
                                disabled={(!title || title.length < 0)}
                                variant="contained"
                                color="primary"
                                disableElevation
                                className={classes.submitButton}
                                onClick={handleSubmit}
                            >SUBMIT</Button>
                        </Box>
                    </>}
            </Paper>
        </Slide>
    )
}

export default DiaryScreen;