import React, { ReactNode, createContext, useContext } from "react";

// Define the shape of your context data
interface MyContextData {
  // Define your context data here
  // For example:
  count: number;
  increment: () => void;
}

// Create the context
const MyContext = createContext<MyContextData | undefined>(undefined);

// Create a provider component
export const MyContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Define the state and functions you want to share
  const [count, setCount] = React.useState<number>(0);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  // Provide the context value to the components in the tree
  const contextValue: MyContextData = {
    count,
    increment,
  };

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};

// Create a custom hook for consuming the context
export const usePlayerSelection = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};
