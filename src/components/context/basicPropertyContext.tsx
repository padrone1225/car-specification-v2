import { createContext, useContext } from "react";

export type BasicContext = {
  basicProperties: any[];
  setBasicProperties: (c: any[]) => void;
};

export const GlobalBasicPropertyContext = createContext<BasicContext>({
  basicProperties: [],
  setBasicProperties: () => {},
});

export const useGlobalBasicPropertyContext = () =>
  useContext(GlobalBasicPropertyContext);
