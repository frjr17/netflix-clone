import State, { IStateProps } from "..";
import { VideoObject } from "../../videos";
import * as forms from "./forms";
import * as functions from "./functions";

const initialState: {
  disney: VideoObject[];
  productivity: VideoObject[];
  travel: VideoObject[];
  landscapes: VideoObject[];
  popular: VideoObject[];
} = {
  disney: [],
  productivity: [],
  travel: [],
  landscapes: [],
  popular: [],
};

type TInitialState = typeof initialState;
type TFunctions = typeof functions;
type TForms = typeof forms;

const stateProps: IStateProps<TInitialState, TFunctions, TForms> = {
  forms,
  functions,
  initialState,
};

export const useVideosState = new State<TInitialState, TFunctions, TForms>(
  stateProps
).state;
