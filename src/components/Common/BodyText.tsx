import React from "react";
import { useAppContext } from "../../Context/AppContext";

interface BodyTextInterface {
  value: string;
}

const BodyText: React.FC<BodyTextInterface> = ({ value }) => {
  const { font } = useAppContext();

  return <span style={{ fontFamily: font.bodyFamily }}>{value}</span>;
};

export default BodyText;
