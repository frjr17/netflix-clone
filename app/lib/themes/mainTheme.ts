import {
  DeepPartial,
  extendTheme,
  StyleFunctionProps,
  StyleProps,
  Theme,
  ThemeConfig,
} from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
};

const styles: {
  global: (props: StyleFunctionProps) => { [name: string]: StyleProps };
} = {
  global: (props) => ({
    body: {
      background: props.colorMode === "dark" ? "black" : "white",
    },
    ".swiper": {
      width: "100%",
      "overflow-y": "visible !important",
    },
    ".swiper-slide": {
      width: "fit-content !important",
    },
  }),
};

export const mainTheme: DeepPartial<Theme> = extendTheme({
  config,
  styles,
});
