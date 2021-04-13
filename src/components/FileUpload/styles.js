import { DropzoneArea } from "material-ui-dropzone";
import { withStyles } from "@material-ui/core/styles";

const StyledDropzoneArea = withStyles((theme) => ({
  root: {
    minHeight: "100px",
  },
}))(DropzoneArea);

export { StyledDropzoneArea };
