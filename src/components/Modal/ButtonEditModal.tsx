import React, { useCallback, useMemo, useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import { ChromePicker } from "react-color";
import { ButtonDoc } from "../../model/AppContextType";

interface ModalInterface {
  onCloseModal: () => void | any;
  button: ButtonDoc;
}

const ButtonEditModal: React.FC<ModalInterface> = ({ onCloseModal }) => {
  const { title, setTitle, color, setColor } = useAppContext();
  const [editTitle, setEditTitle] = useState<string>(title);
  const [primaryColor, setPrimaryColor] = useState<string>(color.primary);
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const isErrorTitle = useMemo<boolean>(() => {
    return !editTitle?.trim();
  }, [editTitle]);

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

  const onSubmitForm = useCallback(() => {
    setIsTouched(true);

    if (!editTitle) {
      return;
    }

    if (setTitle) {
      setTitle(editTitle);
    }

    if (setColor && primaryColor) {
      setColor({
        ...color,
        primary: primaryColor,
      });
    }

    onCloseModalHandler();
  }, [editTitle, setTitle, setColor, primaryColor, onCloseModalHandler, color]);

  return (
    <>
      <div
        className="relative z-10 animate__animated animate__fadeIn"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-white  transition-opacity"
          onClick={onCloseModalHandler}
        ></div>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex justify-center ">
            {/* Form Here */}

            <form className={classes.join(" ")}>
              <div className="relative z-0 w-full mb-6 group">
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

              <div className="relative z-0 w-full mb-6 group">
                <ChromePicker
                  color={primaryColor}
                  onChangeComplete={(str) => setPrimaryColor(str.hex)}
                  className="mx-auto"
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={onCloseModalHandler}
                  className="flex bg-red-100 mr-3 text-red-400 justify-center  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={onSubmitForm}
                  className="text-white bg-blue-700 flex justify-center hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {/* <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        fill="rgb(29 78 216 / 0)"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                    </svg> */}
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
