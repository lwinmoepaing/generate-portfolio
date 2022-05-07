import React, { useState } from "react";
import { SectionDoc } from "../../model/AppContextType";
import TitleText from "../Common/TitleText";

interface HeaderOneInterface {
  item: SectionDoc;
}

const HeaderOne: React.FC<HeaderOneInterface> = ({ item }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  return (
    <div className="flex flex-col sm:flex-row w-full">
      <div className="w-full sm:w-1/2 bg-gray-300">
        <TitleText value={item.title_text} />
      </div>
      <div className="w-full sm:w-1/2 bg-gray-400">09</div>
    </div>
  );
};

export default HeaderOne;
