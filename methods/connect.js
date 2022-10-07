const { getContractInstance, getErrorMessage } = require("./general");

const call = async (contract, method, params = [], options, success, error) => {
  if (!(success || error)) {
    try {
      return await getContractInstance(contract)
        .methods[method](...params)
        .call(options);
    } catch (err) {
      err.message = getErrorMessage(err);
      throw err;
    }
  } else {
    return getContractInstance(contract)
      .methods[method](...params)
      .call(options)
      .then((res) => {
        if (success) success(res);
      })
      .catch((err) => {
        err.message = getErrorMessage(err);
        if (error) error(err);
      });
  }
};

const transaction = async (contract, method, params = [], sender, options, handleError) => {
  try {
    const contractInstance = getContractInstance(contract);
    await call(contractInstance, method, params, { from: sender, ...options });
    return contractInstance.methods[method](...params).send({ from: sender, ...options });
  } catch (err) {
    if (handleError) handleError(err);
    throw err;
  }
};

const latestEvents = async (contract, event, options, func) => {
  return getContractInstance(contract).events[event]({ fromBlock: "latest", ...options }, func);
};

module.exports = {
  call,
  transaction,
  latestEvents,
};
