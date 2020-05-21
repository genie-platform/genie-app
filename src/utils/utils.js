const NUMBER_OF_IMAGES = 18;

export const getRandomCoverImage = () => {
  const imageNumber = Math.ceil(Math.random() * NUMBER_OF_IMAGES);

  return `/images/cover${imageNumber}.jpg`;
};

export const getImagesNameArray = () => {
  let arr = [...Array(NUMBER_OF_IMAGES + 1).keys()].splice(1); // creates array [1,2,...,NUMBER_OF_IMAGES]

  return arr.map((num) => `/images/cover${num}.jpg`);
};

export const getRandomGradient = () => {
  const arrayOfCoolGradients = [
    'linear-gradient(0deg, #08AEEA 0%, #2AF598 100%)',
    'linear-gradient(315deg, #0cbaba 0%, #380036 74%)',
    'linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%)',
    'linear-gradient(315deg, #6b0f1a 0%, #b91372 74%)',
    'linear-gradient(315deg, #045de9 0%, #09c6f9 74%)',
    'linear-gradient(315deg, #fc9842 0%, #fe5f75 74%)',
    'linear-gradient(180deg, #2af598 0%, #009efd 100%)',
    'linear-gradient(to top, #0ba360 0%, #3cba92 100%)',
    'linear-gradient(15deg, #13547a 0%, #80d0c7 100%)',
  ];

  return arrayOfCoolGradients[
    Math.floor(Math.random() * arrayOfCoolGradients.length)
  ];
};

export const shortenAddress = (address) => {
  return (
    address.slice(0, 4) +
    '...' +
    address.slice(address.length - 4, address.length)
  );
};

/**
 * Generate a token using the users and pool addresses
 * We need a token for a path of exile character as a proof of ownership
 * Token format is '_G' + last 4 letters of pool contract address + last 4 letters of user address
 * (notice we removed the numbers from the addresses because poe character names cant use numbers)
 * @param {String} address
 */
export const generateGenieToken = (address, poolAddress) => {
  const TOKEN_LEN = 4;

  // remove numbers for addresses
  let addressNoNums = address.replace(/[0-9]/g, '');
  let poolAddressNoNums = poolAddress.replace(/[0-9]/g, '');

  // get last 4 chars of each address
  addressNoNums = addressNoNums.slice(
    addressNoNums.length - TOKEN_LEN,
    addressNoNums.length
  );
  poolAddressNoNums = poolAddressNoNums.slice(
    poolAddressNoNums.length - TOKEN_LEN,
    poolAddressNoNums.length
  );

  return `_G${poolAddressNoNums}${addressNoNums}`;
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
