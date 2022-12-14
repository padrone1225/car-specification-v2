import { AllProperties, CarProperty, OtherProperty } from "../../data";
import { useGlobalAllContext } from "../context/allPropertiesContext";
import { useGlobalBasicPropertyContext } from "../context/basicPropertyContext";
import { useGlobalCarContext } from "../context/carListContext";
import { useGlobalOtherPropertyContext } from "../context/otherPropertyContext";
import { Specification } from "./item";

export const SpecificationList = () => {
  const { cars } = useGlobalCarContext();
  const { setBasicProperties } = useGlobalBasicPropertyContext();
  const { setOtherProperties } = useGlobalOtherPropertyContext();
  const { setAllList } = useGlobalAllContext();

  const formatDB = () => {
    setBasicProperties(CarProperty);
    setOtherProperties(OtherProperty);
    setAllList(AllProperties);
  };
  return (
    <div className="border-2 border-primary-dark flex items-center justify-center flex-col py-14 gap-5 min-h-[calc(100vh-80px)]">
      {cars.map((car) => (
        <Specification title={car} key={car} />
      ))}
      <div
        className="bg-secondary-light text-primary-dark w-80 h-10 flex items-center justify-center font-bold text-xl rounded-md cursor-pointer border-primary-dark border-2"
        onClick={() => formatDB()}
      >
        + Make new specification
      </div>
    </div>
  );
};
