import React, { useCallback } from "react";
import { useAppContext } from "../../Context/AppContext";
import { ButtonDoc } from "../../model/AppContextType";
import { ToastContainer, toast } from "react-toastify";
import TitleText from "./TitleText";

interface ButtonListInterface {
  buttons: ButtonDoc[];
  maxLength?: number;
  isEdit: boolean;
}

const ButtonList: React.FC<ButtonListInterface> = ({
  buttons,
  maxLength = 1,
  isEdit,
}) => {
  const { color } = useAppContext();

  const onClickButton = useCallback((item: ButtonDoc) => {
    if (item.action_type === "alert") {
      toast(item.alert_title, { position: "top-center", autoClose: 3000 });
    } else {
      if (item && item.url && window) {
        window.open(item.url, "_blank")?.focus();
      }
    }
  }, []);

  return (
    <>
      {buttons.map((btn) => (
        <button
          key={btn.id}
          type="button"
          onClick={() => onClickButton(btn)}
          className="relative text-white bg-blue-700 hover:bg-blue-800 focus:outline-none rounded-lg text-sm px-3 py-1 text-center mr-2"
          style={{
            backgroundColor:
              btn.type === "solid" ? color.primary : "transparent",
            border:
              btn.type === "outlined" ? "1px solid " + color.primary : "0px",
          }}
        >
          <TitleText
            value={btn.name}
            size="sm"
            color={btn.type === "outlined" ? color.primary : '"#fff"'}
          />
        </button>
      ))}
      <ToastContainer />
    </>
  );
};

export default ButtonList;
