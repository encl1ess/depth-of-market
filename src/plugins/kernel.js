import {eventBus} from './eventBus';
import {sdk} from './sdk';

export default {
    install: (app) => {
        app.config.globalProperties.eventBus = eventBus
        app.config.globalProperties.sdk = sdk
    },
  };