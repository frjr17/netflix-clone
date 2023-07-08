import axios from "axios";
import { useVideosState } from ".";
import { VideoObject, YoutubeVideo } from "@/app/lib/videos";

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

/*The properties of a video.
@interface
@property {string} title - The title of the video.
@property {string} publishTime - The publish time of the video.
@property {string} description - The description of the video.
@property {string} channelTitle - The title of the video's channel.
@property {string} imgUrl - The URL of the video's image.
@property {number} viewCount - The number of views of the video.
*/
export interface VideoProps {
  title: string;
  publishTime: string;
  description: string;
  channelTitle: string;
  imgUrl: string;
  viewCount: number;
}

export const getVideo = async (videoId: string) => {
  const videosState = useVideosState;
  videosState.setState({ isFetching: true });

  const response = await axios<YoutubeVideo>({
    method: "GET",
    url: "/api/getVideoById",
    params: { videoId },
  });
  const videoData = response.data;

  const video: VideoProps = {
    title: videoData.snippet.title,
    publishTime: videoData.snippet.publishedAt,
    description: videoData.snippet.description,
    channelTitle: videoData.snippet.channelTitle,
    imgUrl: videoData.snippet.thumbnails.high.url,
    viewCount: (videoData.statistics.viewCount || 0) as number,
  };
  videosState.setState({ currentVideo: video, isFetching: false });
  return video;
};
