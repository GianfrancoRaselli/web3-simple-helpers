const Web3 = require("web3");
const axios = require("axios");

const getContractInstance = (contract) => {
  if (contract.provider && contract.abi && contract.address)
    return new Web3(contract.provider).eth.Contract(contract.abi, contract.address);
  return contract;
};

const getErrorMessage = (err) => {
  const endIndex = err.message.search("{");
  let message = err.message;
  if (endIndex >= 0) message = err.message.substring(0, endIndex);
  return message.charAt(0).toUpperCase() + message.slice(1);
};

const getSplitAddress = (address) => {
  let splitAddress = "";

  for (let i = 0; i < 4; i++) {
    splitAddress += address.charAt(i);
  }
  splitAddress += "...";
  for (let i = address.length - 4; i < address.length; i++) {
    splitAddress += address.charAt(i);
  }

  return splitAddress;
};

const convertEthPrice = async (currency) => {
  return (await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=${currency}`)).data[currency];
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
  getSplitAddress,
  convertEthPrice,
  fromUnixTimestampToDate,
  fromDateToUnixTimestamp,
};
