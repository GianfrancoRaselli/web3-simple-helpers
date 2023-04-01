const Web3 = require("web3");
const axios = require("axios");

const getContractInstance = (contract) => {
  if (contract.provider && contract.abi && contract.address) {
    const web3 = new Web3(contract.provider);
    return new web3.eth.Contract(contract.abi, contract.address);
  }
  return contract;
};

const getErrorMessage = (err) => {
  try {
    return err.message
      .split("VM Exception while processing transaction: revert ")[1]
      .split('",')[0];
  } catch {
    return "Error al ejecutar la transacción";
  }
};

const compareAddresses = (address1, address2) => {
  return (
    address1 &&
    address2 &&
    typeof address1 === "string" &&
    typeof address2 === "string" &&
    address1.toLowerCase() === address2.toLowerCase()
  );
};

const getSplitAddress = (address) => {
  if (address) {
    let splitAddress = "";

    for (let i = 0; i < 4; i++) {
      splitAddress += address.charAt(i);
    }
    splitAddress += "...";
    for (let i = address.length - 4; i < address.length; i++) {
      splitAddress += address.charAt(i);
    }

    return splitAddress;
  }
  return "";
};

const convertEthPrice = async (currency) => {
  return (
    await axios.get(
      `https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=${currency}`
    )
  ).data[currency];
};

const fromUnixTimestampToDate = (unixTimestamp) => {
  return new Date(unixTimestamp * 1000);
};

const fromDateToUnixTimestamp = (date) => {
  return date.getTime() / 1000;
};

module.exports = {
  getContractInstance,
  getErrorMessage,
  compareAddresses,
  getSplitAddress,
  convertEthPrice,
  fromUnixTimestampToDate,
  fromDateToUnixTimestamp,
};
