const prod = {
  backend: {
    url: 'https://api.thegenie.xyz/api/v1',
  },
  googleAuth: {
    clientId:
      '1045886499834-t0vrjhlq8ep534njprdp8k80jl4iqdra.apps.googleusercontent.com',
  },
  contracts: {
    addresses: {
      fundingFactory: '0xfd99ba75A8515FD8E277b76F36719bA949Cb765F',
      cDai: '0xe7bc397dbd069fc7d0109c0636d06888bb50668c',
    },
  },
};

const dev = {
  backend: {
    url: 'http://localhost:3000/api/v1',
  },
  googleAuth: {
    clientId:
      '1045886499834-ib4des9sbo7l687rtqoifq2b5l40ec8b.apps.googleusercontent.com',
  },
  network: {
    addresses: {
      fundingFactory: '0xfd99ba75A8515FD8E277b76F36719bA949Cb765F',
      cDai: '0xe7bc397dbd069fc7d0109c0636d06888bb50668c',
    },
  },
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
