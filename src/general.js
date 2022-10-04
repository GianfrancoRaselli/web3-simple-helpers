const getErrorMessage = (err) => {
  const endIndex = err.message.search("{");
  let message = err.message;
  if (endIndex >= 0) message = err.message.substring(0, endIndex);
  return message.charAt(0).toUpperCase() + message.slice(1);
}

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

modules.exports = {
  getErrorMessage,
  getSplitAddress,
};
