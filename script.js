let convertFrom = document.getElementById("from");
let convertTo = document.getElementById("to");
let amountInput = document.getElementById("amount");
let convertedAmount;
let exchangeRates; // Updated variable name to store exchange rates
let isFirstTime = true;
let selectedFromCurrency; // Variable to store the selected "convert from" currency

function getCurrencies() {
    fetch(`https://api.fastforex.io/fetch-all?api_key=c08c586352-6a9807a75f-s7a3f5`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const currencies = data.results;
            exchangeRates = currencies; // Update exchangeRates with fetched data
            const dataList = document.getElementById("fromOptions");

            // Clear the existing options
            dataList.innerHTML = "";

            for (const currencyCode in currencies) {
                if (currencies.hasOwnProperty(currencyCode)) {
                    const option = document.createElement("option");
                    option.value = currencyCode;
                    dataList.appendChild(option);
                }
            }

            // Set the "convert from" value only if not the first time
            if (!isFirstTime) {
                convertFrom.value = selectedFromCurrency;
            }
        })
        .catch(error => {
            console.error('Error fetching currencies:', error);
        });
}


// Event listener for the "convert" button
document.getElementById("convert").addEventListener("click", (event) => {
    if (amountInput.value == 0 || amountInput.value == null){
        window.confirm("Please enter the amount to be converted.")
    }
    getCurrencies(event);
    const selectedFromCurrency = convertFrom.value;
    exchangeRate = exchangeRates[selectedFromCurrency];
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
