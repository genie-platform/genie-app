import ApolloClient from 'apollo-boost';

import { config } from '../config/config';

export const client = new ApolloClient(config.graph);
