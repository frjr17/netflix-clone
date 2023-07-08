import axios from "axios";
import { useVideosState } from ".";
import { VideoObject, getAllVideos } from "../../videos";

type TTest = {
  disney: VideoObject[];
  productivity: VideoObject[];
  travel: VideoObject[];
  landscapes: VideoObject[];
  popular: VideoObject[];
};
export const getAll = async () => {
  const videosState = useVideosState;
  videosState.setState({ isFetching: true });

  const response = await axios<TTest>({
    method: "GET",
    url: "/api/getVideos",
  });

  videosState.setState({ ...response.data, isFetching: false });
  return response.data;
};
