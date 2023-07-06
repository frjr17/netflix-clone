import { useVideosState } from ".";
import { getAllVideos } from "../../videos";

export const getAll = async () => {
  const videosState = useVideosState;
  videosState.setState({ isFetching: true });
  const videos = await getAllVideos();

  videosState.setState({ ...videos, isFetching: false });
  return videos;
};
