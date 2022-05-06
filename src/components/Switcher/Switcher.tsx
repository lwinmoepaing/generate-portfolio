import React from "react";
import HeaderList from "../Headers/HeaderList";

interface selectedComponentInterface {
  id: string;
  name: string;
  list: string[];
}
interface SwitcherInterface {
  selectedComponent: selectedComponentInterface;
}

const Switcher: React.FC<SwitcherInterface> = ({ selectedComponent }) => {
  return (
    <>
      {selectedComponent.id === "Header" && (
        <HeaderList {...selectedComponent} />
      )}
    </>
  );
};

export default Switcher;
