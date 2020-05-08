export const getRandomCoverImage = () => {
  const NUMBER_OF_IMAGES = 10;
  const imageNumber = Math.ceil(Math.random() * NUMBER_OF_IMAGES);

  return `images/cover${imageNumber}.jpg`;
};

export const shortenAddress = (address) => {
  return (
    address.slice(0, 5) +
    '...' +
    address.slice(address.length - 5, address.length)
  );
};
