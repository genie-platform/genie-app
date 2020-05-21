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
      fundingFactory: '0x28b541f3942e207fB25CEB8b74D8Cdef33Cb17f7',
      Dai: '0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa',
      cDai: '0xe7bc397dbd069fc7d0109c0636d06888bb50668c',
    },
    kovanProvider:
      'https://kovan.infura.io/v3/06b97e4e91db4a059c3060357b884a54',
  },
  graph: {
    uri:
      'https://api.thegraph.com/subgraphs/name/genie-platform/genie-graph-v2',
  },
  wallets: {
    portisId: 'ae18109e-f2e1-4ee7-ace7-f7f14cb58bce',
  },
  oracles: {
    pathOfExile: { url: '', path: '' },
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
      fundingFactory: '0x28b541f3942e207fB25CEB8b74D8Cdef33Cb17f7',
      Dai: '0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa',
      cDai: '0xe7bc397dbd069fc7d0109c0636d06888bb50668c',
    },
    kovanProvider:
      'https://kovan.infura.io/v3/06b97e4e91db4a059c3060357b884a54',
  },
  graph: {
    uri:
      'https://api.thegraph.com/subgraphs/name/genie-platform/genie-graph-v2',
  },
  wallets: {
    portisId: 'ae18109e-f2e1-4ee7-ace7-f7f14cb58bce',
  },
  oracles: {
    pathOfExile: { url: '', path: '' },
  },
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
