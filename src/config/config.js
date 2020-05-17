const prod = {
  backend: {
    url: 'https://api.thegenie.xyz/api/v1',
  },
  googleAuth: {
    clientId:
      '1045886499834-t0vrjhlq8ep534njprdp8k80jl4iqdra.apps.googleusercontent.com',
  },
  network: {
    addresses: {
      fundingFactory: '0xfd99ba75A8515FD8E277b76F36719bA949Cb765F',
      Dai: '0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa',
      cDai: '0xe7bc397dbd069fc7d0109c0636d06888bb50668c',
    },
    kovanProvider:
      'https://kovan.infura.io/v3/06b97e4e91db4a059c3060357b884a54',
  },
  graph: {
    uri:
      'https://api.thegraph.com/subgraphs/id/QmXDQkcowPCiJe8CMePx1DCJRP8Y9MrGTk73xWVHYYtrzK',
  },
  wallets: {
    portisId: 'ae18109e-f2e1-4ee7-ace7-f7f14cb58bce',
  },
};

const dev = {
  backend: {
    url: 'http://localhost:3000/api/v1',
  },
  googleAuth: {
    clientId:
      '1045886499834-t0vrjhlq8ep534njprdp8k80jl4iqdra.apps.googleusercontent.com',
  },
  network: {
    addresses: {
      fundingFactory: '0xfd99ba75A8515FD8E277b76F36719bA949Cb765F',
      Dai: '0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa',
      cDai: '0xe7bc397dbd069fc7d0109c0636d06888bb50668c',
    },
    kovanProvider:
      'https://kovan.infura.io/v3/06b97e4e91db4a059c3060357b884a54',
  },
  graph: {
    uri:
      'https://api.thegraph.com/subgraphs/id/QmXDQkcowPCiJe8CMePx1DCJRP8Y9MrGTk73xWVHYYtrzK',
  },
  wallets: {
    portisId: 'ae18109e-f2e1-4ee7-ace7-f7f14cb58bce',
  },
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
