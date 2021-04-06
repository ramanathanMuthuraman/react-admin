import React from "react";
import { Grid, Button } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { useSnackbar } from "notistack";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { BASE_URL, urlList } from "../../config/urlConfig";
import service from "../../utils/serviceUtils";

// styles
import useStyles from "./styles";

// components
import Widget from "../../components/Widget/Widget";
import PageTitle from "../../components/PageTitle/PageTitle";
import FileUpload from "../../components/FileUpload/FileUpload";

const options = [
  {
    id: "alert",
    label: "Upload alert list",
  },
  {
    id: "team",
    label: "Download team report",
  },
];

export default function FileManagement(props) {
  var classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [selectedOption, setSelectedOption] = React.useState(options[0].id);
  const [selectedFile, setSelectedFile] = React.useState([]);
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const onFileUpload = () => {
    let formData = new FormData();
    formData.append("file", selectedFile[0]);
    service({
      method: "post",
      url: urlList.alertUpload,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function () {
        setSelectedFile([]);
        enqueueSnackbar("File uploaded successfully", { variant: "success" });
      })
      .catch(function () {
        setSelectedFile([]);
        enqueueSnackbar("File uploaded failed", { variant: "error" });
      });
  };

  const onFileChange = (files) => {
    setSelectedFile(files);
  };

  const downloadTeamReport = () => {
    window.open(`${BASE_URL}${urlList.alertExportForTeam}`);
  };

  return (
    <>
      <PageTitle title="File management" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget
            title=""
            upperTitle
            noBodyPadding
            bodyClass={classes.tableWidget}
            disableWidgetMenu
          >
            <div className={classes.container}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Upload/Download
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedOption}
                  onChange={handleChange}
                >
                  {options.map((option) => {
                    return (
                      <MenuItem value={option.id}>{option.label}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <div className={classes.optionDetails}>
                {selectedOption === options[0].id && (
                  <>
                    <FileUpload onChange={onFileChange} />
                    <>
                      {selectedFile.map((file) => {
                        return <span>{file.name}</span>;
                      })}
                    </>
                    <Button
                      className={classes.action}
                      variant="contained"
                      color="primary"
                      onClick={onFileUpload}
                      disabled={selectedFile.length === 0}
                    >
                      Upload
                    </Button>
                  </>
                )}
                {selectedOption === options[1].id && (
                  <>
                    <Button
                      key={2}
                      className={classes.action}
                      variant="contained"
                      color="primary"
                      onClick={downloadTeamReport}
                    >
                      Download
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
