import React, { useCallback, useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import { ButtonDoc } from "../../model/AppContextType";
import { ToastContainer, toast } from "react-toastify";
import TitleText from "./TitleText";
import ButtonEditModal from "../Modal/ButtonEditModal";

interface ButtonListInterface {
  buttons: ButtonDoc[];
  maxLength?: number;
  isEdit: boolean;
  onChangeButtons: (buttons: ButtonDoc[]) => void | any;
}

const ButtonList: React.FC<ButtonListInterface> = ({
  buttons,
  maxLength = 1,
  isEdit,
  onChangeButtons,
}) => {
  const { color } = useAppContext();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<null | ButtonDoc>(null);

  const onClickButton = useCallback(
    (item: ButtonDoc) => {
      if (isEdit) {
        setSelectedItem(item);
        setOpenModal(true);
        return;
      }

      if (item.action_type === "alert") {
        toast(item.alert_title, { position: "top-center", autoClose: 3000 });
      } else {
        if (item && item.url && window) {
          window.open(item.url, "_blank")?.focus();
        }
      }
    },
    [isEdit]
  );

  const onAddButtons = useCallback(() => {}, []);

  const onDeleteButtons = useCallback(() => {}, []);

  const onUpdateButton = useCallback((btn: ButtonDoc) => {}, []);

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

      {JSON.stringify(openModal && selectedItem)}
      {openModal && selectedItem && (
        <ButtonEditModal
          button={selectedItem}
          onUpdateButton={onUpdateButton}
          onCloseModal={() => setOpenModal(false)}
        />
      )}
      <ToastContainer />
    </>
  );
};

export default ButtonList;
