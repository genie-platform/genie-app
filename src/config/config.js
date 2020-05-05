const prod = {
  backend: {
    url: 'https://api.thegenie.xyz/api/v1',
  },
  googleAuth: {
    clientId:
      '409833050808-2v7o6msvqct84bae2s6n7501tfudj08f.apps.googleusercontent.com',
  },
};

const dev = {
  backend: {
    url: 'http://localhost:3000/api/v1',
  },
  googleAuth: {
    clientId:
      '409833050808-omel02bdcf5h2pvbmc7k1mg8l8okh9u0.apps.googleusercontent.com',
  },
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
