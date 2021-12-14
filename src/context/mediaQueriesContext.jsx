import React from "react";
import { useMediaQuery } from "react-responsive";

const MediaQueriesContext = React.createContext({});
const MediaQueriesProvider = ({ children }) => {
  const isMobile = useMediaQuery({ query: "(min-width: 320px)" });
  const isMobileLandscape = useMediaQuery({ query: "(min-width: 480px)" });
  const isTablet = useMediaQuery({ query: "(min-width: 740px)" });
  const isLaptop = useMediaQuery({ query: "(min-width: 968px)" });
  const isDesktop = useMediaQuery({ query: "(min-width: 1280px)" });
  const isWide = useMediaQuery({ query: "(min-width: 1600px)" });
  const isLandscape = useMediaQuery({ query: "(orientation: landscape)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  return (
    <MediaQueriesContext.Provider
      value={{
        isMobile,
        isMobileLandscape,
        isTablet,
        isLaptop,
        isDesktop,
        isWide,
        isLandscape,
        isPortrait,
        isRetina,
      }}
    >
      {children}
    </MediaQueriesContext.Provider>
  );
};

export { MediaQueriesContext, MediaQueriesProvider };
