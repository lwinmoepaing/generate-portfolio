import { nanoid } from "nanoid";
import { TimeLineDoc } from "../model/AppContextType";

const TimeLineHook = () => {
  const createNewTimeLine = (timeLineList: TimeLineDoc[]): TimeLineDoc[] => {
    const newTimeLine: TimeLineDoc = {
      id: nanoid(),
      icon_name: "",
      title_text: "New TimeLine Title",
      body_text: "Body Text",
    };
    return [...timeLineList, newTimeLine];
  };

  const deleteTimeLine = (
    timeLineList: TimeLineDoc[],
    delTimeline: TimeLineDoc
  ): TimeLineDoc[] => {
    return timeLineList.filter((tl) => tl.id !== delTimeline.id);
  };

  const handleTitleText = (
    timeLineList: TimeLineDoc[],
    id: string,
    title: string
  ): TimeLineDoc[] => {
    const updateTimeLine = [...timeLineList];
    const index = updateTimeLine.findIndex((tl) => tl.id === id);
    if (index !== -1) {
      updateTimeLine[index].title_text = title;
    }
    return [...updateTimeLine];
  };

  const handleBodyText = (
    timeLineList: TimeLineDoc[],
    id: string,
    title: string
  ): TimeLineDoc[] => {
    const updateTimeLine = [...timeLineList];
    const index = updateTimeLine.findIndex((tl) => tl.id === id);
    if (index !== -1) {
      updateTimeLine[index].body_text = title;
    }
    return [...updateTimeLine];
  };

  const onUpTimeLineItem = (
    timeLineList: TimeLineDoc[],
    id: string
  ): TimeLineDoc[] => {
    const updateTimeLine = [...timeLineList];
    const index = updateTimeLine.findIndex((tl) => tl.id === id);
    if (index !== -1 && index !== 0) {
      const upData = { ...updateTimeLine[index - 1] };
      updateTimeLine[index - 1] = { ...updateTimeLine[index] };
      updateTimeLine[index] = upData;
    }

    return [...updateTimeLine];
  };

  return {
    createNewTimeLine,
    deleteTimeLine,
    handleTitleText,
    handleBodyText,
    onUpTimeLineItem,
  };
};

export default TimeLineHook;
