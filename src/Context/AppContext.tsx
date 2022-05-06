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
    setState((prev) => ({ ...prev, color }));
  }, []);

  const setTitle = React.useCallback((title: string) => {
    setState((prev) => ({ ...prev, title }));
  }, []);

  const onSelectSection = React.useCallback((section: SectionDoc) => {
    setState((prev) => ({ ...prev, sections: [...prev.sections, section] }));
  }, []);

  return (
    <AppCtx.Provider
      value={{ ...state, setFont, setColor, setTitle, onSelectSection }}
    >
      {children}
    </AppCtx.Provider>
  );
};

export const useAppContext = () => React.useContext(AppCtx);
