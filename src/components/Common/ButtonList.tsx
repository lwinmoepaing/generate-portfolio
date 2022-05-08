import React, { useCallback, useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import { ButtonDoc } from "../../model/AppContextType";
import { ToastContainer, toast } from "react-toastify";
import TitleText from "./TitleText";
import ButtonEditModal from "../Modal/ButtonEditModal";
import { nanoid } from "nanoid";

interface ButtonListInterface {
  buttons: ButtonDoc[];
  maxLength?: number;
  isEdit: boolean;
  onChangeButtons: (buttons: ButtonDoc[]) => void | any;
}

const ButtonList: React.FC<ButtonListInterface> = ({
  buttons,
  maxLength = 3,
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
        return;
      }

      if (item.action_type === "url" && item.url && window) {
        window.open(item.url, "_blank")?.focus();
        return;
      }

      if (item.action_type === "tel") {
        const phBtn = document.getElementById(`phone_${item.id}`);
        phBtn?.click();
      }
    },
    [isEdit]
  );

  const onAddButtons = useCallback(() => {
    if (onChangeButtons) {
      onChangeButtons([
        ...buttons,
        {
          id: nanoid(),
          name: "New Button",
          type: "solid",
          action_type: "alert",
          alert_title: "New Button",
          phone: "+959",
          url: "https://",
        },
      ]);
    }
  }, [buttons, onChangeButtons]);

  const onDeleteButtons = useCallback(
    (btn: ButtonDoc) => {
      if (onChangeButtons) {
        onChangeButtons(buttons.filter((b) => b.id !== btn.id));
      }
    },
    [buttons, onChangeButtons]
  );

  const onUpdateButton = useCallback(
    (btn: ButtonDoc) => {
      const updateButton = [...buttons];
      const findIndex = updateButton.findIndex((b) => b.id === btn.id);
      if (findIndex !== -1) {
        updateButton[findIndex] = btn;
      }

      if (onChangeButtons) {
        onChangeButtons(updateButton);
      }
    },
    [buttons, onChangeButtons]
  );

  return (
    <div className="flex justify-center">
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
            color={btn.type === "outlined" ? color.primary : "#fff"}
          />

          {btn.action_type === "tel" && (
            <a
              href={`tel:${btn.phone}`}
              className="hidden"
              id={`phone_${btn.id}`}
            >
              -
            </a>
          )}
        </button>
      ))}
      {buttons.length < maxLength && isEdit && (
        <div
          onClick={onAddButtons}
          className={
            "h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center animate__animated animate__fadeInRight cursor-pointer"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
      )}
      {openModal && selectedItem && (
        <ButtonEditModal
          button={selectedItem}
          onUpdateButton={onUpdateButton}
          onDeleteButton={onDeleteButtons}
          onCloseModal={() => setOpenModal(false)}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default ButtonList;
