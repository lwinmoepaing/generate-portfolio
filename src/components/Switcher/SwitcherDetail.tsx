import React from "react";
import { useAppContext } from "../../Context/AppContext";
import { SectionDoc } from "../../model/AppContextType";
import HeaderList from "../Headers/HeaderList";
import HeaderOne from "../Headers/HeaderOne";

interface SwitcherDetailInterface {
  selectedComponent: SectionDoc;
}

const SwitcherDetail: React.FC<SwitcherDetailInterface> = ({
  selectedComponent,
}) => {
  return (
    <>
      {selectedComponent.type === "Header" &&
        selectedComponent.comp_name === "HeaderOne" && (
          <HeaderOne item={selectedComponent} />
        )}
    </>
  );
};

export default SwitcherDetail;
