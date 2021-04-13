import { StyledDropzoneArea } from "./styles";

const FileUpload = ({ onChange, ...rest }) => {
  return (
    <StyledDropzoneArea
      showAlerts={["error"]}
      filesLimit={1}
      onChange={onChange}
      showPreviewsInDropzone={false}
      {...rest}
    />
  );
};

export default FileUpload;
