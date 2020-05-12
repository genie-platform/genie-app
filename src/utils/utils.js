export const getRandomCoverImage = () => {
  const NUMBER_OF_IMAGES = 10;
  const imageNumber = Math.ceil(Math.random() * NUMBER_OF_IMAGES);

  return `images/cover${imageNumber}.jpg`;
};

export const shortenAddress = (address) => {
  return (
    address.slice(0, 4) +
    '...' +
    address.slice(address.length - 4, address.length)
  );
};

/**
 * Changes the address to lowercase.
 *
 * An address with uppercase letters is checksummed.
 * Sometimes using the checksummed address can cause issues, therefore we lowercase it.
 *
 * more on checksums here: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-55.md
 * @param {String} address - etheruem address
 */
export const lowercaseAddress = (address) => {
  return address.toLowerCase();
};
