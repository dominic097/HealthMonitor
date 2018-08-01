const model = require('./scheduler.model');

// the Lock object itself
class Lock {
  constructor(name, opts) {
    const self = this;
    const opt = opts || {};
    if (!name) {
      throw new Error('missing_name');
    }
    self.name = name;
    self.timeAquired = null;
    self.lockId = null;
    self.timeout = opt.timeout || 60 * 1000; // default: 60 seconds
  }

  acquire = (callback) => {
    const self = this;

    if (self.lockId) {
      return callback(new Error('lock_already_aquired'));
    }

    self.timeAquired = Date.now();

    // firstly, remove any locks if they have timed out
    const q1 = {
      name: self.name,
      expire: { $lt: self.timeAquired },
    };

    model.findOneAndRemove(q1, (err) => {
      if (err) return callback(err);

      // now, try and insert a new lock
      const doc = {
        name: self.name,
        expire: self.timeAquired + self.timeout,
        inserted: self.timeAquired,
      };

      model.create(doc, (error, lock) => {
        if (error) {
          if (error.code === 11000) {
            // there is currently a valid lock in the datastore
            return callback(null, false);
          }
          // don't know what this error is
          return callback(error);
        }

        self.lockId = lock.id;
        return callback(null, true);
      });
    });
  }

}

Lock.prototype.acquire = (callback) => {
  const self = this;

  if (self.lockId) {
    return callback(new Error('lock_already_aquired'));
  }

  self.timeAquired = Date.now();

  // firstly, remove any locks if they have timed out
  const q1 = {
    name: self.name,
    expire: { $lt: self.timeAquired },
  };

  model.findOneAndRemove(q1, (err) => {
    if (err) return callback(err);

    // now, try and insert a new lock
    const doc = {
      name: self.name,
      expire: self.timeAquired + self.timeout,
      inserted: self.timeAquired,
    };

    model.create(doc, (error, lock) => {
      if (error) {
        if (error.code === 11000) {
          // there is currently a valid lock in the datastore
          return callback(null, false);
        }
        // don't know what this error is
        return callback(error);
      }

      self.lockId = lock.id;
      return callback(null, true);
    });
  });
};

Lock.prototype.release = (callback) => {
  const self = this;

  if (!self.lockId) {
    return callback(new Error('releasing_not_aquired_lock'));
  }

  const now = Date.now();

  // remove this lock if it is still valid
  const q1 = {
    _id: self.lockId,
    expire: { $gt: now },
  };

  model.findOneAndRemove(q1, (err, oldLock) => {
    if (err) return callback(err);

    self.lockId = null;
    self.timeAquired = null;

    if (!oldLock) {
      // there was nothing to unlock
      return callback(null, true);
    }

    // unlocked correctly
    return callback(null, false);
  });
};

module.exports = (name, opts) => {
  return new Lock(name, opts);
};
