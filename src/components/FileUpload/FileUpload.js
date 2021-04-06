import { DropzoneArea } from "material-ui-dropzone";

const FileUpload = ({ onChange }) => {
  return <DropzoneArea onChange={onChange} />;
};

export default FileUpload;
