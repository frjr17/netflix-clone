import axios from "axios";
import disneyVideos from "../data/disney.json";
import landscapesVideos from "../data/landscapes.json";
import popularVideos from "../data/popular.json";
import productivityVideos from "../data/productivity.json";
import travelVideos from "../data/travel.json";
const API_KEY = process.env.YOUTUBE_API_KEY;

// Define a type for a single search result item
type YoutubeSearchResultItem = {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  };
};

// Define a type for the entire search results object
type YoutubeSearchResult = {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YoutubeSearchResultItem[];
};

/**
 * Type for a single video object.
 * @typedef {object} VideoObject
 * @property {string} title - The title of the video.
 * @property {string} description - The description of the video.
 * @property {string} imgUrl - The URL of the video thumbnail image.
 * @property {string} id - The ID of the video.
 */
export type VideoObject = {
  title: string;
  description: string;
  imgUrl: string;
  id: string;
};

export type YoutubeVideo = {
  kind: "youtube#video";
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: { url: string; width: number; height: number };
      medium: { url: string; width: number; height: number };
      high: { url: string; width: number; height: number };
      standard: { url: string; width: number; height: number };
      maxres: { url: string; width: number; height: number };
    };
    channelTitle: string;
    tags: string[];
    categoryId: string;
    liveBroadcastContent: "upcoming" | "live" | "none";
    localized: {
      title: string;
      description: string;
    };
    defaultAudioLanguage: string;
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    favoriteCount: string;
    commentCount: string;
  };
};

export const devVideos = {
  disneyVideos,
  landscapesVideos,
  popularVideos,
  productivityVideos,
  travelVideos,
};

/**
 * Asynchronous function that retrieves a video from YouTube by ID
 * @function
 * @async
 * @param {string} videoId - The ID of the video to retrieve
 * @returns {Promise<YoutubeVideo>} A promise that resolves to a YoutubeVideo object
 */
export const getVideoById = async (videoId: string) => {
  const { data } = await axios.get(
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&type=video&maxResults=1&id=${videoId}&key=${API_KEY}`
  );
  const video = data.items[0];
  return video as YoutubeVideo;
};

/**
 * Asynchronous function that retrieves videos from YouTube
 * @function
 * @async
 * @param {(keyof typeof devVideos | string)} searchQuery - The search query to use to search for videos
 * @param {boolean} isMostPopular - Optional boolean flag to search for most popular videos
 * @returns {Promise<VideoObject[]>} A promise that resolves to an array of VideoObject objects
 */
export const getVideos = async (
  searchQuery: keyof typeof devVideos | string,
  isMostPopular: boolean = false,
  devSearchQuery: keyof typeof devVideos
) => {
  let videos = devVideos[
    devSearchQuery as keyof typeof devVideos
  ] as YoutubeSearchResult; // Initialize the videos variable with data from the local JSON file
  try {
    if (process.env.NODE_ENV === "production") {
      // If running in production, fetch data from the YouTube API
      const { data } = await axios.get<YoutubeSearchResult>(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&type=video&q=${searchQuery}&key=${API_KEY}${
          isMostPopular ? "&chart=mostPopular" : ""
        }`
      );
      videos = data;
    }

    // Map the search result items to a simplified video object
    return videos.items.map((item: YoutubeSearchResultItem) => {
      return {
        title: item.snippet.title,
        description: item.snippet.description,
        imgUrl:
          item.snippet.thumbnails.high.url ||
          item.snippet.thumbnails.default.url,
        id: item.id.videoId,
      };
    }) as VideoObject[];
  } catch (error) {
    console.error("Something went wrong with video library", error);
    videos = devVideos[
      devSearchQuery as keyof typeof devVideos
    ] as YoutubeSearchResult; // Initialize the videos variable with data from the local JSON file
  }

  // Map the search result items to a simplified video object
  return videos.items.map((item: YoutubeSearchResultItem) => {
    return {
      title: item.snippet.title,
      description: item.snippet.description,
      imgUrl:
        item.snippet.thumbnails.high.url || item.snippet.thumbnails.default.url,
      id: item.id.videoId,
    };
  });
};

type VideoCategory =
  | "disney"
  | "productivity"
  | "travel"
  | "landscapes"
  | "popular";

/**
 * Asynchronous function that retrieves all videos from various categories
 * @function
 * @async
 * @returns {Promise<{[Category in VideoCategory]: VideoObject[]; }>}
 * A promise that resolves to an object containing arrays of VideoObject objects for each category
 */
export const getAllVideos: () => Promise<{
  // eslint-disable-next-line no-unused-vars
  [Category in VideoCategory]: VideoObject[];
}> = async () => {
  return {
    disney: await getVideos("disney trailers HD", false, "disneyVideos"),

    productivity: await getVideos(
      "productivity HD",
      false,
      "productivityVideos"
    ),
    travel: await getVideos("travel HD", false, "travelVideos"),
    landscapes: await getVideos("landscapes HD", false, "landscapesVideos"),
    popular: await getVideos("", true, "popularVideos"),
  };
};
