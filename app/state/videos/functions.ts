import axios from "axios";
import { useVideosState } from ".";
import { VideoObject } from "@/app/lib/videos";

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

export const orderAll = (videos: TTest) => {
  return [
    ["Most Popular", videos.popular],
    ["Disney", videos.disney],
    ["Productivity", videos.productivity],
    ["Travel", videos.travel],
    ["Landscapes", videos.landscapes],
  ];
};
