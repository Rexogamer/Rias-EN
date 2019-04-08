'use strict';

const Event = require('../structures/Event');

module.exports = class Error extends Event {
    constructor() { super({ name: 'error' }); }

    run(client, error) {
        if (!error) { return; }
            client.logger.error(error);
    }
};
