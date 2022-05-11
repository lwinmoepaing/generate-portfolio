import { nanoid } from "nanoid";
import React, { useCallback, useMemo, useRef } from "react";
import { useAppContext } from "../../Context/AppContext";

const sideClasses =
  "h-14 w-14 bg-gray-200 absolute rounded-full flex items-center z-10 justify-center animate__animated animate__fadeIn cursor-pointer";

interface CarouselImageInterface {
  onChangeImage: (a: string) => void | any;
  style?: any;
  additionalClass?: string;
}

const CarouselImageUpload: React.FC<CarouselImageInterface> = ({
  onChangeImage,
  additionalClass,
  style,
}) => {
  const { color } = useAppContext();

  const inputRef = useRef<any>(null);

  const id = useMemo(() => nanoid(), []);

  const onClickImage = useCallback(() => {
    if (inputRef?.current?.click) {
      inputRef?.current?.click();
    } else {
      if (onChangeImage) {
        onChangeImage("");
      }
    }
  }, [onChangeImage]);

  const onFileChange = useCallback(
    (e: any) => {
      const file = e.target.files[0];
      console.log(file.type);
      let allowedExtensions = /(\jpg|\jpeg|\png)$/i;
      const isValid = allowedExtensions.exec(file.type);

      if (!isValid) {
        alert("Not Valid");
        e.target.value = null;
        return;
      }

      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        if (onChangeImage) {
          onChangeImage(reader.result as string);
        }
        e.target.value = null;
      };
      reader.onerror = function (error) {
        alert("Not Valid");
        e.target.value = null;
      };
    },
    [onChangeImage]
  );

  const classes = useMemo(() => {
    const defaultClass =
      "bg-red-700 rounded-full flex items-center z-10 justify-center animate__animated animate__fadeIn cursor-pointer";

    if (additionalClass) {
      return defaultClass + " " + additionalClass;
    }

    return defaultClass + " " + "h-16 w-16 mr-4";
  }, [additionalClass]);

  return (
    <>
      <input
        ref={inputRef}
        id={id}
        className="hidden"
        type="file"
        onChange={onFileChange}
      />

      <div
        onClick={onClickImage}
        className={classes}
        style={{
          backgroundColor: color.primary,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          ></path>
        </svg>
      </div>
    </>
  );
};

export default CarouselImageUpload;
