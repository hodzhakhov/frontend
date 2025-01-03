(function () {
  window.addEventListener("load", function () {
    const loadTime = performance.now();
    const loadTimeInSeconds = (loadTime / 1000).toFixed(2);

    const loadTimeInfo = document.getElementById("load-time-info");
    loadTimeInfo.textContent = `Page load time: ${loadTimeInSeconds} seconds`;
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  let fullAddress = document.getElementById("fullAddress").textContent;
  fullAddress = fullAddress.replace(/\s+/g, " ").trim();
  const displayAddress = document.getElementById("displayAddress");
  const copyButton = document.getElementById("copyButton");
  const copyNotification = document.getElementById("copyNotification");

  function shortenAddress(address, startLength = 4, endLength = 3) {
    if (address.length > startLength + endLength) {
      return address.slice(0, startLength) + "..." + address.slice(-endLength);
    }
    return address;
  }

  displayAddress.textContent = shortenAddress(fullAddress, 3, 3);

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

window.addEventListener("load", function () {
  let backBtn = Telegram.WebApp.BackButton;
  backBtn.show();

  const goBack = () => {
    window.location.href = "index.html";
    backBtn.hide();
  };

  backBtn.onClick(goBack);
});
