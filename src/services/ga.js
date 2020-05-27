import ReactGA from 'react-ga'
import { config } from '../config/config';

ReactGA.initialize(config.reactGA.trackingId, config.reactGA.gaOptions)

export default ReactGA
