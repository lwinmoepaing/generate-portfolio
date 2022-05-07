import React from "react";
import { useAppContext } from "../../Context/AppContext";
import HeaderList from "../Headers/HeaderList";

interface selectedComponentInterface {
  id: string;
  name: string;
  list: string[];
}
interface SwitcherInterface {
  selectedComponent: selectedComponentInterface;
  onSelected: () => void | any;
}

const Switcher: React.FC<SwitcherInterface> = ({
  selectedComponent,
  onSelected,
}) => {
  return (
    <>
      {selectedComponent.id === "Header" && (
        <HeaderList {...selectedComponent} onSelected={onSelected} />
      )}
    </>
  );
};

export default Switcher;
