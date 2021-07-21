import { Tooltip as MuiTooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const Tooltip = withStyles((theme) => ({
  tooltip: {
    fontSize: theme.typography.pxToRem(14),
  },
}))(MuiTooltip);

export default Tooltip;
