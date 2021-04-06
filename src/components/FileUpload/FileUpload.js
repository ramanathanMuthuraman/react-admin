import { DropzoneArea } from "material-ui-dropzone";

const FileUpload = ({ onChange, ...rest }) => {
  return (
    <DropzoneArea
      showAlerts={["error"]}
      filesLimit={1}
      onChange={onChange}
      showPreviewsInDropzone={false}
      {...rest}
    />
  );
};

export default FileUpload;
