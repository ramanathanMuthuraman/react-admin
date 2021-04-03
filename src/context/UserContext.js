import React from "react";
// import { getAllowedRoutes } from "../utils/routeUtils";
// import PrivateRoutesConfig from "../config/privateRoutesConfig";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

const initialState = {
  token: "",
  tokenExpiryTime: 0,
  user: {},
  isAuthenticated: false,
};

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, ...action.payload, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return initialState;
    case "LOGIN_FAILURE":
      return initialState;
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!sessionStorage.getItem("id_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################

function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);
  // useFetch({
  //   method: "get",
  //   url: "/path/",
  // });
  // if (!!login && !!password) {
  //   setTimeout(() => {
  //     sessionStorage.setItem("id_token", 1);
  //     setError(null);
  //     setIsLoading(false);
  //     dispatch({ type: "LOGIN_SUCCESS" });
  //     const allowedRoutes = getAllowedRoutes(
  //       PrivateRoutesConfig,
  //       "SUPER_ADMIN",
  //     );
  //     history.push(allowedRoutes[0].path);
  //   }, 2000);
  // } else {
  //   dispatch({ type: "LOGIN_FAILURE" });
  //   setError(true);
  //   setIsLoading(false);
  // }
}

function signOut(dispatch, history) {
  sessionStorage.removeItem("id_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
