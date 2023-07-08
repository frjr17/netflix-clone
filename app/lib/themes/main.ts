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
  // eslint-disable-next-line no-unused-vars
  global: (props: StyleFunctionProps) => { [name: string]: StyleProps | any };
} = {
  global: (props) => ({
    body: {
      background: props.colorMode === "dark" ? "black" : "white",
    },
    ".swiper": {
      width: "100%",
      overflowY: "visible !important",
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
