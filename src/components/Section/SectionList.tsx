import React from "react";
import { useAppContext } from "../../Context/AppContext";
import SwitcherDetail from "../Switcher/SwitcherDetail";

const SectionList: React.FC = () => {
  const { sections } = useAppContext();

  return (
    <div className="container mx-auto">
      {sections.map((section) => (
        <SwitcherDetail selectedComponent={section} key={section.id} />
      ))}
    </div>
  );
};

export default SectionList;
