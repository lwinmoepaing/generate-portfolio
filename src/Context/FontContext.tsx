import App from "next/app";
import * as React from "react";

interface FontDoc {
  titleFamily: string;
  titleFamilyUrl: string;
  bodyFamily: string;
  bodyFamilyUrl: string;
}

interface ColorDoc {
  primary: string;
  secondary: string;
  warning: string;
  danger: string;
  background: string;
}

interface AppContextInterface {
  title: string;
  font: FontDoc;
  color: ColorDoc;

  setFont?: (font: FontDoc) => void | any;
  setColor?: (color: ColorDoc) => void | any;
  setTitle?: (title: string) => void | any;
}

export const AppCtx = React.createContext<AppContextInterface | null>(null);

// Provider in your app

const sampleAppContext: AppContextInterface = {
  title: "My Portfolio",
  font: {
    titleFamily: "Righteous",
    titleFamilyUrl:
      "https://fonts.googleapis.com/css2?family=Righteous&display=swap",
    bodyFamily: "Roboto",
    bodyFamilyUrl:
      "https://fonts.googleapis.com/css2?family=Roboto&display=swap",
  },
  color: {
    primary: "#7474e1",
    secondary: "#3c3cf5",
    warning: "#fcce1a",
    danger: "fc1a1a",
    background: "#fafafa",
  },
};

export const FontContextProvider: React.FC<any> = ({ children }) => {
  const [state, setState] =
    React.useState<AppContextInterface>(sampleAppContext);

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

  return (
    <AppCtx.Provider value={{ ...state, setFont, setColor, setTitle }}>
      {children}
    </AppCtx.Provider>
  );
};
