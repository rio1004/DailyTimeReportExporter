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
  
  const myGlobalFunction = async (id) => {
    try {
      const res = await getDTR(id);
      dispatch(addData(res.data));
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
