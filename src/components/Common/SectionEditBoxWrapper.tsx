import React, { useState } from "react";
import { useAppContext } from "../../Context/AppContext";

interface SectionEditBoxWrapperInterface {
  changeEdit: () => void | any;
  onCancelEdit: () => void | any;
  onDelete: () => void | any;
  onUpdate: () => void | any;
  isEdit: boolean;
}

const SectionEditBoxWrapper: React.FC<SectionEditBoxWrapperInterface> = ({
  changeEdit,
  onCancelEdit,
  onDelete,
  onUpdate,
  isEdit,
}) => {
  const { color } = useAppContext();

  const [submitClasses, setSubmitClasses] = useState<string[]>(
    "mr-3 h-10 w-10 bg-blue-600 rounded-full flex items-center z-10  justify-center animate__animated animate__zoomIn cursor-pointer".split(
      " "
    )
  );

  const [closeClasses, setCloseClasses] = useState<string[]>(
    "mr-3 h-10 w-10 bg-red-200 rounded-full flex items-center z-10 justify-center animate__animated animate__zoomIn cursor-pointer".split(
      " "
    )
  );

  const [cancelClasses, setCancelClasses] = useState<string[]>(
    "mr-3 h-10 w-10 bg-gray-200 rounded-full flex items-center z-10 justify-center animate__animated animate__zoomIn cursor-pointer".split(
      " "
    )
  );

  const [editClasses, setEditClasses] = useState<string[]>(
    "mr-3 h-10 w-10 bg-green-200 rounded-full flex items-center z-10 justify-center animate__animated animate__zoomIn cursor-pointer".split(
      " "
    )
  );

  return (
    <>
      {isEdit && (
        <div
          className="edit-component-border inset-0 animate__animated animate__fadeIn z--1"
          style={{ borderColor: color.primary }}
        ></div>
      )}
      <div className="flex flex-row absolute top-2 right-1 ">
        {isEdit && (
          <>
            <div
              onClick={onUpdate}
              className={submitClasses.join(" ")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div onClick={onCancelEdit} className={cancelClasses.join(" ")}>
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
          </>
        )}

        {!isEdit && (
          <>
            <div onClick={changeEdit} className={editClasses.join(" ")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 w-6 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </div>

            <div onClick={onDelete} className={closeClasses.join(" ")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SectionEditBoxWrapper;
