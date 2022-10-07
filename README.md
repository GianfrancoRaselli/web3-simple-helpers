# web3-simple-helpers
## Description
Basic methods that allow to interact with the Ethereum blockchain.
## Methods
### General
1. getContractInstance(contract)
2. getErrorMessage(err)
3. getSplitAddress(address)
4. async convertEthPrice(currency)
5. fromUnixTimestampToDate(unixTimestamp)
6. fromDateToUnixTimestamp(date)
### Connect
1. async call(contract, method, params = [], options, success, error)
2. async transaction(contract, method, params = [], sender, options, handleError)
3. async latestEvents(contract, event, options, func)