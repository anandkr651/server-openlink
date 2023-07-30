import getMetaData from "metadata-scraper";

export const metaData = async (url) => {
  const data = await getMetaData(url);
  return data;
};
