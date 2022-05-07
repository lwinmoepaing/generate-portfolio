import AppDataJson from "../shared/appData.json";
import * as React from "react";
import {
  AppContextInterface,
  ColorDoc,
  FontDoc,
  SectionDoc,
} from "../model/AppContextType";

const initData: AppContextInterface = {
  ...AppDataJson,
  onSelectSection: () => {},
};

export const AppCtx = React.createContext<AppContextInterface>(initData);

export const AppContextProvider: React.FC<any> = ({ children }) => {
  const [state, setState] = React.useState<AppContextInterface>(initData);

  React.useEffect(() => {
    const initStorage = localStorage.getItem("lwinStorage");

    if (initStorage) {
      setState(JSON.parse(initStorage));
    }
  }, []);

  const setFont = React.useCallback((font: FontDoc) => {
    setState((prev) => ({
      ...prev,
      font,
    }));
  }, []);

  const setColor = React.useCallback((color: ColorDoc) => {
    console.log("Inside Setting Color");
    setState((prev) => {
      let returnData = { ...prev, color };
      localStorage.setItem("lwinStorage", JSON.stringify(returnData));
      return returnData;
    });
  }, []);

  const setTitle = React.useCallback((title: string) => {
    setState((prev) => {
      let returnData = { ...prev, title };
      localStorage.setItem("lwinStorage", JSON.stringify(returnData));
      return returnData;
    });
  }, []);

  const onSelectSection = React.useCallback((section: SectionDoc) => {
    setState((prev) => {
      let returnData = { ...prev, sections: [...prev.sections, section] };
      localStorage.setItem("lwinStorage", JSON.stringify(returnData));
      return returnData;
    });
  }, []);

  const onUpdateSection = React.useCallback((section: SectionDoc) => {
    setState((prev) => {
      const indexOfSection = prev.sections.findIndex(
        (prevSect) => prevSect.id === section.id
      );

      let updateSections = [...prev.sections];
      if (indexOfSection !== -1) {
        updateSections[indexOfSection] = section;
      }

      let returnData = { ...prev, sections: updateSections };

      localStorage.setItem("lwinStorage", JSON.stringify(returnData));

      return returnData;
    });
  }, []);

  const onDeleteSection = React.useCallback((section: SectionDoc) => {
    setState((prev) => {
      const returnData = {
        ...prev,
        sections: prev.sections.filter((sect) => sect.id !== section.id),
      };
      
      localStorage.setItem("lwinStorage", JSON.stringify(returnData));

      return returnData;
    });
  }, []);

  return (
    <AppCtx.Provider
      value={{
        ...state,
        setFont,
        setColor,
        setTitle,
        onSelectSection,
        onUpdateSection,
        onDeleteSection,
      }}
    >
      {children}
    </AppCtx.Provider>
  );
};

export const useAppContext = () => React.useContext(AppCtx);
