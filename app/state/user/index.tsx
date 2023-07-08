import State, { IStateProps } from "..";
import * as forms from "./forms";
import * as functions from "./functions";

const initialState = {};

type TInitialState = typeof initialState;
type TFunctions = typeof functions;
type TForms = typeof forms;

const stateProps: IStateProps<TInitialState, TFunctions, TForms> = {
  forms,
  functions,
  initialState,
};

export const useUserState = new State<TInitialState, TFunctions, TForms>(
  stateProps
).state;
