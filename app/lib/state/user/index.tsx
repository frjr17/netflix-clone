import State, { IStateProps } from "..";
import * as functions from "./functions";

const initialState = {
  email: "",
  imageUrl: "",
};

type TInitialState = typeof initialState;
type TFunctions = typeof functions;

const stateProps: IStateProps<TInitialState, TFunctions, any> = {
  functions,
  initialState,
  forms: {},
};

export const useUserState = new State<TInitialState, TFunctions, any>(
  stateProps
).state;
