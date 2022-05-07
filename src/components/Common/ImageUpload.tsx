import { nanoid } from "nanoid";
import React, { useCallback, useMemo, useRef } from "react";
import { useAppContext } from "../../Context/AppContext";

const sideClasses =
  "h-14 w-14 bg-gray-200 absolute rounded-full flex items-center z-10 justify-center animate__animated animate__fadeIn cursor-pointer";

interface ImageUploadInterface {
  onChangeImage: (a: string) => void | any;
  url: string;
}

const ImageUpload: React.FC<ImageUploadInterface> = ({
  onChangeImage,
  url,
}) => {
  const { color } = useAppContext();

  const inputRef = useRef<any>(null);

  const id = useMemo(() => nanoid(), []);

  const onClickImage = useCallback(() => {
    if (!url && inputRef?.current?.click) {
      inputRef?.current?.click();
    } else {
      if (onChangeImage) {
        onChangeImage("");
      }
    }
  }, [url, onChangeImage]);

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
        className={sideClasses}
        onClick={onClickImage}
        style={{
          left: "50%",
          transform: "translateX(-50%)",
          bottom: 6,
          backgroundColor: url ? "red" : color.primary,
        }}
      >
        {url ? (
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        )}
      </div>
    </>
  );
};

export default ImageUpload;
