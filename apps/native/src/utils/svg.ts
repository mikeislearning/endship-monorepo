import { cssInterop } from "nativewind";
import Svg from "react-native-svg";

export const setupSvgStyling = () => {
  cssInterop(Svg, {
    className: {
      target: "style",
      nativeStyleToProp: {
        color: true,
        opacity: true,
        width: true,
        height: true,
        fill: true,
        stroke: true,
      },
    },
  });
};
