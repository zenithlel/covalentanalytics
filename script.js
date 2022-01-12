// Set your API key here
const APIKEY = 'onemillionwallets';

function getData() {
    // Get key HTML elements and reset table content
    const ul = document.getElementById('metadata');
    const tableRef = document.getElementById('tokenTable').getElementsByTagName('tbody')[0];
    tableRef.innerHTML = "";

    // Covalent API request setup
    const address = document.getElementById('address').value || 'demo.eth';
    const chainId = document.getElementById('chain').value || '1';
    const url = new URL(`https://api.covalenthq.com/v1/${chainId}/address/${address}/balances_v2`);
    url.search = new URLSearchParams({
        key: APIKEY
    })

    // Use Fetch API to get Covalent data
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
        let tokens = data.data.items;
        let balance;
        // Update wallet metadata
        ul.innerHTML = 
            `<li> Wallet address: ${data.data.address} </li>` +
            `<li> Last update: ${data.data.updated_at} </li>` +
            `<li> Fiat currency: ${data.data.quote_currency} </li>`;

        return tokens.map(function(token) { // Map through the results and for each run the code below
        if (token.contract_decimals > 0) {
            balance = parseInt(token.balance) / Math.pow(10, token.contract_decimals);
        } else {
            balance = parseInt(token.balance);
        }
        tableRef.insertRow().innerHTML = 
            `<td><img src=${token.logo_url} style=width:50px;height:50px;></td>` +
            `<td> ${token.contract_name} </td>` +
            `<td> ${token.contract_ticker_symbol} </td>` +
            `<td> ${balance.toFixed(4)} </td>` +
            `<td> $${parseFloat(token.quote).toFixed(2)} </td>` +
            `<td> ${token.type} </td>`;
        })
    })
}


