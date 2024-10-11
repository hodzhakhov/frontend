const apiKey = 'ead55db0a6d9a584a0284baeed0f8b9599360505af7c4bdda3c197da4067';

const apiUrl = 'https://api.cryptorank.io/v1/currencies';
const coinSymbols = ['USDT', 'BTC', 'TON'];

async function fetchCoinPrices() {
    try {
        const response = await fetch(`${ apiUrl }?symbols=${ coinSymbols.join(',') }&api_key=${ apiKey }`, {
            method: 'GET',
        });

        const data = await response.json();

        if (response.ok) {
            let usdtPrice = 0;
            let btcPrice = 0;
            let tonPrice = 0;

            for (let coin of data.data) {
                if (coin.name == "Tether") {
                    usdtPrice = coin.values.USD.price;
                } else if (coin.name == "Bitcoin") {
                    btcPrice = coin.values.USD.price;
                } else if (coin.name == "Toncoin") {
                    tonPrice = coin.values.USD.price;
                }
            }

            console.log(data);
            updatePrices({ usdtPrice, btcPrice, tonPrice });
        } else {
            console.error('Ошибка при получении данных:', data.status.error_message);
        }
    } catch (error) {
        console.error('Ошибка запроса к API CryptoTank:', error);
    }
}

function getCoinAmount(coin) {
    const coinText = document.getElementById(coin).innerText;
    const coinAmount = parseFloat(coinText);
    return isNaN(coinAmount) ? 0 : coinAmount;
}

function updatePrices(prices) {
    const usdtAmount = getCoinAmount('usdt-amount');
    const btcAmount = getCoinAmount('btc-amount');
    const tonAmount = getCoinAmount('ton-amount');

    const usdtValue = prices.usdtPrice * usdtAmount;
    const btcValue = prices.btcPrice * btcAmount;
    const tonValue = prices.tonPrice * tonAmount;

    document.getElementById('usdt-value').innerText = `$${ usdtValue.toFixed(2) }`;
    document.getElementById('usdt-price').innerText = `$${ prices.usdtPrice.toFixed(2) }`;

    document.getElementById('btc-value').innerText = `$${ btcValue.toFixed(2) }`;
    document.getElementById('btc-price').innerText = `$${ prices.btcPrice.toFixed(2) }`;

    document.getElementById('ton-value').innerText = `$${ tonValue.toFixed(2) }`;
    document.getElementById('ton-price').innerText = `$${ prices.tonPrice.toFixed(2) }`;

    const totalBalance = usdtValue + btcValue + tonValue;
    document.getElementById('total-balance').innerText = `$${ totalBalance.toFixed(2) }`;
}

fetchCoinPrices();

setInterval(fetchCoinPrices, 10 * 60 * 1000);
