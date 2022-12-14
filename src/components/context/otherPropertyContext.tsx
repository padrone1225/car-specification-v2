import { createContext, useContext } from "react";
import { CheckStructure } from "./carSpecificationContext";

export type OtherContext = {
  otherProperties: Array<CheckStructure>;
  setOtherProperties: (c: Array<CheckStructure>) => void;
};

export const GlobalOtherPropertyContext = createContext<OtherContext>({
  otherProperties: [],
  setOtherProperties: () => {},
});

export const useGlobalOtherPropertyContext = () =>
  useContext(GlobalOtherPropertyContext);
