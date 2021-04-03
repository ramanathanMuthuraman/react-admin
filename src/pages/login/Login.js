import React, { useState } from "react";
import { Grid, Typography, Button, TextField } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { getAllowedRoutes } from "../../utils/routeUtils";
import PrivateRoutesConfig from "../../config/privateRoutesConfig";

// styles
import useStyles from "./styles";

// logo
import logo from "./logo.svg";

// context
import { useUserDispatch } from "../../context/UserContext";
import useAPIError from "../../hooks/useAPIError";
import useLoader from "../../hooks/useLoader";

// api fetch
import service from "../../utils/serviceUtils";

function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");
  const { addError } = useAPIError();
  const { setGlobalSpinner } = useLoader();

  const onLogin = () => {
    setGlobalSpinner(true);
    service({
      method: "get",
      url: "/auth",
      data: {
        username: loginValue,
        password: passwordValue,
      },
    })
      .then((response) => {
        const { token, user = {} } = response;
        sessionStorage.setItem("id_token", token);
        userDispatch({ type: "LOGIN_SUCCESS", payload: user });
        const allowedRoutes = getAllowedRoutes(
          PrivateRoutesConfig,
          user.roleName,
        );
        props.history.push(allowedRoutes[0].path);
      })
      .catch(() => {
        userDispatch({ type: "LOGIN_FAILURE" });
        addError();
      })
      .finally(() => {
        setGlobalSpinner(false);
      });
  };

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>Alert manager</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <React.Fragment>
            <TextField
              id="email"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={loginValue}
              onChange={(e) => setLoginValue(e.target.value)}
              margin="normal"
              placeholder="Email Adress"
              type="email"
              fullWidth
            />
            <TextField
              id="password"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              margin="normal"
              placeholder="Password"
              type="password"
              fullWidth
            />
            <div className={classes.formButtons}>
              <Button
                disabled={loginValue.length === 0 || passwordValue.length === 0}
                onClick={onLogin}
                variant="contained"
                color="primary"
                size="large"
              >
                Login
              </Button>
            </div>
          </React.Fragment>
        </div>
      </div>
    </Grid>
  );
}

export default withRouter(Login);
