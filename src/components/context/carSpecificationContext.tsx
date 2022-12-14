import { createContext, useContext } from "react";

export type SpecificationContext = {
  carSpecifications: any[];
  setCarSpecifications: (c: any[]) => void;
};

export const GlobalSpecificationContext = createContext<SpecificationContext>({
  carSpecifications: [],
  setCarSpecifications: () => {},
});

export const useGlobalSpecification = () =>
  useContext(GlobalSpecificationContext);
