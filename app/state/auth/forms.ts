import { IForm } from "../form";

type loginFormInputs = {
  email: string;
};
export const loginForm: IForm<loginFormInputs> = {
  order: ["email"],
  form: {
    email: {
      label: "Email Address",
      isRequired: true,
      inputProps: {
        value: "",
      },
    },
  },
};
