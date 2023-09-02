import {
  SystemStyleFunction,
  ThemeConfig,
  extendTheme,
} from "@chakra-ui/react";

const globalStyles: SystemStyleFunction = (props) => ({
  body: {
    background: props.colorMode === "dark" ? "black" : "white",
    color: props.colorMode === "dark" ? "white" : "black",
  },
});

const config: ThemeConfig = {
  initialColorMode: "dark",
};

export default extendTheme({
  config,
  styles: { global: globalStyles },
});
