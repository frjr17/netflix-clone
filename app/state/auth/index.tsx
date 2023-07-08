import State, { IStateProps } from "..";
import * as forms from "./forms";
import * as functions from "./functions";

const initialState = {
  email: "",
  token: "",
};

type TInitialState = typeof initialState;
type TFunctions = typeof functions;
type TForms = typeof forms;

const stateProps: IStateProps<TInitialState, TFunctions, TForms> = {
  forms,
  functions,
  initialState,
};

export const useAuthState = new State<TInitialState, TFunctions, TForms>(
  stateProps
).state;
