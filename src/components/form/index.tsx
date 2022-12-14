import { useState } from "react";
import { Dropdown } from "../dropdown";
import { useGlobalBasicPropertyContext } from "../context/basicPropertyContext";
import { useGlobalCarContext } from "../context/carListContext";
import { useGlobalSpecification } from "../context/carSpecificationContext";
import { useGlobalOtherPropertyContext } from "../context/otherPropertyContext";
import { useGlobalDataContext } from "../context/specificationDataContext";

export interface SpecDataType {
  label: string;
  type: string;
  value: string;
}

export const SpecificationForm = () => {
  const { cars, setCars } = useGlobalCarContext();
  const { carSpecifications, setCarSpecifications } = useGlobalSpecification();
  const { basicProperties } = useGlobalBasicPropertyContext();
  const { otherProperties, setOtherProperties } =
    useGlobalOtherPropertyContext();
  const { dataStructure, setDataStructure } = useGlobalDataContext();

  const [specifications, setSpecifications] = useState<Array<SpecDataType>>([]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    let list = [];
    let flag = false;
    let hood = "";
    let checker = [];
    for (let i of event.target) {
      if (i.getAttribute("name") === "carName") {
        list.push({ name: i.value });
        if (
          cars.findIndex((car) => car.toLowerCase() === i.value.toLowerCase()) >
          -1
        ) {
          flag = true;
        } else {
          setCars([...cars, i.value]);
        }
      }
      if (i.getAttribute("name") === "hood") {
        hood = i.value;
      }
      if (flag) {
        for (let j of otherProperties) {
          if (i.getAttribute("name") === j.value) {
            j.label = i.checked;
            checker.push(j);
          }
        }
      }
    }
    if (flag) {
      specifications.map((item) =>
        list.push({ value: item.type, label: item.value })
      );
      list.push(...checker);
      list.push({ value: "hood", label: hood });
      let temp = [];
      for (let i of carSpecifications) {
        if (i[0].name === list[0].name) {
          temp.push(list);
        } else {
          temp.push(i);
        }
      }
      setCarSpecifications(temp);
    } else {
      list.push(...basicProperties);
      list.push(...otherProperties);
      list.push({ value: "hood", label: hood });
      setCarSpecifications([...carSpecifications, list]);
    }
  };

  const addNewOption = () => {
    let option = prompt("Please enter option name");
    let temp = [];
    temp.push(...otherProperties);
    temp.push({ value: option, label: false });
    setOtherProperties([...otherProperties, { value: option, label: false }]);
    setDataStructure([
      ...dataStructure,
      { value: option, label: option?.toUpperCase() },
    ]);
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
            id="carName"
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
              <input type="checkbox" name={property.value} />
              {dataStructure.filter((e) => e.value === property.value)[0].label}
            </label>
          ))}
        </div>
        <div id="hood">
          <label className="block">Signature on hood</label>
          <input
            type="text"
            name="hood"
            id="hood"
            className="w-full border-2 border-primary-dark rounded-md h-7 p-2"
          />
        </div>
        <div className="grid grid-cols-3 gap-5 " id="btnGroup">
          <button
            className="bg-secondary-light h-10 rounded-md border-2 border-primary-dark font-bold text-xl"
            onClick={() => addNewOption()}
          >
            + new option
          </button>
          <button
            className="bg-secondary-light h-10 rounded-md border-2 border-primary-dark font-bold text-xl"
            onClick={() => addNewProp()}
          >
            + new prop
          </button>
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
