const removeInitialUnderscore = (obj) => {
  for (let [key] of Object.entries(obj)) {
    if (key.charAt(0) === "_") {
      Object.defineProperty(obj, key.slice(1), Object.getOwnPropertyDescriptor(obj, key));
      delete obj[key];
    }
  }
};

module.exports = {
  removeInitialUnderscore,
};
