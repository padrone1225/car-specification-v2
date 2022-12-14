import { createContext, useEffect, useState } from "react";
import { SpecificationForm } from "./components/form";
import { SpecificationList } from "./components/list";
import {
  AllProperties,
  BasicSpecification,
  Carlist,
  CarProperty,
  OtherProperty,
  SpecificationData,
} from "./data";
import { GlobalCarContext } from "./components/context/carListContext";
import { GlobalSpecificationContext } from "./components/context/carSpecificationContext";
import { GlobalBasicPropertyContext } from "./components/context/basicPropertyContext";
import { GlobalOtherPropertyContext } from "./components/context/otherPropertyContext";
import { GlobalAllContext } from "./components/context/allPropertiesContext";
import { GlobalDataContext } from "./components/context/specificationDataContext";

export const SpecificationContext = createContext<Array<any>>([]);

function App() {
  const [cars, setCars] = useState<string[]>(Carlist);
  const [carSpecifications, setCarSpecifications] = useState<Array<any>>([]);
  const [basicProperties, setBasicProperties] =
    useState<Array<any>>(CarProperty);
  const [otherProperties, setOtherProperties] =
    useState<Array<any>>(OtherProperty);
  const [allList, setAllList] = useState<Array<any>>(AllProperties);
  const [dataStructure, setDataStructure] =
    useState<Array<any>>(SpecificationData);

  useEffect(() => {
    let specifications = [];
    for (let i in cars) {
      let list = [];
      list.push({ name: cars[i] });
      for (let j of BasicSpecification) {
        list.push(j);
      }
      specifications.push(list);
    }
    setCarSpecifications(specifications);
  }, []);

  return (
    <>
      <div className="bg-primary-dark h-20 w-full text-primary-light text-3xl flex items-center justify-center">
        Car Specification
      </div>
      <div className="bg-primary-light grid grid-cols-2">
        <GlobalCarContext.Provider value={{ cars, setCars }}>
          <GlobalSpecificationContext.Provider
            value={{ carSpecifications, setCarSpecifications }}
          >
            <GlobalDataContext.Provider
              value={{ dataStructure, setDataStructure }}
            >
              <SpecificationList />
              <GlobalBasicPropertyContext.Provider
                value={{ basicProperties, setBasicProperties }}
              >
                <GlobalOtherPropertyContext.Provider
                  value={{ otherProperties, setOtherProperties }}
                >
                  <GlobalAllContext.Provider value={{ allList, setAllList }}>
                    <SpecificationForm />
                  </GlobalAllContext.Provider>
                </GlobalOtherPropertyContext.Provider>
              </GlobalBasicPropertyContext.Provider>
            </GlobalDataContext.Provider>
          </GlobalSpecificationContext.Provider>
        </GlobalCarContext.Provider>
      </div>
    </>
  );
}

export default App;
