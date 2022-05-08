import React from "react";
import { useAppContext } from "../../Context/AppContext";
import { SectionDoc } from "../../model/AppContextType";
import HeaderList from "../Headers/HeaderList";
import HeaderOne from "../Headers/HeaderOne";
import TimeLineOne from "../TimeLine/TimeLineOne";

interface SwitcherDetailInterface {
  selectedComponent: SectionDoc;
}

const SwitcherDetail: React.FC<SwitcherDetailInterface> = ({
  selectedComponent,
}) => {
  const { editingSections } = useAppContext();
  return (
    <div
      className={
        editingSections === selectedComponent.id ? "z-20 relative" : ""
      }
    >
      {selectedComponent.type === "Header" &&
        selectedComponent.comp_name === "HeaderOne" && (
          <HeaderOne item={selectedComponent} />
        )}

      {selectedComponent.type === "TimeLine" &&
        selectedComponent.comp_name === "TimeLineOne" && (
          <TimeLineOne item={selectedComponent} />
        )}
    </div>
  );
};

export default SwitcherDetail;
