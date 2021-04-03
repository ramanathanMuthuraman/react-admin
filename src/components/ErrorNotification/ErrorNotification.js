import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { Button } from "@material-ui/core";
import useAPIError from "../../hooks/useAPIError";

const defaultErrorMessage = "Oops!! something went wrong, please try again";

function APIErrorNotification() {
  const { error, removeError } = useAPIError();

  const onClose = () => {
    removeError();
  };

  const errorMessage =
    error && error.message ? error.message : defaultErrorMessage;

  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="simple-dialog-title"
      open={!!error}
    >
      <DialogTitle id="simple-dialog-title">Error</DialogTitle>
      <DialogContent>
        <DialogContentText>{errorMessage}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button data-testid="notification-submit-button" onClick={onClose}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default APIErrorNotification;
