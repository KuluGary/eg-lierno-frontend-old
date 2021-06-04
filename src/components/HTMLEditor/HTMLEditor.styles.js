import { makeStyles } from '@material-ui/core/styles';

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
  },
  input: {
    fontSize: "0.875rem"
  }  
}))

export default useStyles;