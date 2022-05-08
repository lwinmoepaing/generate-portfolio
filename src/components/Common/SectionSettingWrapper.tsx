import { nanoid } from "nanoid";
import React, { useCallback, useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import { SectionDoc } from "../../model/AppContextType";

interface SectionWrapperInterface {
  isEdit: boolean;
  sectoinItem: SectionDoc;
  onChangeName: (a: string) => void | any;
  onChangeShowNavbar: (a: boolean) => void | any;
  onChangeDir: (a: boolean) => void | any;
}

const normalFormClasses =
  "text-center block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer";

const SectionSettingWrapper: React.FC<SectionWrapperInterface> = ({
  isEdit,
  sectoinItem,
  onChangeName,
  onChangeShowNavbar,
  onChangeDir,
}) => {
  const { font } = useAppContext();
  const [navId, showDirId] = [nanoid(), nanoid()];
  const [editTitle, setEditTitle] = useState<string>(sectoinItem.name);
  const [editShowNavbar, setEditShowNavbar] = useState<boolean>(
    sectoinItem.show_nav_bar
  );
  const [editSwapDir, setEditSwapDir] = useState<boolean>(
    sectoinItem.swap_direction
  );

  const handlerTitle = useCallback(
    (e: any) => {
      setEditTitle(e.target.value);
      if (onChangeName) {
        onChangeName(e.target.value);
      }
    },
    [onChangeName]
  );

  const handShowNavbar = useCallback(
    (e: any) => {
      console.log(e.target.checked);
      setEditShowNavbar(e.target.checked);
      if (onChangeShowNavbar) {
        onChangeShowNavbar(e.target.checked);
      }
    },
    [onChangeShowNavbar]
  );

  const handleSwapDir = useCallback(
    (e: any) => {
      setEditSwapDir(e.target.checked);
      if (onChangeDir) {
        onChangeDir(e.target.checked);
      }
    },
    [onChangeDir]
  );

  return isEdit ? (
    <div className="flex flex-col sm:flex-row w-full pb-3 px-3 sm:px-0">
      <div className="w-full sm:w-1/3 sm:mx-3 mb-2 sm:mb-0 rounded px-1 bg-gray-100">
        <div className="relative w-full animate__animated animate__fadeIn">
          <input
            value={editTitle}
            onChange={handlerTitle}
            type="text"
            name="title"
            className={[normalFormClasses].join(" ")}
            placeholder=" "
            style={{ fontFamily: font.titleFamily, fontSize: "1.1rem" }}
          />
          <label
            htmlFor="title"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Title
          </label>
        </div>
      </div>
      <div className="w-full py-2 sm:py-0 sm:w-1/3 sm:mx-3 mb-2 sm:mb-0 rounded px-1 bg-gray-100 flex justify-center items-center">
        <div className="flex justify-center">
          <div className="form-check form-switch">
            <input
              className="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
              type="checkbox"
              role="switch"
              id={navId}
              defaultChecked={editShowNavbar}
              onChange={handShowNavbar}
            />
            <label
              className="form-check-label inline-block text-gray-800"
              htmlFor={navId}
            >
              Show Navbar
            </label>
          </div>
        </div>
      </div>
      <div className="w-full py-2 sm:py-0 sm:w-1/3 sm:mx-3 mb-2 sm:mb-0 rounded px-1 bg-gray-100  flex justify-center items-center">
        <div className="flex justify-center">
          <div className="form-check form-switch">
            <input
              className="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
              type="checkbox"
              role="switch"
              id={showDirId}
              defaultChecked={editSwapDir}
              onChange={handleSwapDir}
            />
            <label
              className="form-check-label inline-block text-gray-800"
              htmlFor={showDirId}
            >
              Swap Direction
            </label>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default SectionSettingWrapper;
