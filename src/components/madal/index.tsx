import { Dialog } from "@headlessui/react";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import {
  PropertyStructure,
  useGlobalAllContext,
} from "../context/allPropertiesContext";
import { useGlobalBasicPropertyContext } from "../context/basicPropertyContext";
import { useGlobalDataContext } from "../context/specificationDataContext";

type ModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const Modal = ({ isOpen, setIsOpen }: ModalProps) => {
  const { allList, setAllList } = useGlobalAllContext();
  const { dataStructure, setDataStructure } = useGlobalDataContext();
  const { basicProperties, setBasicProperties } =
    useGlobalBasicPropertyContext();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    let type = "";
    let label = "";
    let value = "";
    for (let item of event.target) {
      if (item.getAttribute("name") === "type") {
        type = item.value;
      }
      if (item.getAttribute("name") === "label") {
        label = item.value;
      }
      if (item.getAttribute("name") === "id") {
        value = item.value;
      }
    }
    setAllList([...allList, { value: value, label: label, type: type }]);
    if (dataStructure.findIndex((data) => data.value === type) === -1) {
      setDataStructure([
        ...dataStructure,
        { value: type, label: type.toUpperCase() },
      ]);
      setBasicProperties([...basicProperties, { value: type, label: value }]);
    }
    setIsOpen(false);
  };
  return (
    <Dialog
      open={isOpen}
      onClose={setIsOpen}
      as="div"
      className={clsx(
        "fixed inset-0 z-10 flex items-center justify-center overflow-y-auto",
        { "bg-[rgb(17,24,39)]": isOpen === true }
      )}
    >
      <div className="flex flex-col bg-[rgb(31,41,55)] text-white w-96 py-8 px-4 text-center">
        <form className="grid gap-6" onSubmit={handleSubmit}>
          <div>
            <label className="block">Type</label>
            <input
              type="text"
              name="type"
              id=""
              className="text-primary-dark p-1 rounded-md w-full"
            />
          </div>
          <div>
            <label className="block">ID</label>
            <input
              type="text"
              name="id"
              id=""
              className="text-primary-dark p-1 rounded-md w-full"
            />
          </div>
          <div>
            <label className="block">Label</label>
            <input
              type="text"
              name="label"
              id=""
              className="text-primary-dark p-1 rounded-md w-full"
            />
          </div>
          <button className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[rgb(220,38,38)] text-base font-medium text-white hover:bg-[rgb(185,28,28)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(239,68,68)]">
            Add
          </button>
        </form>
      </div>
    </Dialog>
  );
};
