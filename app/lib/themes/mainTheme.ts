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
  }),
};

export const mainTheme: DeepPartial<Theme> = extendTheme({
  config,
  styles,
});
