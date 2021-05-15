import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { getAllowedRoutes } from "../../utils/routeUtils";
import PrivateRoutesConfig from "../../config/privateRoutesConfig";
import { urlList } from "../../config/urlConfig";

// styles
import useStyles from "./styles";

// logo
import logo from "./logo.svg";

// context
import { useUserDispatch } from "../../context/UserContext";
import useAPIError from "../../hooks/useAPIError";

// api fetch
import service from "../../utils/serviceUtils";

function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { addError } = useAPIError();

  const onLogin = () => {
    setIsLoading(true);
    service({
      method: "post",
      url: urlList.login,
      data: {
        username: loginValue,
        password: passwordValue,
      },
    })
      .then((response) => {
        const { token, user = {} } = response;
        sessionStorage.setItem("id_token", token);
        sessionStorage.setItem("user_info", JSON.stringify(user));
        userDispatch({ type: "LOGIN_SUCCESS", payload: { user } });
        const allowedRoutes = getAllowedRoutes(
          PrivateRoutesConfig,
          user.roleName,
          user.modules,
        );
        props.history.push(allowedRoutes[0].path);
      })
      .catch(() => {
        userDispatch({ type: "LOGIN_FAILURE" });
        addError();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>Alert Manager</Typography>
      </div>
      <div className={classes.formContainer}>
        <form className={classes.form}>
          <React.Fragment>
            <TextField
              id="username"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={loginValue}
              onChange={(e) => setLoginValue(e.target.value)}
              margin="normal"
              placeholder="Username"
              type="text"
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
              {isLoading ? (
                <CircularProgress size={26} />
              ) : (
                <Button
                  disabled={
                    loginValue.length === 0 || passwordValue.length === 0
                  }
                  type="submit"
                  onClick={onLogin}
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Login
                </Button>
              )}
            </div>
          </React.Fragment>
        </form>
      </div>
    </Grid>
  );
}

export default withRouter(Login);
