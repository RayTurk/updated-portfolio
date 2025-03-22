import { useEffect, useMemo, useState } from "react";
// Remove the import for ThemeContext
import { Cloud, fetchSimpleIcons, renderSimpleIcon } from "react-icon-cloud";

export const cloudProps = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingTop: 40,
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#000",
    maxSpeed: 0.04,
    minSpeed: 0.02,
  },
};

export const renderCustomIcon = (icon, darkMode = true) => {
  // Just use a static theme value (darkMode)
  const bgHex = darkMode ? "#080510" : "#f3f2ef";
  const fallbackHex = darkMode ? "#ffffff" : "#6e6e73";
  const minContrastRatio = darkMode ? 2 : 1.2;

  return renderSimpleIcon({
    icon,
    bgHex,
    fallbackHex,
    minContrastRatio,
    size: 42,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e) => e.preventDefault(),
    },
  });
};

export default function IconCloud({
  iconSlugs = [],
  imageArray,
}) {
  const [data, setData] = useState(null);
  // Just use a static darkMode value
  const darkMode = true;

  useEffect(() => {
    if (iconSlugs.length > 0) {
      fetchSimpleIcons({ slugs: iconSlugs }).then(setData);
    }
  }, [iconSlugs]);

  const renderedIcons = useMemo(() => {
    if (!data) return null;

    return Object.values(data.simpleIcons).map((icon) =>
      renderCustomIcon(icon, darkMode)
    );
  }, [data, darkMode]);

  return (
    <Cloud {...cloudProps}>
      <>
        <>{renderedIcons}</>
        {imageArray &&
          imageArray.length > 0 &&
          imageArray.map((image, index) => {
            return (
              <a key={index} href="#" onClick={(e) => e.preventDefault()}>
                <img height="42" width="42" alt="A globe" src={image} />
              </a>
            );
          })}
      </>
    </Cloud>
  );
}