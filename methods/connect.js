const { removeInitialUnderscore } = require("./helpers");
const { getContractInstance, getErrorMessage } = require("./general");

const call = async (contract, method, params = [], options, success, error) => {
  if (!(success || error)) {
    try {
      const res = await getContractInstance(contract)
        .methods[method](...params)
        .call(options);
      if (typeof res === "object") removeInitialUnderscore(res);
      return res;
    } catch (err) {
      err.message = getErrorMessage(err);
      throw err;
    }
  } else {
    return getContractInstance(contract)
      .methods[method](...params)
      .call(options)
      .then(async (res) => {
        if (success) {
          if (typeof res === "object") removeInitialUnderscore(res);
          await success(res);
        }
      })
      .catch(async (err) => {
        err.message = getErrorMessage(err);
        if (error) await error(err);
      });
  }
};

const transaction = async (
  contract,
  method,
  params = [],
  sender,
  options,
  handleError
) => {
  try {
    const contractInstance = getContractInstance(contract);
    await call(contractInstance, method, params, { from: sender, ...options });
    return contractInstance.methods[method](...params).send({
      from: sender,
      ...options,
    });
  } catch (err) {
    if (handleError) await handleError(err);
    throw err;
  }
};

const pastEvents = async (contract, event, options, func) => {
  return getContractInstance(contract)
    .getPastEvents(event, { toBlock: "latest", ...options })
    .then(async (res) => {
      await func(res);
    });
};

const latestEvents = async (contract, event, options, func) => {
  return getContractInstance(contract).events[event](
    { fromBlock: "latest", ...options },
    func
  );
};

module.exports = {
  call,
  transaction,
  pastEvents,
  latestEvents,
};
