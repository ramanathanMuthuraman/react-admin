//https://www.telerik.com/blogs/how-to-use-context-api-with-hooks-efficiently-while-avoiding-performance-bottlenecks

import React, { useState, createContext, useMemo } from "react";

const LoaderContext = createContext();

const LoaderContextProvider = (props) => {
  const [isGlobalSpinnerOn, setGlobalSpinner] = useState(false);

  const value = useMemo(
    () => ({
      isGlobalSpinnerOn,
      setGlobalSpinner,
    }),
    [isGlobalSpinnerOn],
  );

  return (
    <LoaderContext.Provider value={value}>
      {props.children}
    </LoaderContext.Provider>
  );
};

export { LoaderContextProvider, LoaderContext };
