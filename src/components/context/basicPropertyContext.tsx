import { createContext, useContext } from "react";
import { BasicStructure } from "./carSpecificationContext";

export type BasicContext = {
  basicProperties: Array<BasicStructure>;
  setBasicProperties: (c: Array<BasicStructure>) => void;
};

export const GlobalBasicPropertyContext = createContext<BasicContext>({
  basicProperties: [],
  setBasicProperties: () => {},
});

export const useGlobalBasicPropertyContext = () =>
  useContext(GlobalBasicPropertyContext);
