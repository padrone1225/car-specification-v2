import { createContext, useContext } from "react";

export type OtherContext = {
  otherProperties: any[];
  setOtherProperties: (c: any[]) => void;
};

export const GlobalOtherPropertyContext = createContext<OtherContext>({
  otherProperties: [],
  setOtherProperties: () => {},
});

export const useGlobalOtherPropertyContext = () =>
  useContext(GlobalOtherPropertyContext);
