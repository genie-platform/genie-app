import axios from 'axios';
const siaUrl = 'https://siasky.net/skynet/skyfile';

export const uploadToSkynet = async (file) => {
  let skyLink = '';

  try {
    let response = await axios.post(siaUrl, file);

    console.log(response);
    skyLink = await response.data;
  } catch (error) {
    console.log(error);
  }

  return skyLink;
};
