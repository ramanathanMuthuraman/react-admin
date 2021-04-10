import React from "react";
// import { getAllowedRoutes } from "../utils/routeUtils";
// import PrivateRoutesConfig from "../config/privateRoutesConfig";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

const initialState = {
  token: "",
  tokenExpiryTime: 0,
  user: JSON.parse(sessionStorage.getItem("user_info")) || {},
  isAuthenticated: !!sessionStorage.getItem("id_token"),
};

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, ...action.payload, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, user: {}, isAuthenticated: false };
    case "LOGIN_FAILURE":
      return { ...state, user: {}, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, initialState);

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

function signOut(dispatch, history) {
  sessionStorage.removeItem("id_token");
  sessionStorage.removeItem("user_info");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}

export { UserProvider, useUserState, useUserDispatch, signOut };
