import React from "react";

interface selectedComponentInterface {
  id: string;
  name: string;
  list: string[];
}

const HeaderList: React.FC<selectedComponentInterface> = () => {
  return <div>Header List</div>;
};

export default HeaderList;
