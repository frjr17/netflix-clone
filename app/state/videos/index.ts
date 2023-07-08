import State, { IStateProps } from "..";
import { VideoObject } from "../../lib/videos";
import * as forms from "./forms";
import * as functions from "./functions";
import dummyVideos from "./dummyVideos.json";
const initialState: {
  disney: VideoObject[];
  productivity: VideoObject[];
  travel: VideoObject[];
  landscapes: VideoObject[];
  popular: VideoObject[];
  isFetching: boolean;
} = {
  disney: dummyVideos,
  productivity: dummyVideos,
  travel: dummyVideos,
  landscapes: dummyVideos,
  popular: dummyVideos,
  isFetching: true,
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
