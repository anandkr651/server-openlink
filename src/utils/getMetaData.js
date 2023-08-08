import getMetaData from "metadata-scraper";

export const metaData = async (url) => {
  try {
    const data = await getMetaData(url);
    return data;
  } catch (error) {
    return { title: "", url: "", image: "" };
  }
};
