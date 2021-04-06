import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import Themes from "./themes";
import App from "./components/App";
import { LayoutProvider } from "./context/LayoutContext";
import { UserProvider } from "./context/UserContext";
import { APIErrorProvider } from "./context/APIErrorContext";
import { LoaderContextProvider } from "./context/LoaderContext";
import ErrorNotification from "./components/ErrorNotification/ErrorNotification";
import Loader from "./components/Loader/Loader";

ReactDOM.render(
  <LayoutProvider>
    <APIErrorProvider>
      <LoaderContextProvider>
        <SnackbarProvider maxSnack={3}>
          <UserProvider>
            <ThemeProvider theme={Themes.default}>
              <CssBaseline />
              <App />
              <ErrorNotification />
              <Loader />
            </ThemeProvider>
          </UserProvider>
        </SnackbarProvider>
      </LoaderContextProvider>
    </APIErrorProvider>
  </LayoutProvider>,
  document.getElementById("root"),
);
