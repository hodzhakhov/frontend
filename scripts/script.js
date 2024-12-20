const apiKey = "ead55db0a6d9a584a0284baeed0f8b9599360505af7c4bdda3c197da4067";

const apiUrl = "https://api.cryptorank.io/v1/currencies";
const coinSymbols = ["USDT", "BTC", "TON"];

function showLoader() {
  const priceElements = document.querySelectorAll(".coin__price");
  priceElements.forEach((priceElement) => {
    priceElement.innerHTML = "";
    const loader = document.createElement("span");
    loader.classList.add("loader");
    priceElement.appendChild(loader);
  });
}

function showError(message) {
  const priceElements = document.querySelectorAll(".coin__price");
  priceElements.forEach((priceElement) => {
    priceElement.innerHTML = "";
    const errorSpan = document.createElement("span");
    errorSpan.classList.add("error");
    errorSpan.textContent = message;
    priceElement.appendChild(errorSpan);
  });
}

function getCoinAmount(coinId) {
  const coinElement = document.getElementById(coinId);
  const coinText = coinElement ? coinElement.textContent : "0";
  const coinAmount = parseFloat(coinText);
  return isNaN(coinAmount) ? 0 : coinAmount;
}

function setValue(elementId, value) {
  const element = document.getElementById(elementId);
  element.innerHTML = "";
  const valueSpan = document.createElement("span");
  valueSpan.textContent = `$${value.toFixed(2)}`;
  element.appendChild(valueSpan);
}

function updatePrices(prices) {
  const usdtAmount = getCoinAmount("usdt-amount");
  const btcAmount = getCoinAmount("btc-amount");
  const tonAmount = getCoinAmount("ton-amount");

  const usdtValue = prices.usdtPrice * usdtAmount;
  const btcValue = prices.btcPrice * btcAmount;
  const tonValue = prices.tonPrice * tonAmount;

  setValue("usdt-price", prices.usdtPrice);
  setValue("usdt-value", usdtValue);

  setValue("btc-price", prices.btcPrice);
  setValue("btc-value", btcValue);

  setValue("ton-price", prices.tonPrice);
  setValue("ton-value", tonValue);

  const totalBalance = usdtValue + btcValue + tonValue;
  setValue("total-balance", totalBalance);
}

async function fetchCoinPrices() {
  showLoader();
  await sleep(1000);
  try {
    const response = await fetch(
      `${apiUrl}?symbols=${coinSymbols.join(",")}&api_key=${apiKey}`,
      {
        method: "GET",
      }
    );

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
      console.error("Ошибка при получении данных:", data.status.error_message);
      showError("⚠ Something went wrong while fetching prices.");
    }
  } catch (error) {
    console.error("Ошибка запроса к API CryptoTank:", error);
    showError("⚠ Unable to fetch crypto prices. Check your connection.");
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

document.addEventListener("DOMContentLoaded", () => {
  fetchCoinPrices();
  setInterval(fetchCoinPrices, 2 * 60 * 1000);
});
