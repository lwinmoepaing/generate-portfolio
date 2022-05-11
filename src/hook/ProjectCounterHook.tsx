import { nanoid } from "nanoid";
import { useCallback, useEffect, useState } from "react";
import { ProjectCounterDoc } from "../model/AppContextType";

const ProjectCounterHook = () => {
  const [isShowTimer, setIsShowTimer] = useState<boolean>(false);

  useEffect(() => {
    setTimeout((): void | any => {
      setIsShowTimer(true);
    }, 500);
  }, []);

  const createNewProjectCounter = (
    projectCounterList: ProjectCounterDoc[]
  ): ProjectCounterDoc[] => {
    const newProjectCounter: ProjectCounterDoc = {
      id: nanoid(),
      image_name: "https://mdbootstrap.com/img/Photos/Slides/img%20(123).jpg",
      image_type: "normal",
      title_text: "",
      body_text: "",
      counter: 1,
    };
    return [...projectCounterList, newProjectCounter];
  };

  const deleteProjectCounter = (
    projectCounterList: ProjectCounterDoc[],
    delTimeline: ProjectCounterDoc
  ): ProjectCounterDoc[] => {
    return projectCounterList.filter((tl) => tl.id !== delTimeline.id);
  };

  const handleTitleText = (
    projectCounterList: ProjectCounterDoc[],
    id: string,
    title: string
  ): ProjectCounterDoc[] => {
    const updateProjCounter = [...projectCounterList];
    const index = updateProjCounter.findIndex((tl) => tl.id === id);
    if (index !== -1) {
      updateProjCounter[index].title_text = title;
    }
    return [...updateProjCounter];
  };

  const handleBodyText = (
    projectCounterList: ProjectCounterDoc[],
    id: string,
    title: string
  ): ProjectCounterDoc[] => {
    const updateProjCounter = [...projectCounterList];
    const index = updateProjCounter.findIndex((tl) => tl.id === id);
    if (index !== -1) {
      updateProjCounter[index].body_text = title;
    }
    return [...updateProjCounter];
  };

  const handleCounterText = (
    projectCounterList: ProjectCounterDoc[],
    id: string,
    title: number
  ): ProjectCounterDoc[] => {
    const updateProjCounter = [...projectCounterList];
    const index = updateProjCounter.findIndex((tl) => tl.id === id);
    if (index !== -1) {
      updateProjCounter[index].counter = title;
    }
    return [...updateProjCounter];
  };

  const handleImageText = useCallback(
    (
      projectCounterList: ProjectCounterDoc[],
      id: string,
      imageBase64: string
    ) => {
      const updateProjCounter = [...projectCounterList];
      const index = updateProjCounter.findIndex((tl) => tl.id === id);
      if (index !== -1) {
        updateProjCounter[index].image_name = imageBase64;
      }
      return [...updateProjCounter];
    },
    []
  );

  const onChangeSVG = (
    projectCounterList: ProjectCounterDoc[],
    id: string,
    image: string
  ): ProjectCounterDoc[] => {
    const updateProjCounter = [...projectCounterList];
    const index = updateProjCounter.findIndex((tl) => tl.id === id);
    if (index !== -1) {
      updateProjCounter[index].image_name = image;
      updateProjCounter[index].image_type = "svg";
    }
    return [...updateProjCounter];
  };

  const onChangeImageToSVG = (
    projectCounterList: ProjectCounterDoc[],
    id: string,
    image: string
  ): ProjectCounterDoc[] => {
    const updateProjCounter = [...projectCounterList];
    const index = updateProjCounter.findIndex((tl) => tl.id === id);
    if (index !== -1) {
      updateProjCounter[index].image_type = "svg";
    }
    return [...updateProjCounter];
  };

  const onChangeSVGtoImage = (
    projectCounterList: ProjectCounterDoc[],
    id: string,
    image: string
  ): ProjectCounterDoc[] => {
    const updateProjCounter = [...projectCounterList];
    const index = updateProjCounter.findIndex((tl) => tl.id === id);
    if (index !== -1) {
      updateProjCounter[index].image_type = "normal";
      updateProjCounter[index].image_name = image;
    }
    return [...updateProjCounter];
  };

  return {
    createNewProjectCounter,
    deleteProjectCounter,
    handleImageText,
    handleTitleText,
    handleBodyText,
    onChangeSVG,
    onChangeImageToSVG,
    onChangeSVGtoImage,
    handleCounterText,
    isShowTimer,
  };
};

export default ProjectCounterHook;
