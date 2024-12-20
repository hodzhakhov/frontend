(function () {
  window.addEventListener("load", function () {
    const loadTime = performance.now();
    const loadTimeInSeconds = (loadTime / 1000).toFixed(2);

    const loadTimeInfo = document.getElementById("load-time-info");
    loadTimeInfo.textContent = `Page load time: ${loadTimeInSeconds} seconds`;
  });
})();

function sessionStorageSet(key, value) {
  try {
    window.sessionStorage.setItem("__telegram__" + key, JSON.stringify(value));
    return true;
  } catch (e) {}
  return false;
}

function sessionStorageGet(key) {
  try {
    return JSON.parse(window.sessionStorage.getItem("__telegram__" + key));
  } catch (e) {}
  return null;
}

document.addEventListener("DOMContentLoaded", () => {
  var appTgVersion = 7.0;

  var initParams = sessionStorageGet("initParams");
  if (initParams) {
    if (!initParams.tgWebAppVersion) {
      initParams.tgWebAppVersion = appTgVersion;
    }
  } else {
    initParams = {
      tgWebAppVersion: appTgVersion,
    };
  }

  sessionStorageSet("initParams", initParams);

  const tg = window.Telegram.WebApp;
  tg.BackButton.show();

  const goBack = () => {
    window.location.href = "index.html";
    tg.BackButton.hide();
  };

  tg.BackButton.onClick(goBack);

  const fullAddress = document.getElementById("fullAddress").textContent;
  const displayAddress = document.getElementById("displayAddress");
  const copyButton = document.getElementById("copyButton");
  const copyNotification = document.getElementById("copyNotification");

  function shortenAddress(address, startLength = 4, endLength = 3) {
    if (address.length > startLength + endLength) {
      return address.slice(0, startLength) + "..." + address.slice(-endLength);
    }
    return address;
  }

  displayAddress.textContent = shortenAddress(fullAddress);

  copyButton.addEventListener("click", () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(fullAddress)
        .then(() => {
          copyNotification.style.display = "block";

          setTimeout(() => {
            copyNotification.style.display = "none";
          }, 2000);
        })
        .catch((err) => {
          console.error("Не удалось скопировать адрес: ", err);
        });
    } else {
      console.error("Clipboard API не поддерживается этим браузером.");
    }
  });
});
