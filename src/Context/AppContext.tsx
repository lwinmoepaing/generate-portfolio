import AppDataJson from "../shared/appData.json";
import * as React from "react";
import {
  AppContextInterface,
  ColorDoc,
  FontDoc,
  SectionDoc,
} from "../model/AppContextType";
import axios from "axios";

const initData: AppContextInterface = {
  ...AppDataJson,
  onSelectSection: () => {},
};

export const AppCtx = React.createContext<AppContextInterface>(initData);

export const AppContextProvider: React.FC<any> = ({ children }) => {
  const [state, setState] = React.useState<AppContextInterface>(initData);

  React.useEffect(() => {
    const data = document.getElementById("__LWIN_DATA__");
    if (data && data.textContent) {
      setState((prev) => ({
        ...prev,
        ...(JSON.parse(data.textContent || "") || {}),
        is_exporting: true,
      }));

      if (JSON.parse(data.textContent || "")) {
        localStorage.setItem("lwinStorage", data.textContent);
      }
      return;
    }

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

      let returnData = {
        ...prev,
        sections: updateSections,
        editingSections: null,
      };

      localStorage.setItem("lwinStorage", JSON.stringify(returnData));

      return returnData;
    });
  }, []);

  const onDeleteSection = React.useCallback((section: SectionDoc) => {
    setState((prev) => {
      const returnData = {
        ...prev,
        sections: prev.sections.filter((sect) => sect.id !== section.id),
        editingSections: null,
      };

      localStorage.setItem("lwinStorage", JSON.stringify(returnData));

      return returnData;
    });
  }, []);

  const setEditingSection = React.useCallback((section: SectionDoc) => {
    setState((prev) => {
      const returnData = {
        ...prev,
        editingSections: section.id,
      };

      localStorage.setItem("lwinStorage", JSON.stringify(returnData));

      return returnData;
    });
  }, []);

  const setClearSection = React.useCallback(() => {
    setState((prev) => {
      const returnData = {
        ...prev,
        editingSections: null,
      };

      localStorage.setItem("lwinStorage", JSON.stringify(returnData));

      return returnData;
    });
  }, []);

  const onExporting = React.useCallback(async () => {
    setState((prev) => {
      return {
        ...prev,
        is_exporting: true,
      };
    });

    const scripts = document.querySelectorAll("script");
    const preloadStyles = document.querySelectorAll<HTMLAnchorElement>(
      "link[rel='preload']"
    );
    const styles = document.querySelectorAll<HTMLAnchorElement>(
      "link[rel='stylesheet']"
    );

    const allScripts = [];
    for (let i = 0; i < scripts.length; i++) {
      allScripts[i] = scripts[i];
    }

    const allPreloadStyles = [];
    for (let i = 0; i < preloadStyles.length; i++) {
      allPreloadStyles[i] = preloadStyles[i];
    }

    const allStyles = [];
    for (let i = 0; i < styles.length; i++) {
      allStyles[i] = styles[i];
    }

    const allSrcs = allScripts
      .filter((item) => !!item.src)
      .map((item) => item.src);
    const wrapScript = await Promise.all(allSrcs.map((src) => axios.get(src)));
    const scriptTags = wrapScript.map(
      (src) => `<script>\n${src.data}\n</script>`
    );

    const allPreloadHrefs = allPreloadStyles
      .filter((item) => !!item?.href)
      .map((item) => item?.href);
    const wrapPreloadHrefs = await Promise.all(
      allPreloadHrefs.map((src) => axios.get(src))
    );
    const allPreloadStyleTags = wrapPreloadHrefs.map(
      (src) => `<style>\n${src.data}\n</style>`
    );

    const allStylesSrcs = allPreloadStyles
      .filter((item) => !!item?.href && item?.href?.startsWith("/_next"))
      .map((item) => item?.href);
    const wrapStyles = await Promise.all(
      allStylesSrcs.map((src) => axios.get(src))
    );
    const allStyleTags = wrapStyles.map(
      (src) => `<style>\n${src.data}\n</style>`
    );
    console.log(allStyleTags);

    const innerHTML = document.getElementById("__next")?.innerHTML;

    const htmlHeader = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width"/>
        <meta charSet="utf-8"/>
        <title>My Profile</title>
        <meta name="description" content="Generated by create next app"/>
        <link rel="icon" href="/favicon.ico"/>
        <link rel="stylesheet" data-href="https://fonts.googleapis.com/css2?family=Righteous&amp;family=Roboto&amp;display=swap" data-optimized-fonts="true"/>
        <meta name="next-head-count" content="6"/>
        ${allPreloadStyleTags.join("\n")}
        ${allStyleTags.join("\n")}
        <noscript data-n-css=""></noscript>
      
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Righteous&family=Roboto&display=swap"/>
      </head>
      <body>
        <script id="__LWIN_DATA__" type="application/json">${JSON.stringify(
          state
        )}</script>
        <div id="__next">${innerHTML}</div>
        <script id="__NEXT_DATA__" type="application/json">{"props":{"pageProps":{}},"page":"/","query":{},"buildId":"3bJy098RG5zX3HP-hLuRC","nextExport":true,"autoExport":true,"isFallback":false,"scriptLoader":[]}</script>
        ${scriptTags.join("\n")}
      </body>
    </html>
   `;

    let htmlContent = [htmlHeader];
    let bl = new Blob(htmlContent, { type: "text/html" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(bl);
    a.download = "Your_Profile.html";
    a.hidden = true;
    document.body.appendChild(a);
    a.innerHTML =
      "something random - nobody will see this, it doesn't matter what you put here";
    a.click();
    a.remove();

    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        is_exporting: false,
      }));
    }, 3000);
  }, [state]);

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
        setEditingSection,
        setClearSection,
        onExporting,
      }}
    >
      {children}
    </AppCtx.Provider>
  );
};

export const useAppContext = () => React.useContext(AppCtx);
