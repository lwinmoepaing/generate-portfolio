import React, { useCallback, useState } from "react";

interface ModalInterface {
  onCloseModal: () => void | any;
}

const ChooseCompModal: React.FC<ModalInterface> = ({ onCloseModal }) => {
  const [classes, setClasses] = useState<string[]>(
    "relative mx-5 my-5 inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-full animate__animated animate__zoomIn".split(
      " "
    )
  );

  const [closeClasses, setCloseClassses] = useState<string[]>(
    "h-10 w-10 bg-gray-200 rounded-full absolute top-1 right-1 flex items-center justify-center animate__animated animate__zoomIn cursor-pointer".split(
      " "
    )
  );

  const [loading, setLoading] = useState<boolean>(false);

  const onCloseModalHandler = useCallback(() => {
    if (loading) return;
    setLoading(true);

    setCloseClassses((prev) => {
      return [
        ...prev.filter((p) => p !== "animate__zoomIn"),
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
        ...prev.filter((p) => p !== "animate__zoomIn"),
        "animate__zoomOut",
      ];
    });
  }, [loading, onCloseModal]);

  return (
    <>
      <div
        className="relative z-10 animate__animated animate__fadeIn"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex min-h-screen text-center">
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className={classes.join(" ")}>
              <div className="grid grid-cols-3 gap-4">
                <div>Header</div>
                <div>Carousel</div>
                <div>About us</div>
                <div>Skills</div>
                <div>Contact us</div>
              </div>
            </div>

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

export default ChooseCompModal;