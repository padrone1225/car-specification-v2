import { useEffect, useState } from "react";
import { Dropdown } from "../dropdown";
import { useGlobalBasicPropertyContext } from "../context/basicPropertyContext";
import { useGlobalCarContext } from "../context/carListContext";
import {
  BasicStructure,
  CheckStructure,
  NameStructure,
  useGlobalSpecification,
} from "../context/carSpecificationContext";
import { useGlobalOtherPropertyContext } from "../context/otherPropertyContext";
import { useGlobalDataContext } from "../context/specificationDataContext";
import { PropertyStructure } from "../context/allPropertiesContext";

export const SpecificationForm = () => {
  const { cars, setCars } = useGlobalCarContext();
  const { carSpecifications, setCarSpecifications } = useGlobalSpecification();
  const { basicProperties } = useGlobalBasicPropertyContext();
  const { otherProperties, setOtherProperties } =
    useGlobalOtherPropertyContext();
  const { dataStructure, setDataStructure } = useGlobalDataContext();

  const [specifications, setSpecifications] = useState<
    Array<PropertyStructure>
  >([]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    let hood = "";
    let checkList: Array<CheckStructure> = [];
    let list: Array<BasicStructure | NameStructure | CheckStructure> = [];
    for (let item of event.target) {
      if (item.getAttribute("name") === "carName") {
        if (!item.value) {
          alert("Sorry! Please input car name.");
          return;
        }
        list.push({ name: item.value });
        item.value = "";
      }
      if (item.getAttribute("name") === "hood") {
        hood = item.value;
      }
      if (item.getAttribute("id") === "checkbox") {
        otherProperties.map((prop) => {
          if (prop.value === item.getAttribute("name")) {
            checkList.push({ value: prop.value, label: item.checked });
          }
          return null;
        });
      }
    }

    specifications.map((item) =>
      list.push({ value: item.type, label: item.value })
    );
    list.push(...checkList);
    list.push({ value: "hood", label: hood });
    const name = (list[0] as NameStructure).name;
    const index = cars.findIndex((car) => car === name);
    if (index === -1) {
      setCarSpecifications([...carSpecifications, list]);
      setCars([...cars, name]);
    } else {
      carSpecifications[index] = list;
      setCarSpecifications(carSpecifications);
    }
    setSpecifications([]);
  };

  const addNewOption = () => {
    let option = prompt("Please enter option name");
    if (option) {
      setOtherProperties([
        ...otherProperties,
        { value: option, label: false } as CheckStructure,
      ]);
      setDataStructure([
        ...dataStructure,
        { value: option, label: option?.toUpperCase() } as BasicStructure,
      ]);
    }
  };

  const addNewProp = () => {};

  return (
    <div className="border-2 border-primary-dark flex items-center justify-center flex-col py-14">
      <form
        className="w-full px-5 text-primary-dark grid gap-20 relative"
        onSubmit={handleSubmit}
      >
        <div id="specificationName">
          <label className="block">Name of specification</label>
          <input
            type="text"
            name="carName"
            id="property"
            className="w-full border-2 border-primary-dark rounded-md h-7 p-2"
          />
        </div>
        {basicProperties.map((property, index) => (
          <Dropdown
            style={property.value}
            placeHolder={dataStructure[index].label}
            key={index}
            specifications={specifications}
            setSpecifications={setSpecifications}
          />
        ))}
        <div id="checkGroup" className="grid grid-cols-5 gap-3">
          {otherProperties.map((property, id) => (
            <label key={id} className="flex gap-2">
              <input type="checkbox" name={property.value} id="checkbox" />
              {dataStructure.filter((e) => e.value === property.value)[0].label}
            </label>
          ))}
        </div>
        <div id="hood">
          <label className="block">Signature on hood</label>
          <input
            type="text"
            name="hood"
            id="property"
            className="w-full border-2 border-primary-dark rounded-md h-7 p-2"
          />
        </div>
        <div className="grid grid-cols-3 gap-5 " id="btnGroup">
          <label className="bg-secondary-light h-10 rounded-md border-2 border-primary-dark font-bold text-xl flex justify-center items-center cursor-pointer">
            <input type="button" onClick={() => addNewOption()} />+ new option
          </label>
          <label className="bg-secondary-light h-10 rounded-md border-2 border-primary-dark font-bold text-xl flex justify-center items-center cursor-pointer">
            <input type="button" onClick={() => addNewProp()} />+ new prop
          </label>
          <button
            type="submit"
            className="bg-secondary-light rounded-md border-2 border-primary-dark font-bold text-xl"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
