import { createContext, useContext } from "react";
import { BasicStructure } from "./carSpecificationContext";

export type DataContext = {
  dataStructure: Array<BasicStructure>;
  setDataStructure: (c: Array<BasicStructure>) => void;
};

export const GlobalDataContext = createContext<DataContext>({
  dataStructure: [],
  setDataStructure: () => {},
});

export const useGlobalDataContext = () => useContext(GlobalDataContext);
