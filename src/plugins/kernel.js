import {eventBus} from './eventBus';

export default {
    install: (app) => {
        app.config.globalProperties.eventBus = eventBus
    },
  };