import { nanoid } from "nanoid";
import React, { useCallback, useMemo, useState } from "react";
import { ButtonDoc } from "../../model/AppContextType";

interface ModalInterface {
  onUpdateButton: (item: ButtonDoc) => void | any;
  onDeleteButton: (item: ButtonDoc) => void | any;
  onCloseModal: () => void | any;
  button: ButtonDoc;
}

const ButtonEditModal: React.FC<ModalInterface> = ({
  onCloseModal,
  onUpdateButton,
  onDeleteButton,
  button,
}) => {
  const [editTitle, setEditTitle] = useState<string>(button.name);
  const [messageTitle, setMessageTitle] = useState<string>(
    button.alert_title || ""
  );
  const [phoneText, setPhoneText] = useState<string>(button.phone || "");
  const [url, setUrl] = useState<string>(button.url || "");
  const [actionType, setActionType] = useState<"url" | "alert" | "tel">(
    button.action_type
  );
  const [buttonType, setButtonType] = useState<"solid" | "outlined">(
    button.type
  );
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const [radio1, radio2, radio3, radio4, radio5] = [
    nanoid(),
    nanoid(),
    nanoid(),
    nanoid(),
    nanoid(),
  ];

  const isErrorTitle = useMemo<boolean>(() => {
    return !editTitle?.trim();
  }, [editTitle]);

  const isErrorMessageTitle = useMemo<boolean>(() => {
    return !messageTitle?.trim();
  }, [messageTitle]);

  const isErrorUrl = useMemo<boolean>(() => {
    return !url?.trim();
  }, [url]);

  const isErrorPhone = useMemo<boolean>(() => {
    return !phoneText?.trim();
  }, [phoneText]);

  const [classes, setClasses] = useState<string[]>(
    "flex-1 p-4 m-4 max-w-xl shadow-xl  animate__animated animate__fadeInUp".split(
      " "
    )
  );

  const normalFormClasses = useMemo<string>(
    () =>
      "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer",
    []
  );

  const [closeClasses, setCloseClassses] = useState<string[]>(
    "h-10 w-10 bg-gray-200 rounded-full absolute top-1 right-1 flex items-center justify-center animate__animated animate__fadeInUp cursor-pointer".split(
      " "
    )
  );

  const [loading, setLoading] = useState<boolean>(false);

  const onCloseModalHandler = useCallback(() => {
    if (loading) return;
    setLoading(true);

    setCloseClassses((prev) => {
      return [
        ...prev.filter((p) => p !== "animate__fadeInUp"),
        "animate__zoomOut",
      ];
    });

    setClasses((prev) => {
      setTimeout(() => {
        if (onCloseModal) {
          onCloseModal();
        }
      }, 250);
      return [
        ...prev.filter((p) => p !== "animate__fadeInUp"),
        "animate__fadeOutDown",
      ];
    });
  }, [loading, onCloseModal]);

  const handlerTitle = useCallback((e: any) => {
    setEditTitle(e.target.value);
  }, []);

  const handlerMessageTitle = useCallback((e: any) => {
    setMessageTitle(e.target.value);
  }, []);

  const handlerUrlText = useCallback((e: any) => {
    setUrl(e.target.value);
  }, []);

  const handlerPhoneText = useCallback((e: any) => {
    setPhoneText(e.target.value);
  }, []);

  const handlerActionType = useCallback((e: any) => {
    setActionType(e.target.value);
  }, []);

  const handleButtonType = useCallback((e: any) => {
    setButtonType(e.target.value);
  }, []);

  const onSubmitForm = useCallback(() => {
    setIsTouched(true);

    if (!editTitle?.trim()) {
      return;
    }

    if (actionType === "alert" && !messageTitle?.trim()) {
      return;
    }

    if (actionType === "url" && !url?.trim()) {
      return;
    }

    if (actionType === "tel" && !phoneText?.trim()) {
      return;
    }

    if (onUpdateButton) {
      onUpdateButton({
        ...button,
        name: editTitle,
        alert_title: messageTitle,
        action_type: actionType,
        url: url,
        phone: phoneText,
        type: buttonType,
      });
    }

    onCloseModalHandler();
  }, [
    editTitle,
    actionType,
    messageTitle,
    url,
    phoneText,
    onUpdateButton,
    onCloseModalHandler,
    button,
    buttonType,
  ]);

  const onDeleteForm = useCallback(() => {
    if (onDeleteButton) {
      onDeleteButton({
        ...button,
      });
    }

    onCloseModalHandler();
  }, [onDeleteButton, onCloseModalHandler, button]);

  return (
    <>
      <div
        className="relative z-30 animate__animated animate__fadeIn"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-white  transition-opacity"
          onClick={onCloseModalHandler}
        ></div>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex justify-center">
            {/* Form Here */}

            <form className={classes.join(" ")}>
              <div className="relative flex flex-col items-start z-0 w-full mb-1 group">
                <input
                  value={editTitle}
                  onChange={handlerTitle}
                  type="text"
                  name="title"
                  className={[
                    normalFormClasses,
                    isTouched && isErrorTitle
                      ? "border-red-600 focus:border-red-600"
                      : "",
                  ].join(" ")}
                  placeholder=" "
                />
                <label
                  htmlFor="title"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Title
                </label>
                {isTouched && isErrorTitle && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                    Title is not valid
                  </p>
                )}
              </div>

              <div className="flex items-start my-4">
                <div className="form-check form-check-inline mr-3">
                  <input
                    className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    type="radio"
                    name="buttonTypeRadios"
                    id={radio4}
                    value="solid"
                    defaultChecked={buttonType === "solid"}
                    onChange={handleButtonType}
                  />
                  <label
                    className="form-check-label inline-block text-gray-800"
                    htmlFor={radio4}
                  >
                    Solid
                  </label>
                </div>
                <div className="form-check form-check-inline mr-3">
                  <input
                    className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    type="radio"
                    name="buttonTypeRadios"
                    id={radio5}
                    value="outlined"
                    defaultChecked={buttonType === "outlined"}
                    onChange={handleButtonType}
                  />
                  <label
                    className="form-check-label inline-block text-gray-800"
                    htmlFor={radio5}
                  >
                    Outlined
                  </label>
                </div>
              </div>

              <div className="flex items-start my-4">
                <div className="form-check form-check-inline mr-3">
                  <input
                    className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    type="radio"
                    name="inlineRadioOptions"
                    id={radio1}
                    value="alert"
                    defaultChecked={actionType === "alert"}
                    onChange={handlerActionType}
                  />
                  <label
                    className="form-check-label inline-block text-gray-800"
                    htmlFor={radio1}
                  >
                    Alert
                  </label>
                </div>
                <div className="form-check form-check-inline mr-3">
                  <input
                    className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    type="radio"
                    name="inlineRadioOptions"
                    id={radio2}
                    value="url"
                    defaultChecked={actionType === "url"}
                    onChange={handlerActionType}
                  />
                  <label
                    className="form-check-label inline-block text-gray-800"
                    htmlFor={radio2}
                  >
                    Url
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    type="radio"
                    name="inlineRadioOptions"
                    id={radio3}
                    value="tel"
                    defaultChecked={actionType === "tel"}
                    onChange={handlerActionType}
                  />
                  <label
                    className="form-check-label inline-block text-gray-800"
                    htmlFor={radio3}
                  >
                    Phone
                  </label>
                </div>
              </div>

              {actionType === "alert" && (
                <div className="relative flex flex-col items-start z-0 w-full mb-1 group">
                  <input
                    value={messageTitle}
                    onChange={handlerMessageTitle}
                    type="text"
                    name="title"
                    className={[
                      normalFormClasses,
                      isTouched && isErrorMessageTitle
                        ? "border-red-600 focus:border-red-600"
                        : "",
                    ].join(" ")}
                    placeholder=" "
                  />
                  <label
                    htmlFor="title"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Alert Message
                  </label>
                  {isTouched && isErrorMessageTitle && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                      Alert Message is not Valid
                    </p>
                  )}
                </div>
              )}

              {actionType === "url" && (
                <div className="relative flex flex-col items-start z-0 w-full mb-1 group">
                  <input
                    value={url}
                    onChange={handlerUrlText}
                    type="text"
                    name="title"
                    className={[
                      normalFormClasses,
                      isTouched && isErrorUrl
                        ? "border-red-600 focus:border-red-600"
                        : "",
                    ].join(" ")}
                    placeholder=" "
                  />
                  <label
                    htmlFor="title"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Url (https://)
                  </label>
                  {isTouched && isErrorUrl && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                      Url is Required
                    </p>
                  )}
                </div>
              )}

              {actionType === "tel" && (
                <div className="relative flex flex-col items-start z-0 w-full mb-1 group">
                  <input
                    value={phoneText}
                    onChange={handlerPhoneText}
                    type="text"
                    name="title"
                    className={[
                      normalFormClasses,
                      isTouched && isErrorPhone
                        ? "border-red-600 focus:border-red-600"
                        : "",
                    ].join(" ")}
                    placeholder=" "
                  />
                  <label
                    htmlFor="title"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Tel (+959xxxxxxxxx)
                  </label>
                  {isTouched && isErrorPhone && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                      Phone number is Required
                    </p>
                  )}
                </div>
              )}

              <div className="flex justify-between mt-3">
                <button
                  type="button"
                  onClick={onDeleteForm}
                  className="flex bg-red-500 mr-3 text-white justify-center  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={onSubmitForm}
                  className="text-white bg-blue-700 flex justify-center hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </div>
            </form>

            {/* Form Here */}

            <div
              onClick={onCloseModalHandler}
              className={closeClasses.join(" ")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ButtonEditModal;
