let convertFrom = document.getElementById("from");
let convertTo = document.getElementById("to");
let amountInput = document.getElementById("amount");
let convertedAmount;
let exchangeRates; 
let isFirstTime = true;
let convertFromCurrency; 
let convertToCurrency; 
let currencies;

function getCurrencies() {
    return fetch(`https://api.fastforex.io/fetch-all?api_key=c08c586352-6a9807a75f-s7a3f5`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            currencies = data.results;
            const fromDataList = document.getElementById("fromCurrencies");
            const toDataList = document.getElementById("toCurrencies");

            fromDataList.innerHTML = "";
            toDataList.innerHTML = "";

            for (const currency in currencies) {
                if (currencies.hasOwnProperty(currency)) {
                    const option = document.createElement("option");
                    option.value = currency;
                    fromDataList.appendChild(option);
                    toDataList.appendChild(option.cloneNode(true));
                }
            }
            

            if (!isFirstTime) {
                convertFrom.value = convertFromCurrency;
                convertTo.value = convertToCurrency;
            }
        })
        .catch(error => {
            console.error('Error fetching currencies:', error);
        });
}

document.getElementById("convert").addEventListener("click", async (event) => {
    await getCurrencies();
    convertFromCurrency = convertFrom.value;
    convertToCurrency = convertTo.value;

    if (amountInput.value <= 0 || amountInput.value.trim() === '' || convertFromCurrency === "" || convertToCurrency === "") {
        Swal.fire({
            title: 'Invalid amount or currency',
            text: 'Enter the amount, source currency, and target currency to proceed.',
        });
    } else {
        fromExchangeRate = currencies[convertFromCurrency];
        toExchangeRate = currencies[convertToCurrency];
        getValue(parseFloat(amountInput.value), fromExchangeRate, toExchangeRate);
    }
});

function getValue(amount, fromExchangeRate, toExchangeRate) {
    if (amount <= 0 || isNaN(amount) || isNaN(fromExchangeRate) || isNaN(toExchangeRate)) {
        convertedAmount = "";
    } else {
        convertedAmount = amount * (toExchangeRate / fromExchangeRate);
    }
    document.getElementById("result").value = convertedAmount.toFixed(2);
}

getCurrencies();

var typed = new Typed('.footer', {
    strings: ['Generated with ❤️ by Islam Khairy'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 2000,
    loop: true
});
