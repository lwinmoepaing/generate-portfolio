import React from "react";
import { SectionDoc } from "../../model/AppContextType";

interface HeaderListInterface {
  id: string;
  name: string;
  list: string[];
  onSelectSection: (item: SectionDoc) => void | any;
}

const HeaderList: React.FC<HeaderListInterface> = ({ onSelectSection }) => {
  return <div></div>;
};

export default HeaderList;
