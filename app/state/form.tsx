import {
  FormControl,
  FormControlProps,
  FormErrorMessageProps,
  FormLabel,
  FormLabelProps,
  Input,
  InputProps,
} from "@chakra-ui/react";
import { ChangeEvent } from "react";
import React from "react";
import State from ".";

/** Interface for form error message object. */
export interface IFormErrorMessage {
  message: string;
  props: FormErrorMessageProps;
}

/** Interface for form input object. */
export interface IFormInput<T> {
  /** The order of the input fields. */
  order: string[];
  /** The form object. */
  form: TFormObject<T>;
}

/** Type that represents an input field's props. */
export type TInputProps = InputProps & { value: any };

export interface IFormControls {
  /** The label of the input field. */
  label: string;
  /** Whether the input field is required. */
  isRequired?: boolean;
  /** The input field's props. */
  inputProps: TInputProps;
  /** The form control's props. */
  controlProps?: FormControlProps;
  /** The form label's props. */
  labelProps?: FormLabelProps;
  /** The error messages associated with the input field. */
  errors?: IFormErrorMessage[];
}

/** Type that represents a form object. */
export type TFormObject<TForm = any> = {
  // eslint-disable-next-line no-unused-vars
  [key in keyof TForm]: IFormControls;
};

export interface IForm<T extends object> {
  order: (keyof T)[];
  form: Record<keyof T, IFormControls>;
}

export interface IUseForm<
  Forms extends Record<string, any> & Partial<IForm<any>>
> {
  form: Forms[keyof Forms]["form"];
  order: Forms[keyof Forms]["order"];
  // eslint-disable-next-line no-undef, no-unused-vars
  components: (props: TComponents) => JSX.Element[];
  // eslint-disable-next-line no-unused-vars
  values: { [k in keyof Forms[keyof Forms]["form"]]: any };
}

export type TComponents = {
  isLoading: boolean;
};

/**

Hook that creates a form with controlled inputs.
@template InitialState - A generic object representing the initial state of the form.
@template Functions - A generic object representing the functions of the form.
@template Forms - A generic object representing the form components.
@param {keyof Forms} formName - The name of the form to create.
@param {State<InitialState, Functions, Forms>["state"]} state - The state object of the form.
@returns {IUseForm<Forms>} - The form object that contains form, order, values, and components.
*/
export function useForm<
  InitialState extends object,
  Functions extends object,
  Forms extends Record<string, any> & Partial<IForm<any>>
>(
  formName: keyof Forms,
  state: State<InitialState, Functions, Forms>["state"]
): IUseForm<Forms> {
  // Get the form container from the state object.
  const formContainer = state.getState()[formName] as Forms[keyof Forms];
  const { form, order } = formContainer;
  /**
  
  Handles the change event of a form input.
  @param {keyof Forms[keyof Forms]["form"]} name - The name of the form input to handle.
  @returns {(event: ChangeEvent<HTMLInputElement>) => void} - The event handler function.
  */
  const handleChange = (name: keyof Forms[keyof Forms]["form"]) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      // Update the state object with the new value of the input.
      state.setState((oldState) => ({
        ...oldState,
        [formName]: {
          ...oldState[formName],
          form: {
            ...oldState[formName].form,
            [name]: {
              ...oldState[formName].form[name],
              inputProps: {
                ...oldState[formName].form[name].inputProps,
                value: event.target.value,
              },
            },
          },
        },
      }));
    };
  };
  // eslint-disable-next-line no-undef, no-unused-vars
  /**
  
  Returns the form components as an array of JSX elements.
  @param {TComponents} props - The props object.
  @returns {JSX.Element[]} - An array of JSX elements.
  */
  const components = (props: TComponents) =>
    order.map((name: keyof Forms[keyof Forms]["order"]) => {
      const formInput = form[name];
      return (
        <FormControl
          isDisabled={props.isLoading}
          key={name as string}
          {...formInput.controlProps}
        >
          <FormLabel {...formInput.labelProps}>{formInput.label}</FormLabel>
          <Input
            isDisabled={props.isLoading}
            bg={"white"}
            color={"black"}
            {...formInput.inputProps}
            onChange={handleChange(name)}
            value={formInput.inputProps.value || ""}
          />
        </FormControl>
      );
    });
  // eslint-disable-next-line no-unused-vars
  /**
  
  Returns an object that contains the values of the form inputs.
  @type {{ [key in keyof Forms[keyof Forms]["form"]]: any }}
  */
  // eslint-disable-next-line no-unused-vars
  const values = {} as { [key in keyof Forms[keyof Forms]["form"]]: any };
  for (let key in form) {
    values[key as keyof Forms[keyof Forms]["form"]] =
      state.getState()[formName]["form"][key].inputProps.value;
  }
  // Return the form object that contains form, order, values, and components.
  return { form, order, values, components };
}
