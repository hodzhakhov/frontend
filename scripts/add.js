(function () {
    window.addEventListener('load', function () {
        const loadTime = performance.now();
        const loadTimeInSeconds = (loadTime / 1000).toFixed(2);

        const loadTimeInfo = document.getElementById('load-time-info');
        loadTimeInfo.textContent = `Page load time: ${ loadTimeInSeconds } seconds`;
    });
})();

document.addEventListener('DOMContentLoaded', () => {
    const fullAddress = document.getElementById('fullAddress').textContent;
    const displayAddress = document.getElementById('displayAddress');
    const copyButton = document.getElementById('copyButton');
    const copyNotification = document.getElementById('copyNotification');

    function shortenAddress(address, startLength = 4, endLength = 3) {
        if (address.length > startLength + endLength) {
            return address.slice(0, startLength) + '...' + address.slice(-endLength);
        }
        return address;
    }

    displayAddress.textContent = shortenAddress(fullAddress);

    copyButton.addEventListener('click', () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(fullAddress).then(() => {
                copyNotification.style.display = 'block';

                setTimeout(() => {
                    copyNotification.style.display = 'none';
                }, 2000);
            }).catch(err => {
                console.error('Не удалось скопировать адрес: ', err);
            });
        } else {
            console.error('Clipboard API не поддерживается этим браузером.');
        }
    });
});

let tg = window.Telagram.WebApp;
tg.BackButton.show().onClick(function () {
    tg.showAlert("Back button clicked!");
});
