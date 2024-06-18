// FunctionContext.js
import React, { createContext, useContext } from "react";
import { useDispatch } from "react-redux";
import { getDTR } from "../api";
import { addData } from "../features/completed/completeSlice";

const FunctionContext = createContext();

export const useGlobalFunction = () => {
  return useContext(FunctionContext);
};

export const FunctionProvider = ({ children }) => {
  const dispatch = useDispatch();
  const myGlobalFunction = async () => {
    try {
      const res = await getDTR("/DTR");
      dispatch(addData(res));
    } catch (error) {
      console.error("Error fetching DTR:", error);
    }
  };
  return (
    <FunctionContext.Provider value={{ myGlobalFunction }}>
      {children}
    </FunctionContext.Provider>
  );
};
