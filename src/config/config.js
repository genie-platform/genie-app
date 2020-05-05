const prod = {
  backend: {
    url: 'https://api.thegenie.xyz/api/v1',
  },
  googleAuth: {
    clientId:
      '1045886499834-7b69d9hv999m72mq111omrt06sqkadg5.apps.googleusercontent.com',
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
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
