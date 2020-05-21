import { upload } from 'skynet-js';

export const siaUrl = 'https://siasky.net';

const onUploadProgress = (progress, { loaded, total }) => {
  console.info(`Progress ${Math.round(progress * 100)}%`);
};

export const uploadToSkynet = async (file) => {
  try {
    const { skylink } = await upload(siaUrl, file, { onUploadProgress });
    return skylink;
  } catch (error) {}
};
