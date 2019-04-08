'use strict';

class Event {
  constructor(options = {}) {
    this.name = options.name;
  }

  async run(...args) {
    try {
      await this.run(...args);
    } catch (err) {
      if (err) { return this.client.logger.error(err); }
    }
  }
}

module.exports = Event;