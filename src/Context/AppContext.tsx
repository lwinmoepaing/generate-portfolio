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

  const setFont = React.useCallback((font: FontDoc) => {
    setState((prev) => ({
      ...prev,
      font,
    }));
  }, []);

  const setColor = React.useCallback((color: ColorDoc) => {
    console.log("Inside Setting Color");
    setState((prev) => ({ ...prev, color }));
  }, []);

  const setTitle = React.useCallback((title: string) => {
    setState((prev) => ({ ...prev, title }));
  }, []);

  const onSelectSection = React.useCallback((section: SectionDoc) => {
    setState((prev) => ({ ...prev, sections: [...prev.sections, section] }));
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

      return { ...prev, sections: updateSections };
    });
  }, []);

  const onDeleteSection = React.useCallback((section: SectionDoc) => {
    setState((prev) => ({
      ...prev,
      sections: prev.sections.filter((sect) => sect.id !== section.id),
    }));
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
