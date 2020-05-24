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
      fundingFactory: '0xD7cf78Bf8BDa369509f5B5c7C93364F04e7DcbC7',
      Dai: '0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa',
      cDai: '0xe7bc397dbd069fc7d0109c0636d06888bb50668c',
    },
    kovanProvider:
      'https://kovan.infura.io/v3/06b97e4e91db4a059c3060357b884a54',
    operator: '0x955725948ed2a46d1dacdb5d1328ff5bacbb3e83',
  },
  graph: {
    uri:
      'https://api.thegraph.com/subgraphs/name/genie-platform/genie-graph-v2',
  },
  wallets: {
    portisId: 'ae18109e-f2e1-4ee7-ace7-f7f14cb58bce',
  },
  oracles: {
    pathOfExile: {
      address: '0xAA1DC356dc4B18f30C347798FD5379F3D77ABC5b',
      jobId: '15e0f2e27513449eb9e575f47a8ec6f6',
    },
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
      fundingFactory: '0xD7cf78Bf8BDa369509f5B5c7C93364F04e7DcbC7',
      Dai: '0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa',
      cDai: '0xe7bc397dbd069fc7d0109c0636d06888bb50668c',
    },
    kovanProvider:
      'https://kovan.infura.io/v3/06b97e4e91db4a059c3060357b884a54',
    operator: '0xa79bd80f1a5c9faba2c03bbd1a36af61a32253a0',
  },
  graph: {
    uri:
      'https://api.thegraph.com/subgraphs/name/genie-platform/genie-graph-v2',
  },
  wallets: {
    portisId: 'ae18109e-f2e1-4ee7-ace7-f7f14cb58bce',
  },
  oracles: {
    pathOfExile: {
      address: '0xAA1DC356dc4B18f30C347798FD5379F3D77ABC5b',
      jobId: '15e0f2e27513449eb9e575f47a8ec6f6',
    },
  },
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
