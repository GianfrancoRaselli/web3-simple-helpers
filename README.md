# web3-simple-helpers

## Description

Basic methods that allow to interact with the Ethereum blockchain.

## Methods

### General

1. getContractInstance(contract)
2. getErrorMessage(err)
3. compareAddresses(address1, address2)
4. getSplitAddress(address)
5. async convertEthPrice(currency)
6. fromUnixTimestampToDate(unixTimestamp)
7. fromDateToUnixTimestamp(date)

### Connect

1. async call(contract, method, params = [], options, success, error)
2. async transaction(contract, method, params = [], sender, options, handleError)
3. async pastEvents(contract, event, options, func)
4. async latestEvents(contract, event, options, func)
