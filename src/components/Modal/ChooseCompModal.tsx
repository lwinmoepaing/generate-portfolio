import React, { useCallback, useState } from "react";
import Switcher from "../Switcher/Switcher";
import HeaderList from "../../shared/appHeaderList.json";

interface ModalInterface {
  onCloseModal: () => void | any;
}

const ChooseCompModal: React.FC<ModalInterface> = ({ onCloseModal }) => {
  const [classes, setClasses] = useState<string[]>(
    "relativebg-white rounded-lg overflow-hidden w-full animate__animated animate__fadeInUp".split(
      " "
    )
  );

  const [closeClasses, setCloseClassses] = useState<string[]>(
    "h-10 w-10 bg-gray-200 rounded-full absolute top-1 right-1 flex items-center justify-center animate__animated animate__fadeInUp cursor-pointer".split(
      " "
    )
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [selectedComponent, setSelectedComponent] = useState<null | any>(null);

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

  const onSelectedCharacter = useCallback(
    (item: { id: string; name: string; list: string[] }) => {
      setSelectedComponent(item);
    },
    []
  );

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
          {!selectedComponent && (
            <div className="flex text-center justify-center items-center">
              <div className={classes.join(" ")}>
                <dl>
                  {HeaderList.map((item, index) => (
                    <div
                      className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }  px-4 py-5 cursor-pointer`}
                      key={item.id}
                      onClick={() => onSelectedCharacter(item)}
                    >
                      <dt className="text-sm font-medium text-primary">
                        {item.name}{" "}
                      </dt>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          )}

          {selectedComponent && (
            <div className={classes.join(" ")}>
              <Switcher
                selectedComponent={selectedComponent}
                onSelected={onCloseModalHandler}
              />
            </div>
          )}

          <div onClick={onCloseModalHandler} className={closeClasses.join(" ")}>
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
    </>
  );
};

export default ChooseCompModal;
