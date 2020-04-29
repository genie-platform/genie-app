export const getRandomCoverImage = () => {
  const NUMBER_OF_IMAGES = 4;
  const imageNumber = Math.ceil(Math.random() * NUMBER_OF_IMAGES);

  return `images/cover${imageNumber}.jpg`;
};
