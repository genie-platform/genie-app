import { upload } from "skynet-js";

const siaUrl = 'https://siasky.net';

const onUploadProgress = (progress, { loaded, total }) => {
  console.info(`Progress ${Math.round(progress * 100)}%`);
};

export const uploadToSkynet = async (file) => {

  try {
    const { skylink } = await upload(siaUrl, file, { onUploadProgress });
    console.log(skylink)
    return skylink
  } catch (error) {
    console.log(error);
  }
};
