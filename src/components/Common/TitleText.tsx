import React from "react";
import { useAppContext } from "../../Context/AppContext";

interface TitleTextInterface {
  value: string;
}

const TitleText: React.FC<TitleTextInterface> = ({ value }) => {
  const { font } = useAppContext();

  return <span style={{ fontFamily: font.titleFamily }}>{value}</span>;
};

export default TitleText;
