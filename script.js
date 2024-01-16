let convertFrom = document.getElementById("from");
let convertTo = document.getElementById("to");
let amountInput = document.getElementById("amount");
let convertedAmount;
let exchangeRate;
let isFirstTime = true;

function getCurrencies(event) {
    fetch(`https://api.fastforex.io/fetch-all?api_key=c08c586352-6a9807a75f-s7a3f5`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            convertFrom.innerHTML = "";
            convertTo.innerHTML = "";

            const currencies = data.results;

            for (const currencyCode in currencies) {
                if (currencies.hasOwnProperty(currencyCode)) {
                    const currency = document.createElement("option");
                    const rate = currencies[currencyCode];

                    currency.value = `${currencyCode}-${rate}`;
                    currency.text = `${currencyCode} - ${rate}`;

                    convertFrom.appendChild(currency);
                }
            }

            const currency2 = document.createElement("option");
            currency2.value = data.base;
            currency2.text = data.base;
            convertTo.appendChild(currency2);

            if (isFirstTime || (event && event.type === "click")) {
                convertFrom.value = "";
                isFirstTime = false;
            }
        })
        .catch(error => {
            console.error('Error fetching currencies:', error);
        });
}

document.getElementById("convert").addEventListener("click", (event) => {
    if (amountInput.value == 0 || amountInput.value == null){
        window.confirm("Please enter the amount to be converted.")
    }
    getCurrencies(event);
    const selectedFromCurrency = convertFrom.value.split('-')[0];
    exchangeRate = parseFloat(convertFrom.value.split('-')[1]);
    getValue(parseFloat(amountInput.value), exchangeRate);
});

getCurrencies();

function getValue(amount, exchangeRate) {
    if (exchangeRate >= 1) {
        convertedAmount = amount / exchangeRate;
    } else {
        convertedAmount = amount * exchangeRate;
    }
    document.getElementById("result").value = convertedAmount.toFixed(2);
}


var typed = new Typed('.footer', {
    strings: ['Generated with ❤️ by Islam Khairy'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 2000,
    loop: true
  });