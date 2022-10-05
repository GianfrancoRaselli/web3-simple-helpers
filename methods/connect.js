const { getErrorMessage } = require("./general");

const call = async (contractInstance, method, params = [], options, success, error) => {
  if (!(success || error)) {
    try {
      return await contractInstance.methods[method](...params).call(options);
    } catch (err) {
      err.message = getErrorMessage(err);
      throw err;
    }
  } else {
    return contractInstance.methods[method](...params)
      .call(options)
      .then(success)
      .catch(error);
  }
};

const transaction = async (contractInstance, method, params = [], sender, options, handleError) => {
  try {
    await call(contractInstance, method, params, { from: sender, ...options });
    return contractInstance.methods[method](...params).send({ from: sender, ...options });
  } catch (err) {
    if (handleError) handleError(err);
    throw err;
  }
};

const latestEvents = async (contractInstance, event, options, func) => {
  return contractInstance.events[event]({ fromBlock: "latest", ...options }, func);
};

module.exports = {
  call,
  transaction,
  latestEvents,
};
