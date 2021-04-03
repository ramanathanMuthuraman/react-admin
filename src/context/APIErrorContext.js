// https://www.yld.io/blog/global-notifications-with-reacts-context-api/

import React, { useState, useCallback } from "react";

const APIErrorContext = React.createContext({
  error: null,
  addError: () => {},
  removeError: () => {},
});

function APIErrorProvider({ children }) {
  const [error, setError] = useState(null);

  const removeError = () => setError(null);

  const addError = (message, status) => setError({ message, status });

  const contextValue = {
    error,
    addError: useCallback((message, status) => addError(message, status), []),
    removeError: useCallback(() => removeError(), []),
  };

  return (
    <APIErrorContext.Provider value={contextValue}>
      {children}
    </APIErrorContext.Provider>
  );
}

export { APIErrorProvider, APIErrorContext };
